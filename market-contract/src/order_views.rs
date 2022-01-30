use crate::*;

#[near_bindgen]
impl Contract {
    
    // total number of orders on contract
    pub fn get_supply_orders(
        &self,
    ) -> U64 {
        U64(self.orders.len())
    }
    
    // total number of orders by requester
    pub fn get_supply_by_requester_id(
        &self,
        requester_id: AccountId,
    ) -> U64 {
        let by_requester = self.by_requester.get(&requester_id);
        
        if let Some(by_requester) = by_requester {
            U64(by_requester.len())
        } else {
            U64(0)
        }
    }

    //returns paginated order objects for a given account. (result is a vector of sales)
    pub fn get_orders_by_requester(
        &self,
        requester_id: AccountId,
        from_index: Option<U128>,
        limit: Option<u64>,
    ) -> Vec<Order> {
        //get the set of orders for a given requester
        let by_requester = self.by_requester.get(&requester_id);
        //if there was some set, we set the sales variable equal to that set. If there wasn't, sales is set to an empty vector
        let orders_by_requester = if let Some(by_requester) = by_requester {
            by_requester
        } else {
            return vec![];
        };
        
        //we'll convert the UnorderedSet into a vector of strings
        let keys = orders_by_requester.as_vector();

        //where to start pagination - if we have a from_index, we'll use that - otherwise start from 0 index
        let start = u128::from(from_index.unwrap_or(U128(0)));
        
        //iterate through the keys vector
        keys.iter()
            //skip to the index we specified in the start variable
            .skip(start as usize) 
            //take the first "limit" elements in the vector. If we didn't specify a limit, use 0
            .take(limit.unwrap_or(0) as usize) 
            //we'll map the token IDs which are strings into Sale objects
            .map(|requester_token_id| self.orders.get(&requester_token_id).unwrap())
            //since we turned the keys into an iterator, we need to turn it back into a vector to return
            .collect()
    }

    pub fn get_order(&self, requester_token_id: RequesterAndTokenId) -> Option<Order> {
        self.orders.get(&requester_token_id)
    }
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
//     fn test_get_orders_by_requester() {
//         let mut context = get_context(accounts(0));
//         testing_env!(context.build());
//         let mut contract = Contract::new(accounts(0).into());

//         let requester = accounts(0).clone();
//         let token_id = "9999".to_string();

//         testing_env!(context
//             .storage_usage(env::storage_usage())
//             .attached_deposit(MINT_STORAGE_COST)
//             .predecessor_account_id(requester)
//             .build());

//         let test_by_requester_set = UnorderedSet::new(
//             StorageKey::ByRequesterInner {
//                 //we get a new unique prefix for the collection by hashing the owner
//                 account_id_hash: hash_account_id(&requester),
//             }
//             .try_to_vec()
//             .unwrap(),
//         );

//         let requester_and_token_id = format!("{}{}{}", requester, DELIMETER, token_id);

//         test_by_requester_set.insert(&requester_and_token_id);

//         contract.by_requester.insert(&requester, &test_by_requester_set);

//         let orders = contract.get_orders_by_requester(&requester);

//         contract.by_requester = UnorderedSet::new(
//             StorageKey::ByRequesterInner {
//                 //we get a new unique prefix for the collection by hashing the owner
//                 account_id_hash: hash_account_id(&requester_id),
//             }
//             .try_to_vec()
//             .unwrap(),
//         )

        

        
//         // assert_eq!(order.requester_id, accounts(0));
//         assert_eq!(order.token_id, token_id);
//         assert_eq!(order.status, "NEW".to_string());
//         // assert_eq!(order.instructions, "email_me".to_string());
//     }
// }
