import { context, PersistentUnorderedMap, math } from "near-sdk-as";

/**
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */
export const items = new PersistentUnorderedMap<u32, Item>("item");

@nearBindgen
export class PartialItem {
  name: string;
  labelled: bool;
}

@nearBindgen
export class Item {
  id: u32;
  creator: string;
  name: string;
  labelled: bool;

  constructor(name: string) {
    this.id = math.hash32<string>(name);
    this.creator = context.sender;
    this.name = name;
    this.labelled = false;
  }

  static insert(name: string): Item {
    const item = new Item(name);
    // add the item to the PersistentUnorderedMap
    // where the key is the item's id and the value
    // is the item itself. Think of this like an
    // INSERT statement in SQL.
    items.set(item.id, item);

    return item;
  }

  static findById(id: u32): Item {
    // Lookup a item in the PersistentUnorderedMap by its id.
    // This is like a SELECT * FROM items WHERE id=?
    return items.getSome(id);
  }

  static find(offset: u32, limit: u32): Item[] {
    // the PersistentUnorderedMap values method will
    // takes two parameters: start and end. we'll start
    // at the offset (skipping all items before the offset)
    // and collect all items until we reach the offset + limit
    // item. For example, if offset is 10 and limit is 3 then
    // this would return the 10th, 11th, and 12th item.
    return items.values(offset, offset + limit);
  }

  static findByIdAndUpdate(id: u32, partial: PartialItem): Item {
    // find a item by its id
    const item = this.findById(id);

    // update the item in-memory
    item.name = partial.name;
    item.labelled = partial.labelled;

    // persist the updated item
    items.set(id, item);

    return item;
  }

  static findByIdAndDelete(id: u32): void {
    items.delete(id);
  }

}
