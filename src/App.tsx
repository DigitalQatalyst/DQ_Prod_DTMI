import { AnalyticsProvider } from "./shared/analytics/AnalyticsProvider";
import DtmiLandingPage from "./features/landing";

export function App() {
  return (
    <AnalyticsProvider>
      <DtmiLandingPage />
    </AnalyticsProvider>
  );
}
