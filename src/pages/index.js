import * as React from "react";
import Header from "../components/header";
import AboutMe from "../components/about-me";
import TechStack from "../components/tech-stack";
import Work from "../components/work";
import Menu from "../components/menu";
import Scroll from "../components/scroll";
import Footer from "../components/footer";
import StackScroller from "../components/stack-scroller";
const IndexPage = () => {
  return (
    <main className=" overflow-hidden scroll-smooth">
      <Menu />
      <div id="home">
        <Header />
      </div>
      <div id="about">
        <AboutMe />
      </div>
        <TechStack />
      <StackScroller/>
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
