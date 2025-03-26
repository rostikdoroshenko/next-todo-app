import Link from "next/link";
import logoImg from "../../../assets/logo.png";
import classes from "./main-header.module.css";
import Image from "next/image";
import MainHeaderBackground from "@/components/main-header/main-header-background";
import Routes from "@/components/main-header/routes";

const MainHeader = async () => {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href={"/"}>
          <Image src={logoImg} alt={"logo"} priority />
          Notebook
        </Link>
        <Routes />
      </header>
    </>
  );
};
export default MainHeader;
