import BlogMain from '@/components/BlogMain';
import fetchLeaflets from '@/utils/fetch-leaflets';

export default async function Page() {
  const posts = await fetchLeaflets();
  return <BlogMain posts={posts} />;
}
