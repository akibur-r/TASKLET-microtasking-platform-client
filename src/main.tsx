import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import AuthProvider from "./providers/AuthProvider/AuthProvider.tsx";
import DBUserProvider from "./providers/DBUserProvider/DBUserProvider.tsx";
import { ThemeProvider } from "./providers/ThemeProvider/ThemeProvider.tsx";
import { router } from "./router/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <DBUserProvider>
          <RouterProvider router={router} />
        </DBUserProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
