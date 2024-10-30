import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/User.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* wrap the app file with the user context to acess data globally */}
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
