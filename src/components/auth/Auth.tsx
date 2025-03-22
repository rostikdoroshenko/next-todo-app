"use client";
import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "@/../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import "./signin.css";
import useHub from "@/hooks/use-hub";

Amplify.configure(outputs, { ssr: true });
const Auth = ({ children }: { children: React.ReactNode }) => {
  useHub();
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
};

export default Auth;
