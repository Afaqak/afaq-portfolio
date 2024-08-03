import { StaticImage } from "gatsby-plugin-image";
import React, { useRef } from "react";
import Icons from "../icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scroll from "../scroll";

gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const p = containerRef.current.querySelector("p");
    gsap.to(p, {
      scrollTrigger: {
        trigger: p,
        start: "top 90%",
        end: "top 70%",
        scrub: 1,
      },
      duration: 0.5,
      translateY: "0%",
      height: "100%",
      opacity: 1,
      borderRadius: 0,
      ease: "power1.out",
    });
  });

  return (
    <div ref={containerRef} className="px-8 py-32 md:mx-32">
      <h2 className="text-4xl font-bold text-main">
        Tech Stack
        <span className="block w-24 h-[0.2rem] mt-2 bg-cyan-200"></span>
      </h2>
      <p className="my-3 translate-y-full h-0 opacity-0">
        In addition to front-end development, I specialize in full-stack
        development using modern technologies. Whether you need a robust API
        with Node.js and Express, a dynamic application with React, or a
        scalable database solution with MongoDB, I’ve got you covered. I've
        worked extensively with various tech stacks to deliver fast, secure, and
        reliable projects. If you have specific requirements or need assistance
        with planning and executing a project, I'm here to help you build and
        deliver a solution that meets your needs.
      </p>

      <p className="my-3">
        Here are a few technologies I’ve been working with recently:
      </p>
      <ul className="grid grid-cols-2 w-fit gap-4">
        <li className="flex gap-2 items-center">
          <Icons.javascript /> JavaScript
        </li>
        <li className="flex gap-2 items-center">
          <Icons.typescript />
          TypeScript
        </li>
        <li className="flex gap-2 items-center">
          <Icons.reactjs />
          React
        </li>
        <li className="flex gap-2 items-center">
          <Icons.nextjs />
          Next Js
        </li>
        <li className="flex gap-2 items-center">
          <Icons.nodejs />
          Node Js
        </li>
        <li className="flex gap-2 items-center">
          <Icons.mongodb />
          Mongodb
        </li>
      </ul>
      <Scroll />
    </div>
  );
};

export default TechStack;
