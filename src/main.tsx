import App from "./App.tsx";
import store from "./store.ts";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const container = document.getElementById("root");
const queryClient = new QueryClient();

if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StrictMode>
          <App />
        </StrictMode>
      </QueryClientProvider>
    </Provider>
  );
}
