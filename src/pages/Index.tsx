import Header from '../components/Header';
import Hero from '../components/Hero';
import CompanyRow from '../components/CompanyRow';
import About from '../components/About';
import ServicesGrid from '../components/ServicesGrid';
import Timeline from '../components/Timeline';
import PortfolioGrid from '../components/PortfolioGrid';
import ContactCTA from '../components/ContactCTA';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Skip Link for Accessibility */}
      <a 
        href="#main" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>

      <Header />
      
      <main id="main">
        <Hero />
        <CompanyRow />
        <About />
        <ServicesGrid />
        <Timeline />
        <PortfolioGrid />
        <ContactCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
