use crate::*;
// use near_sdk::promise_result_as_success;

// Person B wants Person A's item
// So Person B creates an order for it

//struct that holds important information about each order on the market
#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Order {
    pub requester_id: AccountId,
    pub requestee_id: AccountId,
    pub transporter_id: Option<AccountId>,
    // pub nft_contract_id: String, // nft contract where token was minted... common-good
    pub token_id: String, // token Id of Person A's item
    pub status: String,   // lifecycle status
                          // pub instructions: String, // instructions on how to deliver
}

impl Contract {
    pub fn create_order(&mut self, to: AccountId, from: AccountId, token_id: String) -> Order {
        // TODO : enforce that the order creator has enough storage
        // (to create this request as well as the transfer order)

        let requester_and_token_id = format!("{}{}{}", to, DELIMETER, token_id);

        let order = Order {
            requester_id: to.clone(),
            requestee_id: from.clone(),
            transporter_id: None,
            token_id: token_id.clone(),
            status: "NEW".to_string(),
        };

        //insert the order, but first make sure it doesn't exist
        assert!(
            self.orders
                .insert(&requester_and_token_id, &order)
                .is_none(),
            "Order already exists"
        );
        // insert into more organized sets

        //get the orders by requester ID for the given requester. If there are none, we create a new empty set
        let mut by_requester_set = self.by_requester.get(&to).unwrap_or_else(|| {
            UnorderedSet::new(
                StorageKey::ByRequesterInner {
                    //we get a new unique prefix for the collection by hashing the owner
                    account_id_hash: hash_account_id(&to),
                }
                .try_to_vec()
                .unwrap(),
            )
        });
        //insert the unique sale ID into the set
        by_requester_set.insert(&requester_and_token_id);
        //insert that set back into the collection for the owner
        self.by_requester.insert(&to, &by_requester_set);

        //get the orders by requester ID for the given requester. If there are none, we create a new empty set
        let mut by_requestee_set = self.by_requestee.get(&from).unwrap_or_else(|| {
            UnorderedSet::new(
                StorageKey::ByRequesterInner {
                    //we get a new unique prefix for the collection by hashing the owner
                    account_id_hash: hash_account_id(&from),
                }
                .try_to_vec()
                .unwrap(),
            )
        });
        //insert the unique sale ID into the set
        by_requestee_set.insert(&requester_and_token_id);
        //insert that set back into the collection for the owner
        self.by_requestee.insert(&from, &by_requestee_set);

        let order_log: EventLog = EventLog {
            // Standard name ("nep171").
            standard: "col1".to_string(),
            // Version of the standard ("nft-1.0.0").
            version: "order-1.0.0".to_string(),
            // The data related with the event stored in a vector.
            event: EventLogVariant::OrderLog(vec![OrderLog {
                status: "NEW".to_string(),
                order_id: requester_and_token_id,
                token_id: token_id,
                memo: None
            }]),
        };
        env::log_str(&order_log.to_string());

        order
    }

    pub fn accept_order(
        &mut self,
        requester_id: AccountId,
        token_id: String,
        expected_status: String,
        next_status: String,
        transporter_id: Option<AccountId>
    ) -> Order {

        let requester_and_token_id = format!("{}{}{}", requester_id, DELIMETER, token_id);

        let mut order = self
            .orders
            .get(&requester_and_token_id)
            .expect("No order for token from requester");

        assert_eq!(
            order.status, expected_status,
            "Order's current status is not as expected"
        );

        order.status = next_status.clone();
        order.transporter_id = transporter_id;
        self.orders.insert(&requester_and_token_id, &order);

        let order_log: EventLog = EventLog {
            // Standard name ("nep171").
            standard: "col1".to_string(),
            // Version of the standard ("nft-1.0.0").
            version: "order-1.0.0".to_string(),
            // The data related with the event stored in a vector.
            event: EventLogVariant::OrderLog(vec![OrderLog {
                status: next_status,
                order_id: requester_and_token_id,
                token_id: token_id,
                memo: None
            }]),
        };
        env::log_str(&order_log.to_string());

        return order;
    }

    // //removes a order from the market.
    // #[payable]
    // pub fn remove_order(&mut self, nft_contract_id: AccountId, token_id: String) {
    //     //assert that the user has attached exactly 1 yoctoNEAR (for security reasons)
    //     assert_one_yocto();
    //     //get the order object as the return value from removing the order internally
    //     let order = self.internal_remove_order(nft_contract_id.into(), token_id);
    //     //get the predecessor of the call and make sure they're the owner of the order
    //     let owner_id = env::predecessor_account_id();
    //     //if this fails, the remove order will revert
    //     assert_eq!(owner_id, order.owner_id, "Must be order owner");
    // }

