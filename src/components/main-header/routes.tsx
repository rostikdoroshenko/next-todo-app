"use client";

import React from "react";
import classes from "@/components/main-header/main-header.module.css";
import Link from "next/link";
import SignButton from "@/components/main-header/sign-button";
import { Flex } from "@aws-amplify/ui-react";
import { useSelector } from "react-redux";
import { AppState } from "@/models/todo-model";
import { usePathname } from "next/navigation";

const Routes = () => {
  const isAuth = useSelector((state: AppState) => state.isAuth);
  const path = usePathname();

  const defaultRoutes = [
    { href: "/", label: "Home" },
    { href: "/add-todo", label: "Add Todo", loggedIn: true },
    { href: "/todos", label: "Todo List", loggedIn: true },
    { href: "/community", label: "Browse Community" },
  ];

  const routes = defaultRoutes.filter(
    (route) => route.loggedIn === isAuth || route.loggedIn === undefined,
  );
  return (
    <Flex as="nav" alignItems="center" gap="3rem" className={classes.nav}>
      {routes.map((route) => (
        <Link
          key={route.label}
          href={route.href}
          className={path === route.href ? classes.active : ""}
        >
          {route.label}
        </Link>
      ))}
      <SignButton />
    </Flex>
  );
};

export default Routes;
