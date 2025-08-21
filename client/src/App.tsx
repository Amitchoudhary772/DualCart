import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Landing from "@/pages/Landing";
import Shop from "@/pages/Shop";
import AffiliateDeals from "@/pages/AffiliateDeals";
import About from "@/pages/About";
import Services from "@/pages/Services";
import HelpCenter from "@/pages/HelpCenter";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/shop" component={Shop} />
          <Route path="/deals" component={AffiliateDeals} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/help" component={HelpCenter} />
          <Route path="/contact" component={Contact} />
        </>
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/deals" component={AffiliateDeals} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/help" component={HelpCenter} />
          <Route path="/contact" component={Contact} />
          <Route path="/admin" component={Admin} />
        </>
      )}
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
