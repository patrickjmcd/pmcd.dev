'use client';
import dynamic from 'next/dynamic';

export const BlueskyPostEmbed = dynamic(() => import('./inner'), { ssr: false });
