import { create, getById, get, update, del } from "../main";
import { Item, items } from "../model";
import { VMContext, Context, u128 } from 'near-sdk-as';

describe("contract methods", () => {
  it("creates a Item", () => {
    // call the create method
    const Item = create("rock");

    // lookup in the PersistentUnorderedMap for our Item
    // expect the persisted Item to equal the Item returned
    // by the create method above.
    expect(items.getSome(Item.id)).toStrictEqual(Item);
  });

  it("gets a Item by id", () => {
    // create three items
    const a = Item.insert("rock");
    const b = Item.insert("shoe");
    const c = Item.insert("hat");

    // get each Item by its it
    expect(getById(a.id)).toStrictEqual(a);
    expect(getById(b.id)).toStrictEqual(b);
    expect(getById(c.id)).toStrictEqual(c);
  });

  it('gets a list of items', () => {
    const items = new Array<number>(100)
      .fill(0)
      .map<Item>((_, i) => Item.insert('Item' + i.toString()))

    expect(get(20)).toStrictEqual(items.slice(20, 30));
    expect(get(0, 10)).toStrictEqual(items.slice(0, 10));
    expect(get(10, 10)).toStrictEqual(items.slice(10, 20));
    expect(get(50, 50)).toStrictEqual(items.slice(50, 100));
  });

  it('updates a Item', () => {
    const item = Item.insert('bottle');

    update(item.id, { name: 'rock', labelled: true });

    const ItemAfterUpdate = Item.findById(item.id);

    expect(ItemAfterUpdate.id).toStrictEqual(item.id);
    expect(ItemAfterUpdate.name).toStrictEqual('rock');
    expect(ItemAfterUpdate.labelled).toStrictEqual(true);
  });

  itThrows('deletes a Item', () => {
    const item = Item.insert('rock');

    del(item.id);

    Item.findById(item.id);
  });

});