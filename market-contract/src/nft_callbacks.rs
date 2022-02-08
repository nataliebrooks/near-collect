use crate::*;

/// approval callbacks from Orders

/*
    trait that will be used as the callback from the NFT contract. When nft_approve is
    called, it will fire a cross contract call to this marketplace and this is the function
    that is invoked. 
*/
trait NonFungibleTokenApprovalsReceiver {
    fn order_on_accept(
        &mut self,
        token_id: TokenId,
        owner_id: AccountId,
        approval_id: u64,
        msg: String,
    );
}

//implementation of the trait
#[near_bindgen]
impl NonFungibleTokenApprovalsReceiver for Contract {

    fn order_on_accept(
        &mut self,
        token_id: TokenId,
        requester_id: AccountId,
        approval_id: u64,
        msg: String,
    ) {
        // get the account id of who approved the order
        let order_approver_id = env::predecessor_account_id();
        // get the account id of who created the order
        let order_creator_id = env::signer_account_id();

        //make sure that the signer isn't the predecessor. This is so that we're sure
        //this was called via a cross-contract call
        assert_ne!(
          order_approver_id,
          order_creator_id,
            "order_on_accept should only be called via cross-contract call"
        );
        //make sure the owner ID is the signer. 
        assert_eq!(
          requester_id,
          order_creator_id,
            "Provided requester_id should be same as order_creator_id"
        );

        create_transport_order(order_creator_id, order_approver_id, token_id);
}
