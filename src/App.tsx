import { AnalyticsProvider } from "./components/analytics/AnalyticsProvider";
import DtmiLandingPage from "./features/landing";

export function App() {
  return (
    <AnalyticsProvider>
      <DtmiLandingPage />
    </AnalyticsProvider>
  );
}
