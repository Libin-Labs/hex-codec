import assert from 'node:assert/strict';
import { test } from 'node:test';
import { encodeHex, decodeHex } from '../dist/esm/index.js';

test('all bytes oracle', () => {
  const b = Uint8Array.from({ length: 256 }, (_, i) => i);
  assert.equal(encodeHex(b), Buffer.from(b).toString('hex'));
  assert.deepEqual(decodeHex(encodeHex(b)), b);
});
test('case', () => {
  assert.equal(encodeHex(new Uint8Array([171]), 'upper'), 'AB');
  assert.deepEqual(decodeHex('aBcD'), new Uint8Array([171, 205]));
});
test('odd rejected', () => {
  assert.throws(() => decodeHex('a'), SyntaxError);
});
test('invalid digits', () => {
  for (const s of ['0g', ' 0', '0x', '-1', 'é0']) assert.throws(() => decodeHex(s), SyntaxError);
});
test('bounds', () => {
  assert.equal(decodeHex('00', { maxBytes: 1 }).length, 1);
  assert.throws(() => decodeHex('00', { maxBytes: 0 }), RangeError);
  assert.throws(() => encodeHex(new Uint8Array(1), 'lower', { maxBytes: 0 }), RangeError);
});
test('ownership and empty', () => {
  const a = decodeHex('00'),
    b = decodeHex('00');
  a[0] = 8;
  assert.equal(b[0], 0);
  assert.equal(encodeHex(decodeHex('')), '');
});
test('final controls cannot terminate strict hex', () => {
  for (const text of ['00\n', '0\n', '00\r\n', '00 ', '00\0']) {
    assert.throws(() => decodeHex(text), SyntaxError);
  }
});
test('deterministic bytes roundtrip', () => {
  for (let length = 0; length <= 128; length++) {
    const bytes = Uint8Array.from({ length }, (_, i) => (i * 197 + length * 37) & 255);
    assert.deepEqual(decodeHex(encodeHex(bytes, 'upper')), bytes);
    assert.equal(encodeHex(bytes), Buffer.from(bytes).toString('hex'));
  }
});
test('invalid limits and owned input', () => {
  for (const maxBytes of [-1, 0.5, Infinity, NaN])
    assert.throws(() => decodeHex('', { maxBytes }), RangeError);
  const bytes = new Uint8Array([255]);
  encodeHex(bytes);
  assert.equal(bytes[0], 255);
});
