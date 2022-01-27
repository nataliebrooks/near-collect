// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Item extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("signerId", Value.fromString(""));
    this.set("status", Value.fromString(""));
    this.set("category", Value.fromString(""));
    this.set("log", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Item entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Item entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Item", id.toString(), this);
    }
  }

  static load(id: string): Item | null {
    return changetype<Item | null>(store.get("Item", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get signerId(): string {
    let value = this.get("signerId");
    return value!.toString();
  }

  set signerId(value: string) {
    this.set("signerId", Value.fromString(value));
  }

  get status(): string {
    let value = this.get("status");
    return value!.toString();
  }

  set status(value: string) {
    this.set("status", Value.fromString(value));
  }

  get title(): string | null {
    let value = this.get("title");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set title(value: string | null) {
    if (!value) {
      this.unset("title");
    } else {
      this.set("title", Value.fromString(<string>value));
    }
  }

  get description(): string | null {
    let value = this.get("description");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set description(value: string | null) {
    if (!value) {
      this.unset("description");
    } else {
      this.set("description", Value.fromString(<string>value));
    }
  }

  get image(): string | null {
    let value = this.get("image");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set image(value: string | null) {
    if (!value) {
      this.unset("image");
    } else {
      this.set("image", Value.fromString(<string>value));
    }
  }

  get category(): string {
    let value = this.get("category");
    return value!.toString();
  }

  set category(value: string) {
    this.set("category", Value.fromString(value));
  }

  get labels(): Array<string> | null {
    let value = this.get("labels");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set labels(value: Array<string> | null) {
    if (!value) {
      this.unset("labels");
    } else {
      this.set("labels", Value.fromStringArray(<Array<string>>value));
    }
  }

  get log(): Array<string> {
    let value = this.get("log");
    return value!.toStringArray();
  }

  set log(value: Array<string>) {
    this.set("log", Value.fromStringArray(value));
  }
}

export class Log extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("tokenId", Value.fromString(""));
    this.set("receiverId", Value.fromString(""));
    this.set("status", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Log entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Log entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Log", id.toString(), this);
    }
  }

  static load(id: string): Log | null {
    return changetype<Log | null>(store.get("Log", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tokenId(): string {
    let value = this.get("tokenId");
    return value!.toString();
  }

  set tokenId(value: string) {
    this.set("tokenId", Value.fromString(value));
  }

  get receiverId(): string {
    let value = this.get("receiverId");
    return value!.toString();
  }

  set receiverId(value: string) {
    this.set("receiverId", Value.fromString(value));
  }

  get status(): string {
    let value = this.get("status");
    return value!.toString();
  }

  set status(value: string) {
    this.set("status", Value.fromString(value));
  }
}