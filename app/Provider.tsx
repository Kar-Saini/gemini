"use client";
import { ThemeProvider } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const Provider = ({
  children,
}: React.ComponentProps<typeof NextThemesProvider>) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      {children}
    </ThemeProvider>
  );
};

export default Provider;
