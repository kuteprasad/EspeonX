import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const Community = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: "Welcome to the Community", description: "This is the first post in our community discussion forum." },
    { id: 2, title: "Tips for Getting Started", description: "Some tips for getting started with this platform." },
    { id: 3, title: "Introducing New Features", description: "We have some exciting new features coming soon!" },
  ]);

  return (
    <div className="mt-16">
      <SidebarProvider>
        <div
          className="flex min-h-screen relative"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          <AppSidebar />

          <main className="flex-1 p-8 overflow-y-auto relative">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Community</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <h2 className="text-xl font-medium text-gray-800">{post.title}</h2>
                  <p className="text-gray-600 mt-2">{post.description}</p>
                </div>
              ))}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Community;
