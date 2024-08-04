import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const StackScroller = () => {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: row1Ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.to(row1Ref.current, { xPercent: -20, ease: "none" }, 0)
      .to(row2Ref.current, { xPercent: 20, ease: "none" }, 0)
      .to(row3Ref.current, { xPercent: -20, ease: "none" }, 0);
  });

  return (
    <div className="overflow-hidden flex flex-col gap-8 items-center justify-center h-screen">
      <div
        ref={row1Ref}
        className="flex gap-4 py-4 text-6xl  font-bold text-gray-200 whitespace-nowrap"
      >
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          Node.js
        </div>
        <div>.</div>

        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          React
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          MongoDB
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          Express
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          TypeScript
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          HTML
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          CSS
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          JavaScript
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          {" "}
          Python
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          Django
        </div>
      </div>
      <div
        ref={row2Ref}
        className="flex gap-4 py-4 text-6xl font-bold text-gray-200  whitespace-nowrap"
      >
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          GraphQL
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          Next.js
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          PostgreSQL
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          Docker
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          JAMstack
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          Redux
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          Gatsby
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          Angular
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          Vue.js
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          Swift
        </div>
      </div>
      <div
        ref={row3Ref}
        className="flex gap-4 py-4 text-6xl font-bold text-gray-200 whitespace-nowrap"
      >
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          Git
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          AWS
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          Firebase
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          Vercel
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          Webpack
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          Kubernetes
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          Azure
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          Heroku
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          Linux
        </div>
        <div>.</div>
        <div className="hover:rotate-3 transition-all duration-300 ease-in-out hover:text-cyan-200 transform cursor-pointer">
          Terraform
        </div>
      </div>
    </div>
  );
};

export default StackScroller;
