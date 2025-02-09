import { Webchat, WebchatProvider, Fab, getClient } from "@botpress/webchat";
import { buildTheme } from "@botpress/webchat-generator";
import { useState } from "react";

const { theme, style } = buildTheme({
  themeName: "prism",
  themeColor: "#634433",
});

// Add your Client ID here
const clientId = "fa7ce21e-7273-4613-9f0c-771885bddd77";

const Chatbot = () => {
  const client = getClient({ clientId });
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);

  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <style>{style}</style>
      <WebchatProvider theme={theme} client={client}>
        <Fab
          onClick={toggleWebchat}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 9999, // Ensure it stays above other content
          }}
        />
        <div
          style={{
            display: isWebchatOpen ? "block" : "none",
            position: "fixed",
            bottom: "80px", // Adjust the position to give space above the button
            right: "20px",
            zIndex: 9999, // Ensure it stays above other content
            maxWidth: "400px", // Optional: Restrict the width of the chatbot
            width: "100%",
            height: "400px", // Optional: Limit height if needed
          }}
        >
          <Webchat />
        </div>
      </WebchatProvider>
    </div>
  );
};

export default Chatbot;
