export interface HexOptions {
  maxBytes?: number;
}
function limit(o: HexOptions): number {
  const n = o.maxBytes ?? 16_777_216;
  if (!Number.isSafeInteger(n) || n < 0) throw new RangeError('Invalid maxBytes');
  return n;
}
export function encodeHex(
  bytes: Uint8Array,
  casing: 'lower' | 'upper' = 'lower',
  o: HexOptions = {},
): string {
  if (casing !== 'lower' && casing !== 'upper') throw new TypeError('Invalid casing');
  if (bytes.length > limit(o)) throw new RangeError('Byte limit exceeded');
  const a = casing === 'lower' ? '0123456789abcdef' : '0123456789ABCDEF';
  const out: string[] = [];
  for (const b of bytes) out.push(a[b >>> 4]!, a[b & 15]!);
  return out.join('');
}
export function decodeHex(text: string, o: HexOptions = {}): Uint8Array {
  const max = limit(o);
  if (text.length % 2) throw new SyntaxError('Odd hex length');
  if (text.length / 2 > max) throw new RangeError('Byte limit exceeded');
  const out = new Uint8Array(text.length / 2);
  for (let i = 0; i < text.length; i += 2) {
    const pair = text.slice(i, i + 2);
    if (!/^[0-9a-fA-F]{2}$/.test(pair)) throw new SyntaxError('Invalid hex digit');
    out[i / 2] = Number.parseInt(pair, 16);
  }
  return out;
}
