import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import MenuMagnet from "../magnet";

const Header = () => {
  const headerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef(null);
  const openRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const h1Span = header.querySelector("h1 span");
    const p = header.querySelector("p");
    const wrapper = header.querySelector(".wrapper");

    gsap.from(h1Span, {
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
      scale: 0,
      delay: 1,
    });

    gsap.to(wrapper, {
      width: "0%",
      duration: 1,
      ease: "power2.inOut",
    });
  }, []);

  const onRelease = () => {
    
    gsap.to(closeRef.current, {
      top: "100%",
      duration: 0.5,
      ease: "power1.out",
    });

    gsap.to(openRef.current, {
      top: "0%",
      duration: 0.5,
      ease: "power1.out",
    });
  }

  
  const onHover = () => {
  
       
    gsap.to(closeRef.current, {
      top: "0%",
      duration: 0.5,
      ease: "power1.out",
    });

    gsap.to(openRef.current, {
      top: "-100%",
      duration: 0.5,
      ease: "power1.out",
    });
   
  };

  return (
    <div
      id="home"
      ref={headerRef}
      className="h-[80vh] px-6 md:px-8 xl:px-0 home py-10 flex flex-col justify-center"
    >
      <div className="relative">
        <div className="absolute wrapper h-full w-full z-10 bg-cyan-300" />
        <h1 className="text-main text-5xl md:text-6xl font-bold">
          Hi 👋, my
          <br />
          ​name is Afaq<span className="text-cyan-300">.</span>
        </h1>
        <p className="text-main max-w-5xl mt-6">
          I'm a developer, designer and linguist who has been building for the
          web in some capacity since 2022. <br />I specialize in accessibility,
          performance and usability without sacrificing creativity.
        </p>
        <MenuMagnet>
        <div
          onMouseEnter={onHover}
          onMouseLeave={onRelease}
   
           className={`border-cyan-100 perspective relative mt-10 w-40 h-14 overflow-hidden bg-white p-4  shadow-2xl cursor-pointer  flex-col border-4 rounded-md flex items-center justify-center gap-1 shrink-0 transition-opacity duration-300`}
        >
          <div
            ref={openRef}
            className="absolute h-full w-full overflow-hidden flex items-center justify-center"
          >
            Hover Me!
          </div>
          <div
            ref={closeRef}
            className="bg-cyan-900 overflow-hidden border-cyan-100 close absolute h-full flex items-center justify-center w-full top-full text-cyan-300"
          >
            Resume
          </div>
        </div>
        </MenuMagnet>
      </div>
    </div>
  );
};

export default Header;
