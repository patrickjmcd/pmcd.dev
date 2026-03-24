import type { LexMap } from '@atproto/lex';
import type { BlobRef } from '@atproto/lex-data';
import { isBlobRef, isLexMap } from '@atproto/lex-data';

export function toExt(mimeType: string): string {
  if (mimeType === 'image/png') return 'png';
  if (mimeType === 'image/jpeg') return 'jpg';
  if (mimeType === 'image/webp') return 'webp';
  return '';
}

export function* enumBlobRefs(map: LexMap): Generator<BlobRef> {
  for (const v of Object.values(map)) {
    if (isBlobRef(v)) {
      yield v;
    } else if (isLexMap(v)) {
      yield* enumBlobRefs(v);
    } else if (Array.isArray(v)) {
      for (const v2 of v) {
        if (isLexMap(v2)) {
          yield* enumBlobRefs(v2);
        }
      }
    }
  }
}
