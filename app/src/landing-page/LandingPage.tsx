import ExamplesCarousel from './components/ExamplesCarousel';
import FAQ from './components/FAQ';
import FeaturesGrid from './components/FeaturesGrid';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import AIReady from './ExampleHighlightedFeature';
import { examples, faqs, features, footerNavigation, testimonials } from './contentSections';
import RollingGallery from './components/RollingGallery';
import { useAuth } from 'wasp/client/auth';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const { data: user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate('/categories');
    return null;
  }
  return (
    <div className='bg-background text-foreground'>
      <main className='isolate'>
        <Hero />
        {/* <ExamplesCarousel examples={examples} /> */}
        {/* <AIReady /> */}
        <FeaturesGrid features={features} />
        {/* <Testimonials testimonials={testimonials} /> */}
        {/* <FAQ faqs={faqs} /> */}
      </main>
      <Footer footerNavigation={footerNavigation} />
    </div>
  );
}

