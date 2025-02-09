import React from "react";
import { createRoot } from "react-dom/client";
import  {App } from "./App";
import { ThirdwebProvider } from "thirdweb/react";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
// import { ThirdwebProvider } from "@thirdweb-dev/react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import {App} from "./App";


// const queryClient = new QueryClient();

// function Root() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ThirdwebProvider activeChain="mumbai"> {/* Change this to your preferred chain */}
//         <App />
//       </ThirdwebProvider>
//     </QueryClientProvider>
//   );
// }

// export default Root;
