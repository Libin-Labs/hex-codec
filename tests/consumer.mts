import { encodeHex, decodeHex } from '@lp-labs/hex-codec';
const result: string = encodeHex(decodeHex('abcd'), 'upper');
void result;
// @ts-expect-error invalid case
encodeHex(new Uint8Array(), 'mixed');
