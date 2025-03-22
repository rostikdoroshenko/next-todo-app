"use client";

import { Provider } from "react-redux";
import { createStore } from "@/store";

interface ProvidersProps {
  children: React.ReactNode;
  isAuth: boolean;
}

const Providers = ({ isAuth, children }: ProvidersProps) => {
  return <Provider store={createStore(isAuth)}>{children}</Provider>;
};

export default Providers;
