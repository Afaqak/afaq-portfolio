import * as React from "react";
import Header from "../components/header";
import AboutMe from "../components/about-me";
import TechStack from "../components/tech-stack";
import Work from "../components/work";
import Menu from "../components/menu";
import Footer from "../components/footer";
import StackScroller from "../components/stack-scroller";
import { Link } from "gatsby";
const IndexPage = () => {
  return (
    <main className=" overflow-hidden scroll-smooth">
      <Link
        to="/"
        className="px-8 sticky top-0 md:px-32 h-10 mt-12 md:mt-14 cursor-pointer font-semibold text-lg text-cyan-900 flex flex-col"
      >
        FrivXd
      </Link>
      <Menu />
      <div id="home">
        <Header />
      </div>
      <div id="about">
        <AboutMe />
      </div>
      <TechStack />
      <StackScroller />
      <div id="work">
        <Work />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>FrivXd</title>;
