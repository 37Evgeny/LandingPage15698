import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/app.jsx";
import "./index.css";

/**
 * Точка входа приложения.
 * BrowserRouter оборачивает всё дерево —
 * даёт доступ к useNavigate, useParams, useLocation
 * в любом компоненте.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
