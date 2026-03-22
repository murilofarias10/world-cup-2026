import HeroSection      from '../components/home/HeroSection.jsx';
import FeatureSection   from '../components/home/FeatureSection.jsx';
import ExperienceSection from '../components/home/ExperienceSection.jsx';
import HowItWorks       from '../components/home/HowItWorks.jsx';
import CTASection       from '../components/home/CTASection.jsx';
import Footer           from '../components/Footer.jsx';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="hp-root">
      <HeroSection />
      <FeatureSection />
      <ExperienceSection />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
}
