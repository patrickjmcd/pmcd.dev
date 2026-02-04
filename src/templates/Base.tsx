import { AnimatedGradient } from '@/background/AnimatedGradient';

import { About } from './About';
import { Banner } from './Banner';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Projects } from './Projects';
import { Skills } from './Skills';

const Base = () => (
  <AnimatedGradient>
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Banner />
    <Footer />
  </AnimatedGradient>
);

export { Base };
