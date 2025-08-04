import Navigation from "./Navigation";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">🌾 FarmDirect</h1>
            </div>
            <Navigation />
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-white/90 hover:text-white hover:bg-white/10"
            >
              Sign In
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 text-black font-medium">
              Join as Farmer <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
