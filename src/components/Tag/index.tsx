import { slug } from 'github-slugger';
import Link from 'next/link';

interface Props {
  text: string;
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 hover:text-primary-300 transition-all duration-200"
    >
      {text.split(' ').join('-')}
    </Link>
  );
};

export default Tag;
