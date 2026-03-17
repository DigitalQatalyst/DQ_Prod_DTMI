import React from "react";
import { AnalyticsProvider } from "./components/analytics/AnalyticsProvider";
import DtmiLandingPage from "./pages/dtmi/DtmiLandingPage";

export function App() {
  return (
    <AnalyticsProvider>
      <DtmiLandingPage />
    </AnalyticsProvider>
  );
}
