import Header from "@/components/header";
import { Outlet } from "react-router-dom";
import { Github, Twitter } from "lucide-react";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="w-full bg-gray-800/50 backdrop-blur-sm border-t border-gray-700/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-lime-400 font-bold text-xl">EspeonX</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300">Gaming NFT Marketplace</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="https://github.com" 
                 className="text-gray-400 hover:text-lime-400 transition-colors"
                 target="_blank" 
                 rel="noopener noreferrer">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" 
                 className="text-gray-400 hover:text-lime-400 transition-colors"
                 target="_blank" 
                 rel="noopener noreferrer">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 EspeonX. All rights reserved.
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Made with</span>
              <span className="text-red-500 animate-pulse">❤</span>
              <span className="text-gray-400 text-sm">by</span>
              <span className="text-lime-400 font-semibold">CodeCrew</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
