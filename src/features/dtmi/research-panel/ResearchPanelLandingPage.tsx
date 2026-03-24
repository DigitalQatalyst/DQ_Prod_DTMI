import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../../../shared/Header/Header";
import { Footer } from "../../../shared/Footer/Footer";

const ResearchPanelLandingPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Header />
      <div className="flex-1 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="text-lg text-gray-700 mb-8">
            Thank you for your interest in joining Digital Qatalyst's Research
            Panel, which has engaged tens of thousands of executives in critical
            research on today's most vital business, economic, and management
            trends. We are seeking the views of current business executives and
            professionals in certain roles, industries, and sizes of company.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why should you join?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            In return for participating in our surveys, panel members receive
            immediate access to world-class knowledge on these topics and other
            benefits:
          </p>

          <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
            <li>
              An exclusive look at surveys' key insights before they are
              published
            </li>
            <li>Offers to join invite-only Digital Qatalyst webcasts</li>
            <li>
              The opportunity to connect and network with other panelists in our
              private LinkedIn group
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How do you participate in surveys?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            You will receive invitations to no more than two surveys per month.
            Our surveys are conducted online (self-completion) and in English.
            Participation in our surveys is confidential and does not require
            you to share the name of the organization for which you work.
            Digital Qatalyst surveys typically take no more than 20 minutes to
            complete, and our results are always reported in the aggregate.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How do you join?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            To apply, please click the button below to complete a series of
            demographic questions. Your responses will help us invite you to the
            Digital Qatalyst surveys that are most relevant to your expertise.
          </p>

          <p className="text-sm text-gray-600 mb-8 italic underline">
            Read our privacy and confidentiality statement
          </p>

          <div className="text-center">
            <Link
              to="/research-panel-application"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded transition-colors"
            >
              Apply for the panel
            </Link>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              For any technical issues or questions, please click{" "}
              <span className="text-blue-600 underline cursor-pointer">
                here
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResearchPanelLandingPage;
