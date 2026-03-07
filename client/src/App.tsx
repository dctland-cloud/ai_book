import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NewsPage from "@/pages/news";
import NotFound from "@/pages/not-found";

// PWA standalone 모드에서 열리면 /news로 바로 이동
const isPWA =
  window.matchMedia("(display-mode: standalone)").matches ||
  (navigator as any).standalone === true;

function Router() {
  return (
    <Switch>
      <Route path="/">
        {isPWA ? <Redirect to="/news" /> : <Home />}
      </Route>
      <Route path="/news" component={NewsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
