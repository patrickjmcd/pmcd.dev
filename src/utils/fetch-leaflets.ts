import { IdResolver } from '@atproto/identity';
import type { DidString, LexMap } from '@atproto/lex';
import { Client } from '@atproto/lex';
import * as pub from '@/util/pub';
import * as siteStandard from '@/util/site/standard';
import { asLeaflet, Leaflet, type ListRecord } from '@/utils/RichText';

const fetchLeaflets = async (): Promise<Leaflet[]> => {
  const resolver = new IdResolver();
  const did = (await resolver.handle.resolve('pmcd.dev')) as DidString;
  const pds = (await resolver.did.resolveAtprotoData(did!)).pds;
  // lex 0.3 defaults to strict processing, which rejects legacy blob refs
  // (e.g. older images). Accept them, as lex 0.0.x did.
  const client = new Client(pds, { strictResponseProcessing: false });

  const invalids: LexMap[] = [];

  // Paginate a collection and validate each record against its schema.
  // client.list() validates strictly with no way to opt out, which drops any
  // record containing a legacy blob ref, so validate here with strict: false.
  async function listAll<T extends LexMap>(
    ns: typeof pub.leaflet.document | typeof siteStandard.document,
  ) {
    const records: ListRecord<T>[] = [];
    let cursor: string | undefined;
    let i = 0;
    do {
      const { body } = await client.listRecords(ns.$nsid, {
        repo: did!,
        limit: 50,
        reverse: true,
        cursor,
      });
      cursor = body.cursor;
      for (const record of body.records) {
        const result = ns.main.safeValidate(record.value, { strict: false });
        if (result.success) {
          records.push({ ...record, valid: true, value: result.value } as unknown as ListRecord<T>);
        } else {
          invalids.push(record.value);
        }
      }
    } while (cursor && ++i < 100);
    return records;
  }

  const [legacyDocs, standardDocs] = await Promise.all([
    listAll<pub.leaflet.document.Main>(pub.leaflet.document),
    listAll<siteStandard.document.Main>(siteStandard.document),
  ]);

  // Merge, preferring site.standard.document and deduplicating by rkey
  const seenRkeys = new Set<string>();
  const merged: (ListRecord<pub.leaflet.document.Main> | ListRecord<siteStandard.document.Main>)[] =
    [];
  for (const record of [...standardDocs, ...legacyDocs]) {
    const rkey = record.uri.split('/').pop()!;
    if (!seenRkeys.has(rkey)) {
      seenRkeys.add(rkey);
      merged.push(record);
    }
  }

  console.log('Fetched', merged.length, 'leaflets.', invalids.length, 'failed validation.');

  return merged
    .map(asLeaflet)
    .sort(
      (a, b) =>
        (a.date ? new Date(a.date).getTime() : 0) - (b.date ? new Date(b.date).getTime() : 0),
    )
    .reverse();
};

export default fetchLeaflets;
