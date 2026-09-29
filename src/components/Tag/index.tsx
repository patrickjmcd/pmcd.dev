import { slug } from 'github-slugger';
import Link from 'next/link';

interface Props {
  text: string;
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/tags/${slug(text)}`} className="nb-chip hover:bg-lemon hover:text-coal">
      #{text.split(' ').join('-')}
    </Link>
  );
};

export default Tag;
