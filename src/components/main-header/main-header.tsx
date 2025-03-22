"use client";

import Link from "next/link";
import logoImg from "../../../assets/logo.png";
import classes from "./main-header.module.css";
import Image from "next/image";
import MainHeaderBackground from "@/components/main-header/main-header-background";
import { Button, Flex } from "@aws-amplify/ui-react";
import { signOut } from "@aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { AppState } from "@/models/todo-model";

const MainHeader = () => {
  const router = useRouter();
  const authCheck = useSelector((state: AppState) => state.isAuth);

  const singOutSignIn = async () => {
    if (authCheck) {
      await signOut();
    } else {
      router.push("/sign-in");
    }
  };

  const defaultRoutes = [
    { href: "/", label: "Home" },
    { href: "/add-todo", label: "Add Todo", loggedIn: true },
    { href: "/todos", label: "Todo List", loggedIn: true },
    { href: "/community", label: "Browse Community" },
  ];

  const routes = defaultRoutes.filter(
    (route) => route.loggedIn === authCheck || route.loggedIn === undefined,
  );

  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href={"/"}>
          <Image src={logoImg} alt={"logo"} priority />
          Notebook
        </Link>

        <Flex as="nav" alignItems="center" gap="3rem" className={classes.nav}>
          {routes.map((route) => (
            <Link key={route.label} href={route.href}>
              {route.label}
            </Link>
          ))}
          <Button
            data-testid="signin-button"
            variation="primary"
            className="mr-4"
            borderRadius="1rem"
            onClick={singOutSignIn}
          >
            {authCheck ? "Sign Out" : "Sign In"}
          </Button>
        </Flex>
      </header>
    </>
  );
};
export default MainHeader;
