import type { ListRecord } from '@atproto/lex';
import siteMetadata from '@/siteMetadata';
import * as pub from '@/util/pub';
import * as siteStandard from '@/util/site/standard';
import { facet } from '@/util/pub/leaflet/richtext';

type AnyLeafletRecord = ListRecord<pub.leaflet.document.Main> | ListRecord<siteStandard.document.Main>;

export type Leaflet = AnyLeafletRecord & {
  summary?: string;
  date?: string;
  tags: string[];
  rkey: string;
  publication: string;
  pages: pub.leaflet.document.Main['pages'];
  structuredData: {
    '@context': string;
    '@type': string;
    headline: string;
    datePublished?: string;
    description?: string;
    url: string;
  };
};

export function asLeaflet(leaflet: AnyLeafletRecord): Leaflet {
  const rkey = leaflet.uri.split('/').pop() || '';
  const v = leaflet.value;

  // site.standard.document nests pages under value.content.pages;
  // pub.leaflet.document has pages directly on value.pages.
  const pages =
    'pages' in v
      ? v.pages
      : ((v.content as { pages?: pub.leaflet.document.Main['pages'] })?.pages ?? []);

  return {
    ...leaflet,
    pages,
    summary: v.description,
    date: v.publishedAt,
    tags: v.tags ?? [],
    rkey,
    publication: ('author' in v ? v.author : v.site)?.split(':').pop() ?? '',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: v.title,
      datePublished: v.publishedAt,
      description: v.description,
      url: `${siteMetadata.siteUrl}/${rkey}`,
    },
  };
}

export class RichTextSegment {
  constructor(
    public text: string,
    public facet?: facet.Main,
  ) {}
}

export class RichText {
  unicodeText: UnicodeString;
  facets?: facet.Main[];

  constructor(text: string, facets?: facet.Main[]) {
    this.unicodeText = new UnicodeString(text);
    this.facets = facets;
    if (this.facets) {
      this.facets = this.facets.filter(facetFilter).sort(facetSort);
    }
  }

  get text() {
    return this.unicodeText.toString();
  }

  get length() {
    return this.unicodeText.length;
  }

  *segments(): Generator<RichTextSegment, void, void> {
    const facets = this.facets || [];
    if (!facets.length) {
      yield new RichTextSegment(this.unicodeText.utf16);
      return;
    }

    let textCursor = 0;
    let facetCursor = 0;
    do {
      const currFacet = facets[facetCursor];
      if (textCursor < currFacet.index.byteStart) {
        yield new RichTextSegment(this.unicodeText.slice(textCursor, currFacet.index.byteStart));
      } else if (textCursor > currFacet.index.byteStart) {
        facetCursor++;
        continue;
      }
      if (currFacet.index.byteStart < currFacet.index.byteEnd) {
        const subtext = this.unicodeText.slice(currFacet.index.byteStart, currFacet.index.byteEnd);
        if (!subtext.trim()) {
          // dont empty string entities
          yield new RichTextSegment(subtext);
        } else {
          yield new RichTextSegment(subtext, currFacet);
        }
      }
      textCursor = currFacet.index.byteEnd;
      facetCursor++;
    } while (facetCursor < facets.length);
    if (textCursor < this.unicodeText.length) {
      yield new RichTextSegment(this.unicodeText.slice(textCursor, this.unicodeText.length));
    }
  }
}

const facetSort = (a: facet.Main, b: facet.Main) => a.index.byteStart - b.index.byteStart;

const facetFilter = (facet: facet.Main) =>
  // discard negative-length facets. zero-length facets are valid
  facet.index.byteStart <= facet.index.byteEnd;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export class UnicodeString {
  utf16: string;
  utf8: Uint8Array;

  constructor(utf16: string) {
    this.utf16 = utf16;
    this.utf8 = encoder.encode(utf16);
  }

  get length() {
    return this.utf8.byteLength;
  }

  slice(start?: number, end?: number): string {
    return decoder.decode(this.utf8.slice(start, end));
  }

  utf16IndexToUtf8Index(i: number) {
    return encoder.encode(this.utf16.slice(0, i)).byteLength;
  }

  toString() {
    return this.utf16;
  }
}
