import React from "react";
import AuthClient from "@/components/auth/AuthClient";
import { redirect } from "next/navigation";
import isAuthenticated from "@/utils/amplify-utils";

const SignIn = async () => {
  const user = await isAuthenticated();

  if (user) {
    redirect("/todos");
  }
  return <AuthClient />;
};

export default SignIn;
