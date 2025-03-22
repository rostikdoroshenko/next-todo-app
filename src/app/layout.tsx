import "./globals.css";
import MainHeader from "@/components/main-header/main-header";
import React, { ReactNode } from "react";
import Providers from "@/store/providers";
import Auth from "@/components/auth/Auth";
import isAuthenticated from "@/utils/amplify-utils";

export const metadata = {
  title: "Todo App",
  description: "Add your todos now...",
};

interface RootLayoutInterface {
  children?: ReactNode;
}

const RootLayout: React.FC<RootLayoutInterface> = async ({ children }) => {
  const isAuth = await isAuthenticated();

  return (
    <html lang="en">
      <body>
        <Providers isAuth={isAuth}>
          <MainHeader />
          <Auth>{children}</Auth>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
