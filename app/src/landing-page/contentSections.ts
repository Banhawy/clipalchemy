import daBoiAvatar from '../client/static/da-boi.webp';
import kivo from '../client/static/examples/kivo.webp';
import messync from '../client/static/examples/messync.webp';
import microinfluencerClub from '../client/static/examples/microinfluencers.webp';
import promptpanda from '../client/static/examples/promptpanda.webp';
import reviewradar from '../client/static/examples/reviewradar.webp';
import scribeist from '../client/static/examples/scribeist.webp';
import searchcraft from '../client/static/examples/searchcraft.webp';
import { BlogUrl, DocsUrl } from '../shared/common';
import type { GridFeature } from './components/FeaturesGrid';

export const features: GridFeature[] = [
  {
    name: 'Multi-Platform Support',
    description: 'Analyze videos from Instagram, Facebook, YouTube, and TikTok',
    emoji: '🌐',
    href: DocsUrl,
    size: 'medium',
  },
  {
    name: 'Recipe Extraction',
    description: 'Get detailed recipes and cooking instructions from cooking videos',
    emoji: '🍳',
    href: DocsUrl,
    size: 'large',
  },
  {
    name: 'Beauty & Skincare',
    description: 'Extract face mask ingredients, measurements, and application steps',
    emoji: '💆‍♀️',
    href: DocsUrl,
    size: 'medium',
  },
  {
    name: 'DIY Tutorials',
    description: 'Transform DIY videos into step-by-step written guides',
    emoji: '🛠️',
    href: DocsUrl,
    size: 'large',
  },
  {
    name: 'AI-Powered Analysis',
    description: 'Advanced AI processes video content to extract actionable insights',
    emoji: '🤖',
    href: DocsUrl,
    size: 'medium',
  },
  {
    name: 'Instant Processing',
    description: 'Fast video analysis with real-time streaming results',
    emoji: '⚡',
    href: DocsUrl,
    size: 'small',
  },
  {
    name: 'Smart URL Detection',
    description: 'Automatically detects and validates social media platform URLs',
    emoji: '🔗',
    href: DocsUrl,
    size: 'small',
  },
  {
    name: 'Video Preview',
    description: 'Watch processed videos with integrated player controls',
    emoji: '📹',
    href: DocsUrl,
    size: 'medium',
  },
  {
    name: 'Structured Output',
    description: 'Get beautifully formatted markdown content ready to use',
    emoji: '📝',
    href: DocsUrl,
    size: 'medium',
  },
];

export const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Food Blogger',
    avatarSrc: daBoiAvatar,
    socialUrl: 'https://twitter.com/foodblogger',
    quote: "This tool has revolutionized how I create content! I can now extract perfect recipes from any cooking video in seconds.",
  },
  {
    name: 'Mike Rodriguez',
    role: 'DIY Content Creator',
    avatarSrc: daBoiAvatar,
    socialUrl: '',
    quote: 'Amazing! I use this to convert my TikTok DIY videos into detailed blog posts. Saves me hours of writing.',
  },
  {
    name: 'Emma Watson',
    role: 'Beauty Influencer',
    avatarSrc: daBoiAvatar,
    socialUrl: '#',
    quote: 'Perfect for extracting skincare routines and face mask recipes from beauty videos. My audience loves the detailed guides!',
  },
];

export const faqs = [
  {
    id: 1,
    question: 'Whats the meaning of life?',
    answer: '42.',
    href: 'https://en.wikipedia.org/wiki/42_(number)',
  },
];

export const footerNavigation = {
  app: [
    { name: 'Documentation', href: DocsUrl },
    { name: 'Blog', href: BlogUrl },
  ],
  company: [
    { name: 'About', href: 'https://wasp.sh' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
};

export const examples = [
  {
    name: 'Example #1',
    description: 'Describe your example here.',
    imageSrc: kivo,
    href: '#',
  },
  {
    name: 'Example #2',
    description: 'Describe your example here.',
    imageSrc: messync,
    href: '#',
  },
  {
    name: 'Example #3',
    description: 'Describe your example here.',
    imageSrc: microinfluencerClub,
    href: '#',
  },
  {
    name: 'Example #4',
    description: 'Describe your example here.',
    imageSrc: promptpanda,
    href: '#',
  },
  {
    name: 'Example #5',
    description: 'Describe your example here.',
    imageSrc: reviewradar,
    href: '#',
  },
  {
    name: 'Example #6',
    description: 'Describe your example here.',
    imageSrc: scribeist,
    href: '#',
  },
  {
    name: 'Example #7',
    description: 'Describe your example here.',
    imageSrc: searchcraft,
    href: '#',
  },
];