    // //updates the price for a sale on the market
    // #[payable]
    // pub fn update_price(
    //     &mut self,
    //     nft_contract_id: AccountId,
    //     token_id: String,
    //     price: U128,
    // ) {
    //     //assert that the user has attached exactly 1 yoctoNEAR (for security reasons)
    //     assert_one_yocto();
    //     //create the unique sale ID from the nft contract and token
    //     let contract_id: AccountId = nft_contract_id.into();
    //     let contract_and_token_id = format!("{}{}{}", contract_id, DELIMETER, token_id);

    //     //get the sale object from the unique sale ID. If there is no token, panic.
    //     let mut sale = self.sales.get(&contract_and_token_id).expect("No sale");

    //     //assert that the caller of the function is the sale owner
    //     assert_eq!(
    //         env::predecessor_account_id(),
    //         sale.owner_id,
    //         "Must be sale owner"
    //     );
    //     //set the sale conditions equal to the passed in price
    //     sale.sale_conditions = price;
    //     //insert the sale back into the map for the unique sale ID
    //     self.sales.insert(&contract_and_token_id, &sale);
    // }

    //place an offer on a specific sale. The sale will go through as long as your deposit is greater than or equal to the list price
    // #[payable]
    // pub fn offer(&mut self, nft_contract_id: AccountId, token_id: String) {
    //     //get the attached deposit and make sure it's greater than 0
    //     let deposit = env::attached_deposit();
    //     assert!(deposit > 0, "Attached deposit must be greater than 0");

    //     //convert the nft_contract_id from a AccountId to an AccountId
    //     let contract_id: AccountId = nft_contract_id.into();
    //     //get the unique sale ID (contract + DELIMITER + token ID)
    //     let contract_and_token_id = format!("{}{}{}", contract_id, DELIMETER, token_id);
    //     //get the sale object from the unique sale ID. If the sale doesn't exist, panic.
    //     let sale = self.sales.get(&contract_and_token_id).expect("No sale");
    //     //get the buyer ID which is the person who called the function and make sure they're not the owner of the sale
    //     let buyer_id = env::predecessor_account_id();
    //     assert_ne!(sale.owner_id, buyer_id, "Cannot bid on your own sale.");
    //     //get the u128 price of the token (dot 0 converts from U128 to u128)
    //     let price = sale.sale_conditions.0;

    //     //make sure the deposit is greater than the price
    //     assert!(deposit >= price, "Attached deposit must be greater than or equal to the current price: {:?}", price);

    //     //process the purchase (which will remove the sale, transfer and get the payout from the nft contract, and then distribute royalties)
    //     self.process_purchase(
    //         contract_id,
    //         token_id,
    //         U128(deposit),
    //         buyer_id,
    //     );
    // }

    // //private function used when a sale is purchased.
    // //this will remove the sale, transfer and get the payout from the nft contract, and then distribute royalties
    // #[private]
    // pub fn process_purchase(
    //     &mut self,
    //     nft_contract_id: AccountId,
    //     token_id: String,
    //     price: U128,
    //     buyer_id: AccountId,
    // ) -> Promise {
    //     //get the sale object by removing the sale
    //     let sale = self.internal_remove_sale(nft_contract_id.clone(), token_id.clone());

    //     //initiate a cross contract call to the nft contract. This will transfer the token to the buyer and return
    //     //a payout object used for the market to distribute funds to the appropriate accounts.
    //     ext_contract::nft_transfer_payout(
    //         buyer_id.clone(), //purchaser (person to transfer the NFT to)
    //         token_id, //token ID to transfer
    //         sale.approval_id, //market contract's approval ID in order to transfer the token on behalf of the owner
    //         "payout from market".to_string(), //memo (to include some context)
    //         /*
    //             the price that the token was purchased for. This will be used in conjunction with the royalty percentages
    //             for the token in order to determine how much money should go to which account.
    //         */
    //         price,
    // 		10, //the maximum amount of accounts the market can payout at once (this is limited by GAS)
    //         nft_contract_id, //contract to initiate the cross contract call to
    //         1, //yoctoNEAR to attach to the call
    //         GAS_FOR_NFT_TRANSFER, //GAS to attach to the call
    //     )
    //     //after the transfer payout has been initiated, we resolve the promise by calling our own resolve_purchase function.
    //     //resolve purchase will take the payout object returned from the nft_transfer_payout and actually pay the accounts
    //     .then(ext_self::resolve_purchase(
    //         buyer_id, //the buyer and price are passed in incase something goes wrong and we need to refund the buyer
    //         price,
    //         env::current_account_id(), //we are invoking this function on the current contract
    //         NO_DEPOSIT, //don't attach any deposit
    //         GAS_FOR_ROYALTIES, //GAS attached to the call to payout royalties
    //     ))
    // }

