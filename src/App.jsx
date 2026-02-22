import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Comparison from './components/Comparison';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import About from './components/About';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Comparison />
        <Pricing />
        <About />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
