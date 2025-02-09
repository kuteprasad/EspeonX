import Header from "@/components/header";
import { Outlet } from "react-router-dom";
// import Chatbot from "@/components/chatbot"; // Import the chatbot component

const AppLayout = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="min-h-screen container mx-auto">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10 border-t border-gray-700">
        Made with 💗 by CodeCrew
      </div>
    </div>
  );
};

export default AppLayout;
