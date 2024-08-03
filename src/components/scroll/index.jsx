import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Scroll = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const box = scrollRef.current.querySelector(".box");
    const text = scrollRef.current.querySelector(".text");

    gsap.to(box, {
      scrollTrigger: {
        trigger: box,
        start: "top 50%",
        end: "top -40%", 

        scrub: 1,
      },
      height: 0,
      duration: 2,
      ease: "power1.out",
    });
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex flex-col py-20 items-center gap-2 text-neutral-500 justify-center w-fit"
    >
      <div className="text text-sm transform">scroll</div>
      <div className="box w-[0.1rem] bg-neutral-400 h-64"></div>
    </div>
  );
};

export default Scroll;
