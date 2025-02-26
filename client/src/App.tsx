
import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import TermsPage from "@/pages/terms-page";
import PrivacyPage from "@/pages/privacy-page";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import { queryClient } from "./lib/queryClient";

function Router() {
  return (
    <Switch>
      <Route path="/pwa-test/auth" component={AuthPage} />
      <Route path="/pwa-test/terms" component={TermsPage} />
      <Route path="/pwa-test/privacy" component={PrivacyPage} />
      <ProtectedRoute path="/pwa-test/home" component={HomePage} />
      <Route path="/pwa-test" component={() => <Redirect to="/pwa-test/home" />} />
      <Route path="/" component={() => <Redirect to="/pwa-test" />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
