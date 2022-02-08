use crate::*;

#[near_bindgen]
impl Contract {
    // Method called by Organizers when they submit category or labels
    #[payable]
    pub fn nft_update(
        &mut self,
        token_id: TokenId,
        category: Option<String>,
        labels: Option<Vec<String>>
    ) {
        let mut token_metadata = self
          .token_metadata_by_id
          .get(&token_id)
          .expect("No token found from id");
        
        if let Some(category) = category {
          // TODO: do manipulations based on existing + prior category selections
          token_metadata.category = Some(category);
        }
        
        if let Some(labels) = labels {
          // TODO: do manipulations based on existing + prior labels
          token_metadata.labels = Some(labels);
        }

        self.token_metadata_by_id.insert(&token_id, &token_metadata);

        // Construct the mint log as per the events standard.
        // This information will be available to subgraph
        let nft_update_log: EventLog = EventLog {
            // Standard name ("nep171").
            standard: NFT_STANDARD_NAME.to_string(),
            // Version of the standard ("nft-1.0.0").
            version: NFT_METADATA_SPEC.to_string(),
            // The data related with the event stored in a vector.
            event: EventLogVariant::NftUpdateLog(vec![NftUpdateLog {
                // Vector of token IDs that were updated.
                token_ids: vec![token_id.to_string()],
                
                category: token_metadata.category,
                labels: token_metadata.labels,
                // An optional memo to include.
                memo: None
            }]),
        };
        env::log_str(&nft_update_log.to_string());
    }
}