import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/layout/Header";
import HeroSection from "./components/hero/HeroSection";
import ProductsSection from "./components/sections/ProductsSection";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <HeroSection />
          <ProductsSection />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
