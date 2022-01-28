import ReactDOM from "react-dom";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./app";

// Create a client
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("app") as HTMLElement
);
