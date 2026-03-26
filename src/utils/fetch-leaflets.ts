import { IdResolver } from '@atproto/identity';
import type { DidString, LexMap, ListRecord } from '@atproto/lex';
import { Client } from '@atproto/lex';
import * as pub from '@/util/pub';
import * as siteStandard from '@/util/site/standard';
import { asLeaflet, Leaflet } from '@/utils/RichText';

const fetchLeaflets = async (): Promise<Leaflet[]> => {
  const resolver = new IdResolver();
  const did = (await resolver.handle.resolve('pmcd.dev')) as DidString;
  const pds = (await resolver.did.resolveAtprotoData(did!)).pds;
  const client = new Client(pds);

  const invalids: LexMap[] = [];

  // Helper to paginate any collection via typed client
  async function listAll<T extends LexMap>(collection: Parameters<typeof client.list>[0]) {
    const records: ListRecord<T>[] = [];
    let cursor: string | undefined;
    let i = 0;
    do {
      const result = await client.list(collection, { repo: did!, limit: 50, reverse: true, cursor });
      cursor = result.cursor;
      records.push(...(result.records as ListRecord<T>[]));
      invalids.push(...result.invalid);
    } while (cursor && ++i < 100);
    return records;
  }

  const [legacyDocs, standardDocs] = await Promise.all([
    listAll<pub.leaflet.document.Main>(pub.leaflet.document),
    listAll<siteStandard.document.Main>(siteStandard.document),
  ]);

  // Merge, preferring site.standard.document and deduplicating by rkey
  const seenRkeys = new Set<string>();
  const merged: (ListRecord<pub.leaflet.document.Main> | ListRecord<siteStandard.document.Main>)[] = [];
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
    .sort((a, b) => (a.date ? new Date(a.date).getTime() : 0) - (b.date ? new Date(b.date).getTime() : 0))
    .reverse();
};

export default fetchLeaflets;
