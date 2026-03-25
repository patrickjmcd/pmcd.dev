import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LeafletRenderer } from '@/components/LeafletRenderer';
import PostLayout from '@/layouts/PostLayout';
import siteMetadata from '@/siteMetadata';
import type { linearDocument } from '@/util/pub/leaflet/pages';
import fetchLeaflets from '@/utils/fetch-leaflets';

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata | undefined> {
  const params = await props.params;
  const slug = decodeURI(params.slug.join('/'));
  const allPosts = await fetchLeaflets();
  const post = allPosts.find((p) => p.rkey === slug);
  if (!post) {
    return notFound();
  }

  const publishedAt = post.value.publishedAt ? new Date(post.value.publishedAt).toISOString() : '';
  const imageList = [siteMetadata.socialBanner];
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    };
  });

  return {
    title: post.value.title,
    description: post.value.description,
    openGraph: {
      title: post.value.title,
      description: post.value.description,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: publishedAt,
      url: './',
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.value.title,
      description: post.value.description,
      images: imageList,
    },
  };
}

// export const generateStaticParams = async () => {
//   const allPosts = await fetchLeaflets();
//   return allPosts.map((p) => ({ slug: p.uri.split('/').pop() }));
// };
//
export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params;
  const slug = decodeURI(params.slug.join('/'));

  const allPosts = await fetchLeaflets();
  const postIndex = allPosts.findIndex((p) => p.uri.split('/').pop() === slug);
  if (postIndex === -1) {
    return notFound();
  }

  const prev = allPosts[postIndex + 1];
  const next = allPosts[postIndex - 1];
  const post = allPosts.find((p) => p.uri.split('/').pop() === slug);
  if (!post)
    return (
      <div>
        <h1>Post not found</h1>
      </div>
    );

  const mainContent = post;
  const jsonLd = post.structuredData;
  console.log('jsonLd', jsonLd);
  console.log('post', post);

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: ok
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostLayout content={mainContent} next={next} prev={prev}>
        <p className="not-prose inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 text-primary-400 font-mono px-3 py-1.5 rounded-full text-xs mb-6">
          Posted via{' '}
          <a
            href={`${siteMetadata.leafletBase}/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary-300 transition-colors"
          >
            Leaflet
          </a>
        </p>
        <LeafletRenderer pages={post.pages as linearDocument.Main[]} />
      </PostLayout>
    </>
  );
}
