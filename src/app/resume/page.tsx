import type { Metadata } from 'next';

import { Resume } from '@/templates/Resume';

export const metadata: Metadata = {
  title: 'Resume — Patrick McDonagh',
  description: 'Resume of Patrick McDonagh — Senior Cloud & IoT Engineer with 10+ years of experience.',
};

export default function ResumePage() {
  return <Resume />;
}
