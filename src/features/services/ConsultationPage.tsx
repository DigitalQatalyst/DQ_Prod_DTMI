import React from "react";
import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import CallToAction from "../../shared/CallToAction";
import ModernDQChatbot from "../../shared/ModernDQChatbot";

export default function ConsultationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <CallToAction />
      </main>

      <Footer />
      
      {/* DQ AI Chatbot */}
      <ModernDQChatbot />
    </div>
  );
}

