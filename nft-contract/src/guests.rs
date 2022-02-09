use crate::*;

const GUEST_MINT_LIMIT: u8 = 3;

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Guest {
  pub account_id: AccountId,
  pub mints: u8,
  pub balance: U128,
}

#[near_bindgen]
impl Contract {
  pub fn create_guest(&mut self, account_id: AccountId, public_key: PublicKey) {
    assert_eq!(
      env::predecessor_account_id(),
      self.owner_id,
      "Must be called from common-good"
    );
    if self.tokens_per_owner.get(&account_id).is_some() {
      env::panic(b"The account is already registered");
    }

    let empty_token_set = UnorderedSet::new(
      StorageKey::TokenPerOwnerInner {
          //we get a new unique prefix for the collection
          account_id_hash: hash_account_id(&account_id),
      }
      .try_to_vec()
      .unwrap()
    );
    self.tokens_per_owner.insert(&account_id, &empty_token_set);

    if self
      .guests
      .insert(
        &public_key.into(),
        &Guest {
          account_id,
          mints: 0,
          balance: U128(0),
        },
      )
      .is_some()
    {
      env::panic(b"guest account already added");
    }
  }

  pub fn get_account(&self, account_id: AccountId) -> Vec<TokenId> {
    self
      .tokens_per_owner
      .get(&account_id.into())
      .expect("Account Not Found")
      .to_vec()
  }
}
