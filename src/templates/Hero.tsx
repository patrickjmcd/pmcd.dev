import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { HeroOneButton } from '../hero/HeroOneButton';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { Logo } from './Logo';

const Hero = () => (
  <Background color="bg-gray-100">
    <Section yPadding="py-6">
      <NavbarTwoColumns logo={<Logo xl />}>
        {/*<li>*/}
        {/*  <Link href="https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template">*/}
        {/*    GitHub*/}
        {/*  </Link>*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <Link href="/">Sign in</Link>*/}
        {/*</li>*/}
      </NavbarTwoColumns>
    </Section>

    <Section yPadding="pt-20 pb-32">
      <HeroOneButton
        title={
          <>
            {'The online home of\n'}
            <span className="text-primary-500">Patrick McDonagh</span>
          </>
        }
        description="Software developer based in KCMO. I specialize in solving complex problems with simple solutions. I'm passionate about building software that is easy to use and maintain. I'm currently looking for new opportunities."
        // button={
        //   <Link href="https://pmcd.dev">
        //     <Button xl>Get in touch</Button>
        //   </Link>
        // }
      />
    </Section>
  </Background>
);

export { Hero };
