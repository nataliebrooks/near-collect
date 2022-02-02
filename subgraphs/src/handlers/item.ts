import { json, log, near } from "@graphprotocol/graph-ts";
import { Item, Log } from "../../generated/schema";

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

  // change the methodName here to the methodName emitting the log in the contract
  if (functionCall.methodName == "nft_mint") {
    // Unique ID for item
    const receiptId = receipt.id.toHexString();
    let item = new Item(`${receiptId}`);
    // DO SOMETHING
  }

  //   item.signerId = receipt.signerId; // orig owner
  //   item.rootId = receiptId;
  //   item.status = "NEW";
  //   item.category = "uncategorized";
  //   item.labels = [];

  //   // Do I even care about anything else?

  //   // https://github.com/decentraland/marketplace/blob/master/indexer/src/modules/nft/index.ts

  // // if function call is update
  // // item.load( unHex)
  

    
  //   // Maps the JSON formatted log to the LOG entity
  //   // let logs = new Log(`${receiptId}`);
  //   // if (outcome.logs[0] != null) {
  //   //   logs.id = receipt.signerId;
  //   //   const parsed = outcome.logs[0].toString();

  //   //   log.info("outcomeLog {}", [parsed]);

  //   //   const jsonData = json.try_fromString(parsed);
  //   //   const jsonObject = jsonData.value.toObject();

  //   //   const eventData = jsonObject.get("EVENT_JSON");

  //   //   if (eventData) {
  //   //     const data = eventData.toObject();
  //   //     const tokenId = data.get("token_id");
  //   //     const receiverId = data.get("receiver_id");
  //   //     const status = data.get("status");

  //   //     if (status && status.toString() == "NEW") {
  //   //       item.status = status.toString();
  //   //       item.category = "uncategorized";
  //   //       item.labels = [];
  //   //     }

  //   //     if (tokenId) {
  //   //       logs.tokenId = tokenId.toString();
  //   //     }
  //   //     if (receiverId) {
  //   //       logs.receiverId = receiverId.toString();
  //   //     }
  //   //   }
  //   //   logs.save();

  //   //   item.log.push(logs.id);
  //   // } else {
  //   //   log.info("Not processed - FunctionCall is: {}", [
  //   //     functionCall.methodName,
  //   //   ]);
  //   // }

  //   item.save();
  // }
}