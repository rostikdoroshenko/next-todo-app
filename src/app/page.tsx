import Link from "next/link";
import classes from "./page.module.css";

const Home = () => {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.slideshow}></div>
        <div>
          <div className={classes.hero}>
            <h1>NextLevel application for managing todos</h1>
            <p>Add & edit your todos.</p>
          </div>
          <div className={classes.cta}>
            <Link href="/community">Join the Community</Link>
            <Link data-testid="link" href="/todos">
              Todos
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Home;
