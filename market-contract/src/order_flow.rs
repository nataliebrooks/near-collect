use crate::*;

#[near_bindgen]
impl Contract {
  pub fn distributor_req_pile_from_producer(
    &mut self,
    distributor_id: AccountId,
    producer_id: AccountId,
    token_id: String,
  ) {
    // Producer creates pile, made visible to the distributor
    // Distributor creates order to request pile

    // //assert that the user has attached exactly 1 yoctoNEAR (for security reasons)
    // assert_one_yocto();
    self.create_order(distributor_id, producer_id, token_id);
  }

  pub fn producer_acc_req_from_distributor(
    &mut self,
    producer_id: AccountId,
    distributor_id: AccountId,
    token_id: String,
  ) {
    // Producer accepts request from Distributor
    // TODO : This triggers a callback for the distributor to create a transport order

    // Verify contract was called by producer
    let signer_id = env::signer_account_id();
    assert_eq!(
      signer_id, producer_id,
      "Order can only be accepted by producer"
    );
    let requester_and_token_id = format!("{}{}{}", distributor_id, DELIMETER, token_id);
    // Accept order then add to list of orders needing transport
    let order = self.accept_order(
      distributor_id,
      token_id,
      "NEW".to_string(),
      "NEEDS_TRANSPORT".to_string(),
      None,
    );
  }

  pub fn transporter_acc_transfer_req(&mut self, requester_id: AccountId, token_id: String) {
    let signer_id = env::signer_account_id();
    let requester_and_token_id = format!("{}{}{}", requester_id, DELIMETER, token_id);

    self.accept_order(
      requester_id,
      token_id,
      "NEEDS_TRANSPORT".to_string(),
      "IN_TRANSIT".to_string(),
      Some(signer_id),
    );

    // TODO: There should be a better way...
    let signer_id = env::signer_account_id();
    
    let mut by_transporter_set = self.by_transporter.get(&signer_id).unwrap_or_else(|| {
      UnorderedSet::new(
        StorageKey::ByRequesterInner {
          //we get a new unique prefix for the collection by hashing the owner
          account_id_hash: hash_account_id(&signer_id),
        }
        .try_to_vec()
        .unwrap(),
      )
    });
    //insert the unique sale ID into the set
    by_transporter_set.insert(&requester_and_token_id);
    //insert that set back into the collection for the owner
    self.by_transporter.insert(&signer_id, &by_transporter_set);
  }

  pub fn distributor_complete_order(&mut self, distributor_id: AccountId, token_id: String) {
    // Verify contract was called by distributor
    let signer_id = env::signer_account_id();
    assert_eq!(
      signer_id, distributor_id,
      "Order can only be accepted by distributor"
    );

    self.accept_order(
      distributor_id,
      token_id,
      "IN_TRANSIT".to_string(),
      "DELIVERED".to_string(),
      None,
    );
  }
}
