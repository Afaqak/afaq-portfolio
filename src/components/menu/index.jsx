import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import MenuMagnet from "../magnet";

import { AnimatePresence, motion } from "framer-motion";
// class Magnet {
//   constructor({ target, magText }) {
//     this.element = target.nodeType ? target : document.querySelector(target);
//     this.magText = magText ? magText : false;

//     this.init();
//     this.addListeners();
//     this.xTo = gsap.quickTo(this.element, "x");
//     this.yTo = gsap.quickTo(this.element, "y");
//   }

//   magnetize(val) {
//     const dist = gsap.utils.normalize(0, this.dimensions.width, Math.abs(val));
//     const interp = gsap.utils.interpolate([1, 0.4, 0], dist);
//     return interp;
//   }

//   calcFactor(val) {
//     return gsap.utils.mapRange(
//       10,
//       170,
//       0.8,
//       1.75
//     )(gsap.utils.clamp(10, 170)(val));
//   }

//   init() {
//     if (this.magText) {
//       this.text = document.createElement("span");
//       this.text.innerText = this.element.innerText;
//       this.element.innerHTML = "";
//       this.element.insertAdjacentElement("afterbegin", this.text);
//       gsap.set(this.text, {
//         pointerEvents: "none",
//         display: "block",
//       });
//     }
//     this.dimensions = this.element.getBoundingClientRect();
//     this.mousePosition = { x: 0, y: 0 }; // Initialize mousePosition
//   }

//   resize() {
//     this.dimensions = this.element.getBoundingClientRect();
//   }

//   addListeners() {
//     window.addEventListener("resize", () => {
//       this.resize();
//     });

//     const { element, text } = this;

//     const moveEvent = (e) => {
//       this.mousePosition = { x: e.pageX, y: e.pageY }; // Update mousePosition here

//       const { left, top, width, height } = this.dimensions;
//       const relX = this.mousePosition.x - left - width / 2;
//       const relY = this.mousePosition.y - top - height / 2;
//       const moveX = this.magnetize(relX);
//       const moveY = this.magnetize(relY);

//       gsap.to(element, {
//         x: moveX * relX,
//         y: moveY * relY,
//       });

//       if (text) {
//         gsap.to(text, {
//           x: moveX * relX * 0.3,
//           y: moveY * relY * 0.2,
//         });
//       }
//     };

//     const leaveEvent = () => {
//       const { left, top, width, height } = this.dimensions;
//       const relX = this.mousePosition.x - left - width / 2;
//       const relY = this.mousePosition.y - top - height / 2;

//       const dist = Math.sqrt(Math.pow(relX, 2) + Math.pow(relY, 2));

//       const factor = this.calcFactor(dist);
//       gsap.to(element, {
//         x: 0,
//         y: 0,
//         ease: `elastic.out(${factor}, 0.5)`,
//         duration: 1,
//       });
//       if (text) {
//         gsap.to(text, {
//           x: 0,
//           y: 0,
//           ease: `elastic.out(${factor}, 0.5)`,
//           duration: 1,
//         });
//       }
//     };

//     // element.addEventListener("mousemove", moveEvent);
//     // element.addEventListener("mouseleave", leaveEvent);
//   }
// }

const Menu = () => {
  const menuRef = useRef();
  const isScrolling = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const closeRef = useRef(null);
  const openRef = useRef(null);
  const menu = useRef(null);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (!isScrolling.current) {
        isScrolling.current = true;
        gsap.to(".menu", {
          autoAlpha: 0,
          scale: 0,
          y: -20,
          duration: 0.5,
          ease: "power3.out",
        });
      }
    };

    const handleScrollEnd = () => {
      if (isScrolling.current) {
        isScrolling.current = false;
        gsap.to(".menu", {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
        });
      }
    };

    let scrollTimeout;
    window.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      handleScroll();
      scrollTimeout = setTimeout(handleScrollEnd, 100);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const menuItemsRef = useRef([]);
  menuItemsRef.current = [];

  const onClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
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
    } else {
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
  };
  useLayoutEffect(() => {
    function onOutsideClick(e) {
      console.log(e.target.contains(menuRef.current), e.target);
      if (
        menu.current &&
        !menu.current.contains(e.target) &&
        !e.target.contains(closeRef.current)
      ) {
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
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", onOutsideClick);
    document.addEventListener("touchstart", onOutsideClick);

    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
      document.removeEventListener("touchstart", onOutsideClick);
    };
  }, []);

  return (
    <div className="z-[9999999999] relative">
      <MenuMagnet>
        <div
          onClick={onClick}
          ref={menuRef}
          className="menu overflow-hidden bg-white w-20 h-12 shadow-2xl z-[999999] fixed cursor-pointer top-10 right-8 flex-col border-2 rounded-md flex items-center justify-center gap-1 shrink-0 transition-opacity duration-300"
        >
          <motion.div
            ref={openRef}
            className="absolute open h-full w-full flex items-center justify-center"
            animate={{ top: isOpen ? "-100%" : "0%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            Open
          </motion.div>
          <motion.div
            ref={closeRef}
            className="bg-cyan-900 border-cyan-100 close absolute h-full flex items-center justify-center w-full top-full text-cyan-300"
            animate={{ top: isOpen ? "0%" : "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            Close
          </motion.div>
        </div>
      </MenuMagnet>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ right: "-100%" }}
            animate={{ right: "0%" }}
            exit={{ right: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            ref={menu}
            className="w-[450px] h-full fixed top-0 flex z-50 bg-cyan-900 shadow-2xl p-4"
          >
            <ul className="flex flex-col p-24">
              {["Home", "About", "Work", "Footer"].map((item, index) => (
                <div
                  key={index}
                  className="transform text-4xl translate-y-4 text-left py-6 text-cyan-300 hover:text-cyan-600 cursor-pointer"
                  onClick={() => {
                    document.getElementById(item.toLowerCase()).scrollIntoView({
                      behavior: "smooth",
                      block:'start'
                      
                    });
                  }}
                >
                  {item}
              </div>
              ))}
            </ul>

            <Curve />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;

function Curve() {
  const initialPath = `M100 0 L200 0 L100 ${window.innerHeight} L100 ${
    window.innerHeight
  } Q-100 ${window.innerHeight / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L100 ${window.innerHeight} L100 ${
    window.innerHeight
  } Q100 ${window.innerHeight / 2} 100 0`;

  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <svg className="svgCurve">
      <motion.path
        variants={curve}
        animate="enter"
        initial="initial"
      ></motion.path>
    </svg>
  );
}
