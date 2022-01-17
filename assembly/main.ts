import { Item, PartialItem} from "./model";

// export the create method. This acts like an endpoint
// that we'll be able to call from our web app.
export function create(name: string): Item {
  // use the Item class to persist the Item data
  return Item.insert(name);
}

export function getById(id: u32): Item {
  return Item.findById(id);
}

export function get(offset: u32, limit: u32 = 10): Item[] {
  return Item.find(offset, limit);
}

export function update(id: u32, updates: PartialItem): Item {
  return Item.findByIdAndUpdate(id, updates);
}

export function del(id: u32): void {
  Item.findByIdAndDelete(id);
}