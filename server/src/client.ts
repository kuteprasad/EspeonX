import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = import.meta.env.VITE_TEMPLATE_CLIENT_ID;

export const client = createThirdwebClient({
  clientId: clientId,
});
// import { createThirdwebClient } from "thirdweb";
// import { Ethereum, Mumbai } from "@thirdweb-dev/chains"; // ✅ Correct import

// export const client = createThirdwebClient({
//   clientId: "b5b75382b8c2251d3fef906a4427523f", // Replace with your actual Client ID from Thirdweb
//   supportedChains: [Ethereum, Mumbai], // ✅ Use correct chain names
// });