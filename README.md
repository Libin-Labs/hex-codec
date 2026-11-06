# @lp-labs/hex-codec

Strict hexadecimal encoding and decoding with explicit letter case.

## Install

```sh
npm install @lp-labs/hex-codec
```

Node.js 18+; standalone browser-compatible ES2022 core with DOM codec types. Zero runtime or peer dependencies. ESM and CommonJS with separate declarations. No filesystem, network or environment side effects.

## Quickstart

```js
import { encodeHex, decodeHex } from '@lp-labs/hex-codec';
console.log(encodeHex(decodeHex('aB09'), 'upper'));
```

CommonJS consumers use `const api = require('@lp-labs/hex-codec')`. The same named API is available in both module formats. No default export.

## API, behavior, errors and limits

encodeHex accepts 'lower' (default) or 'upper'; decodeHex accepts either case, never prefixes, whitespace, separators, odd lengths, or partial numbers. HexOptions.maxBytes defaults to 16,777,216; exact limits succeed. Decoded arrays are freshly allocated. SyntaxError is malformed hex; RangeError is invalid/exceeded limits; TypeError is invalid casing. Linear time and output space.

All exports: `HexOptions`, `encodeHex`, `decodeHex`.

## Full TypeScript declarations

```ts
export interface HexOptions {
  maxBytes?: number;
}
export declare function encodeHex(
  bytes: Uint8Array,
  casing?: 'lower' | 'upper',
  o?: HexOptions,
): string;
export declare function decodeHex(text: string, o?: HexOptions): Uint8Array;
```

## Development

```sh
npm ci --offline
npm run typecheck
npm test
npm run format:check
```

TypeScript ^5.9.3 and Prettier ^3.6.2 are development-only. Build emits dist/esm and dist/cjs. Tests use Node's test runner; consumer.mts and consumer.cts exercise bare package imports including negative type assertions.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
