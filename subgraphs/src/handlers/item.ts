import { near, JSONValue, json, ipfs, log } from "@graphprotocol/graph-ts";
import { Token, User } from "../../generated/schema";

export function handleReceipt(receipt: near.ReceiptWithOutcome): void {
  const actions = receipt.receipt.actions;

  for (let i = 0; i < actions.length; i++) {
    handleAction(
      actions[i],
      receipt.receipt,
      receipt.block.header,
      receipt.outcome
    );
  }
}

function handleAction(
  action: near.ActionValue,
  receipt: near.ActionReceipt,
  blockHeader: near.BlockHeader,
  outcome: near.ExecutionOutcome
): void {
  if (action.kind != near.ActionKind.FUNCTION_CALL) {
    log.info("Early return: {}", ["Not a function call"]);
    return;
  }

  const functionCall = action.toFunctionCall();
  // const ipfsHash =
  //   "bafybeiew2l6admor2lx6vnfdaevuuenzgeyrpfle56yrgse4u6nnkwrfeu";

  if (functionCall.methodName == "nft_mint") {
    // item (NFT) has been minted on common good
    // we need to reflect that here to be easily queryable
    // but we will not expose the owner or any fine details

    if (outcome.logs[0] != null) {
      // grab the event log and parse into an object
      const parsed = outcome.logs[0].toString().replace("EVENT_JSON:", "");
      log.info("outcomeLog {}", [parsed]);
      const jsonData = json.try_fromString(parsed);
      const jsonObject = jsonData.value.toObject();

      const eventData = jsonObject.get("data");
      if (eventData) {
        const eventArray: JSONValue[] = eventData.toArray();

        const data = eventArray[0].toObject();
        const tokenIds = data.get("token_ids");
        const ownerId = data.get("owner_id");
        const rootId = data.get("root_id");
        if (!tokenIds || !ownerId) return;

        const ids: JSONValue[] = tokenIds.toArray();
        const tokenId = ids[0].toString();

        let token = new Token(tokenId);
        token.tokenId = tokenId;
        // Set token root id if provided (for derivatives created by Distributor)
        token.rootId = rootId ? rootId.toString() : tokenId;

        token.ownerId = ownerId.toString();
        token.owner = ownerId.toString();

        token.creatorId = ownerId.toString();
        token.creator = ownerId.toString();

        // token.image = ipfsHash + "/" + tokenId + ".png";
        // const metadata = ipfsHash + "/" + tokenId + ".json";
        // token.metadata = metadata;

        // Set status depending on mint from producer or
        // derivative mint from distributor
        token.status = rootId ? "NEEDS_LABELLING" : "NEW";
        token.category = "uncategorized";
        token.labels = ["unlabelled"];

        let user = User.load(ownerId.toString());
        if (!user) {
          user = new User(ownerId.toString());
        }

        token.save();
        user.save();
      }
    }
  } else if (functionCall.methodName == "nft_update") {
    // item (NFT) has been updated by an organizer
    // we need to reflect those changes here

    if (outcome.logs[0] != null) {
      // grab the event log and parse into an object
      const parsed = outcome.logs[0].toString().replace("EVENT_JSON:", "");
      log.info("outcomeLog {}", [parsed]);
      const jsonData = json.try_fromString(parsed);
      const jsonObject = jsonData.value.toObject();

      const eventData = jsonObject.get("data");
      if (eventData) {
        const eventArray: JSONValue[] = eventData.toArray();

        const data = eventArray[0].toObject();
        const tokenIds = data.get("token_ids");
        if (!tokenIds) return;

        const ids: JSONValue[] = tokenIds.toArray();
        const tokenId = ids[0].toString();

        let token = Token.load(tokenId);
        if (!token) return;

        const category = data.get("category");
        if (category) {
          token.category = category.toString();
        }

        const labels = data.get("labels");
        if (labels) {
          const lbls: JSONValue[] = labels.toArray();
          token.labels = lbls.map<string>((data: JSONValue) => data.toString());        
        }
        token.save();
      }
    }
  }
}
