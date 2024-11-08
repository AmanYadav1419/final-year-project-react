import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/User.jsx";
import { SongProvider } from "./context/Song.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* wrap the app file with the user context to acess data globally */}
    <UserProvider>
      {/* wrap the app file with song context to acess data globally */}
      <SongProvider>
        <App />
      </SongProvider>
    </UserProvider>
  </StrictMode>
);