    // /*
    //     private method used to resolve the promise when calling nft_transfer_payout. This will take the payout object and
    //     check to see if it's authentic and there's no problems. If everything is fine, it will pay the accounts. If there's a problem,
    //     it will refund the buyer for the price.
    // */
    // #[private]
    // pub fn resolve_purchase(
    //     &mut self,
    //     buyer_id: AccountId,
    //     price: U128,
    // ) -> U128 {
    //     // checking for payout information returned from the nft_transfer_payout method
    //     let payout_option = promise_result_as_success().and_then(|value| {
    //         //if we set the payout_option to None, that means something went wrong and we should refund the buyer
    //         near_sdk::serde_json::from_slice::<Payout>(&value)
    //             //converts the result to an optional value
    //             .ok()
    //             //returns None if the none. Otherwise executes the following logic
    //             .and_then(|payout_object| {
    //                 //we'll check if length of the payout object is > 10 or it's empty. In either case, we return None
    //                 if payout_object.payout.len() > 10 || payout_object.payout.is_empty() {
    //                     env::log_str("Cannot have more than 10 royalties");
    //                     None
    //                 //if the payout object is the correct length, we move forward
    //                 } else {
    //                     //we'll keep track of how much the nft contract wants us to payout. Starting at the full price payed by the buyer
    //                     let mut remainder = price.0;

    //                     //loop through the payout and subtract the values from the remainder.
    //                     for &value in payout_object.payout.values() {
    //                         //checked sub checks for overflow or any errors and returns None if there are problems
    //                         remainder = remainder.checked_sub(value.0)?;
    //                     }
    //                     //Check to see if the NFT contract sent back a faulty payout that requires us to pay more or too little.
    //                     //The remainder will be 0 if the payout summed to the total price. The remainder will be 1 if the royalties
    //                     //we something like 3333 + 3333 + 3333.
    //                     if remainder == 0 || remainder == 1 {
    //                         //set the payout_option to be the payout because nothing went wrong
    //                         Some(payout_object.payout)
    //                     } else {
    //                         //if the remainder was anything but 1 or 0, we return None
    //                         None
    //                     }
    //                 }
    //             })
    //     });

    //     // if the payout option was some payout, we set this payout variable equal to that some payout
    //     let payout = if let Some(payout_option) = payout_option {
    //         payout_option
    //     //if the payout option was None, we refund the buyer for the price they payed and return
    //     } else {
    //         Promise::new(buyer_id).transfer(u128::from(price));
    //         // leave function and return the price that was refunded
    //         return price;
    //     };

    //     // NEAR payouts
    //     for (receiver_id, amount) in payout {
    //         Promise::new(receiver_id).transfer(amount.0);
    //     }

    //     //return the price payout out
    //     price
    // }
}

//this is the cross contract call that we call on our own contract.
/*
    private method used to resolve the promise when calling nft_transfer_payout. This will take the payout object and
    check to see if it's authentic and there's no problems. If everything is fine, it will pay the accounts. If there's a problem,
    it will refund the buyer for the price.
*/
#[ext_contract(ext_self)]
trait ExtSelf {
    fn resolve_purchase(&mut self, buyer_id: AccountId, price: U128) -> Promise;
}

// #[cfg(all(test, not(target_arch = "wasm32")))]
// mod tests {
//     use near_sdk::test_utils::{accounts, VMContextBuilder};
//     use near_sdk::testing_env;

//     use super::*;

//     const MINT_STORAGE_COST: u128 = 5870000000000000000000;

//     fn get_context(predecessor_account_id: AccountId) -> VMContextBuilder {
//         let mut builder = VMContextBuilder::new();
//         builder
//             .current_account_id(accounts(0))
//             .signer_account_id(predecessor_account_id.clone())
//             .predecessor_account_id(predecessor_account_id);
//         builder
//     }

//     #[test]
//     fn test_create_order() {
//         let mut context = get_context(accounts(0));
//         testing_env!(context.build());
//         let mut contract = Contract::new(accounts(0).into());

//         testing_env!(context
//             .storage_usage(env::storage_usage())
//             .attached_deposit(MINT_STORAGE_COST)
//             .predecessor_account_id(accounts(0))
//             .build());

//         let token_id = "0".to_string();
//         let order = contract.create_order(accounts(0), token_id.clone());

//         // let requester_and_token_id = format!("{}{}{}", accounts(0), DELIMETER, token_id);
//         // assert_eq!(order.requester_id, accounts(0));
//         assert_eq!(order.token_id, token_id);
//         assert_eq!(order.status, "NEW".to_string());
//         // assert_eq!(order.instructions, "email_me".to_string());
//     }
// }
