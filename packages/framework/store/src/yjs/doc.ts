import type { Transaction } from 'yjs';
import * as Y from 'yjs';

import { createYProxy } from '../reactive/proxy.js';

export type BlockKitDocAllowedValue =
  | Record<string, unknown>
  | unknown[]
  | Y.Text;
export type BlockKitDocData = Record<string, BlockKitDocAllowedValue>;

export class BlockKitDoc extends Y.Doc {
  private _spaces: Y.Map<Y.Doc> = this.getMap('spaces');

  get spaces() {
    return this._spaces;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override toJSON(): Record<string, any> {
    const json = super.toJSON();
    delete json.spaces;
    const spaces: Record<string, unknown> = {};
    this.spaces.forEach((doc, key) => {
      spaces[key] = doc.toJSON();
    });
    return {
      ...json,
      spaces,
    };
  }

  getMapProxy<
    Key extends keyof BlockKitDocData & string,
    Value extends Record<
      string,
      unknown
    > = BlockKitDocData[Key] extends Record<string, unknown>
      ? BlockKitDocData[Key]
      : never,
  >(key: Key): Value {
    const map = super.getMap(key);
    return createYProxy(map);
  }

  getArrayProxy<
    Key extends keyof BlockKitDocData & string,
    Value extends unknown[] = BlockKitDocData[Key] extends unknown[]
      ? BlockKitDocData[Key]
      : never,
  >(key: Key): Value {
    const array = super.getArray(key);
    return createYProxy(array) as Value;
  }

  override transact<T>(f: (arg0: Transaction) => T, origin?: number | string) {
    return super.transact(f, origin);
  }
}
