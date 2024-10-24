"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

export default function Providers({ children }) {
  const [client] = useState(new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
