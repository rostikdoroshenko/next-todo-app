"use client";

import React from "react";
import { Button } from "@aws-amplify/ui-react";
import { signOut } from "@aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { AppState } from "@/models/todo-model";

const SignButton = () => {
  const router = useRouter();
  const isAuth = useSelector((state: AppState) => state.isAuth);

  const singOutSignIn = async () => {
    if (isAuth) {
      await signOut();
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <Button
      data-testid="signin-button"
      variation="primary"
      className="mr-4"
      borderRadius="1rem"
      onClick={singOutSignIn}
    >
      {isAuth ? "Sign Out" : "Sign In"}
    </Button>
  );
};

export default SignButton;
