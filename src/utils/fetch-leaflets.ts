import { IdResolver } from '@atproto/identity';
import type { DidString, LexMap, ListRecord } from '@atproto/lex';
import { Client } from '@atproto/lex';
import * as pub from '@/util/pub';
import { asLeaflet, Leaflet } from '@/utils/RichText';

const fetchLeaflets = async (): Promise<Leaflet[]> => {
  // Resolve DID and PDS
  const resolver = new IdResolver();
  const did = (await resolver.handle.resolve('pmcd.dev')) as DidString;
  console.log('Resolved pmcd.dev to', did);
  const pds = (await resolver.did.resolveAtprotoData(did!)).pds;
  console.log('Resolved pds to', pds);

  const client = new Client(pds);

  // Fetch all leaflets
  let leaflets: ListRecord<pub.leaflet.document.Main>[] = [];
  let invalids: LexMap[] = [];
  let cursor: string | undefined;
  let i = 0;
  do {
    const result = await client.list(pub.leaflet.document, {
      repo: did!,
      limit: 50,
      reverse: true,
      cursor,
    });
    cursor = result.cursor;
    leaflets = leaflets.concat(result.records);
    invalids = invalids.concat(result.invalid);
  } while (cursor && ++i < 100);
  console.log('Fetched', leaflets.length, 'leaflets.', invalids.length, 'failed validation.');

  return leaflets
    .map(asLeaflet)
    .sort((a, b) => {
      return a.date ? new Date(a.date).getTime() : 0 - (b.date ? new Date(b.date).getTime() : 0);
    })
    .reverse();
};

export default fetchLeaflets;
