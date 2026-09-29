import { About } from './About';
import { Banner } from './Banner';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Projects } from './Projects';
import { Skills } from './Skills';

const Base = () => (
  <>
    <Hero />
    <main>
      <About />
      <Skills />
      <Projects />
      <Banner />
    </main>
    <Footer />
  </>
);

export { Base };
