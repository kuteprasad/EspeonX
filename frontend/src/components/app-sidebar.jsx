import React, { useState } from 'react'
import { Calendar, Home, Inbox, Search, Settings, Menu } from "lucide-react" // Import Menu icon
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
]

export function AppSidebar() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Sidebar
      className={`transition-all duration-300 ${isHovered ? 'w-64' : 'w-12'} bg-white text-gray-800 flex flex-col h-full mt-16 border-r border-gray-200`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Display menu icon when not hovered */}
      {!isHovered && (
        <div className="absolute top-4 left-4 mt-5">
          <Menu className="h-4 w-4 text-gray-800" />
        </div>
      )}

      <SidebarContent className="flex flex-col p-4 ml-5 mt-6">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="transition-all hover:bg-gray-200 p-3 rounded-md">
              <SidebarMenuButton asChild>
                <a href={item.url} className="flex items-center space-x-2 text-gray-800">
                  {/* Icon always visible */}
                  <item.icon className="h-6 w-6" />
                  {/* Text visibility depends on hover */}
                  <span className={`transition-all duration-300 ${isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    {item.title}
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
