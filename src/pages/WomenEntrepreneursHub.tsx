import React from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';

const WomenEntrepreneursHub: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Women Entrepreneurs Hub
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Empowering women entrepreneurs with resources, networking, and support.
          </p>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-700">
              This page is currently being rebuilt. Please check back soon for our comprehensive 
              women entrepreneurs resources and community features.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WomenEntrepreneursHub;