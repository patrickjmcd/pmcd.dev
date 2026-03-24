import BlogMain from '@/components/BlogMain';
import fetchLeaflets from '@/utils/fetch-leaflets';
import { asLeaflet } from '@/utils/RichText';

export default async function Page() {
  const allLeaflets = await fetchLeaflets();
  const posts = allLeaflets.map(asLeaflet);
  return <BlogMain posts={posts} />;
}
