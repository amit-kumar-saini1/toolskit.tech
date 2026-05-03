import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdSenseLoader from "@/components/AdSenseLoader";

const queryClient = new QueryClient();

/**
 * App now acts as a Providers wrapper. Routing has been moved to TanStack
 * Router's file-based routes in src/routes/. Each route file imports its
 * page directly and wraps it with <AppProviders>.
 */
const AppProviders = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AdSenseLoader />
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);

export default AppProviders;
