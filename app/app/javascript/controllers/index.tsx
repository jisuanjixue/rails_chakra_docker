import ReactDOM from "react-dom";
import React from "react";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import App from "../app";

// Create a client
const queryClient = new QueryClient()
console.log("🚀 ~ file: index.tsx ~ line 11 ~ queryClient", queryClient)

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("app") as HTMLElement
);
