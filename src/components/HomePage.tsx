import React, { useState } from 'react';
import { Header } from '../components/Header';
import { DTMIFooter } from '../pages/dtmi/components/DTMIFooter';
import HeroSection from './HeroSection';
import TransformationStats from './TransformationStats';
import ProofAndTrust from './ProofAndTrust';
import DigitalMaturityAssessment from './DigitalMaturityAssessment';
import Home from './Home';
import KnowledgeHub from './KnowledgeHub';
import CallToAction from './CallToAction';
import DigitalQatalystAttribution from './DigitalQatalystAttribution';
import FeaturedProgramSpotlight from './FeaturedProgramSpotlight';

const HomePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedProgramSpotlight />
        <TransformationStats />
        <ProofAndTrust />
        <DigitalMaturityAssessment />
        <Home />
        <KnowledgeHub graphqlEndpoint={null} />
        <CallToAction />
      </main>
      <DTMIFooter />
      {/* <DigitalQatalystAttribution /> */}
    </div>
  );
};

export default HomePage;