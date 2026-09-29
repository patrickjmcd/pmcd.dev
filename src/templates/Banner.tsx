import { SocialLinks } from '@/components/SocialLinks';
import siteMetadata from '@/siteMetadata';

const Banner = () => (
  <section id="contact" className="py-24 px-4 scroll-mt-16 border-t-[3px] border-ink">
    <div className="max-w-6xl mx-auto">
      <div className="nb-card bg-tang text-coal p-8 md:p-14">
        <div className="on-accent">
          <span className="nb-kicker mb-6">04 / Contact</span>
          <h2 className="font-display text-4xl md:text-7xl leading-none tracking-tight mb-6">
            Say hi.
          </h2>
          <p className="text-lg md:text-xl font-medium max-w-2xl mb-10">
            Have a project in mind, want a second set of eyes on something, or just want to talk
            shop? Email is the best way to reach me.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a href={`mailto:${siteMetadata.email}`} className="nb-btn text-lg">
              {siteMetadata.email}
            </a>
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export { Banner };
