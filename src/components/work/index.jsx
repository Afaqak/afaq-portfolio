import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import MenuMagnet from "../magnet";
import { motion } from "framer-motion";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";

const WorkItem = ({
  title,
  description,
  currentColor,
  onEnter,
  onLeave,
  imageData,
  index,
  dataLabel,
}) => {
  const itemRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const item = itemRef.current;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(item, {
        duration: 0.5,
        x: x - item.offsetWidth / 2,
        y: y - item.offsetHeight / 2,

        ease: "power1.out",
      });
    };

    const handleMouseOver = () => {
      gsap.to(item, {
        duration: 0.5,
        scale: 1,

        ease: "power1.out",
      });
      onEnter(dataLabel);
    };

    const handleMouseOut = () => {
      gsap.to(item, {
        duration: 0.5,
        scale: 0,
        ease: "power1.out",
      });
      onLeave(dataLabel);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseover", handleMouseOver);
    container.addEventListener("mouseout", handleMouseOut);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseover", handleMouseOver);
      container.removeEventListener("mouseout", handleMouseOut);
    };
  }, [dataLabel, onEnter, onLeave]);

  return (
    <div
      data-label={dataLabel}
      ref={containerRef}
      className="flex justify-between items-center relative cursor-pointer h-52 px-4"
    >
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl md:text-4xl font-medium">{title}</h1>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>

      <div
        ref={itemRef}
        className={`${currentColor} flex items-center justify-center shadow-sm rounded p-4`}
        style={{
          position: "absolute",
          zIndex: 20,
          transform: "scale(0) translate(-50%, -50%)",
          width: "400px",
          height: "280px",
          pointerEvents: "none",
        }}
      >
        {imageData && (
          <GatsbyImage image={imageData} alt={title} className=" rounded-md" />
        )}
      </div>
    </div>
  );
};

const colors = ["bg-cyan-900", "bg-cyan-900", "bg-cyan-900", "bg-yellow-400"];

const Work = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          extension: { regex: "/(jpg|jpeg|png|webp)/" }
          relativeDirectory: { eq: "cursor" }
        }
      ) {
        edges {
          node {
            id
            relativePath
            childImageSharp {
              gatsbyImageData(
                width: 420
                height: 200
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  `);

  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentLabel, setCurrentLabel] = useState(null);
  console.log(data, "dta");
  const handleMouseEnter = (label) => {
    setCurrentLabel(label);
    rotateColors();
  };

  const handleMouseLeave = (label) => {
    if (label === currentLabel) {
      setCurrentLabel(null);
    }
  };

  const rotateColors = () => {
    const currentIndex = colors.indexOf(currentColor);
    const nextIndex = (currentIndex + 1) % colors.length;
    setCurrentColor(colors[nextIndex]);
  };

  const work = [
    { title: "Bkmanning", description: "development" },
    {
      title: "Sipath",
      description: "development",
    },
    {
      title: "Taulab",
      description: "development",
    },
  ];

  const workItems = data.allFile?.edges?.map(({ node }, index) => {
    const imageData = getImage(node.childImageSharp);
    console.log(imageData);
    return (
      <WorkItem
        key={node.id}
        title={work[index].title}
        onLeave={handleMouseLeave}
        onEnter={handleMouseEnter}
        currentColor={colors[index]}
        description={work[index].description}
        imageData={imageData}
        dataId={index + 1}
      />
    );
  });

  return (
    <div className="relative work min-h-screen z-[99999] bg-white">
      <div className="px-8 z-10  relative pb-10 mx-0 md:mx-32">
        <h2 className="text-3xl md:text-4xl font-bold text-main">
          Previous Work
          <span className="block w-24 h-[0.2rem] mt-2 bg-cyan-200"></span>
        </h2>

        <div className="flex flex-col divide-y-2 mt-4">{workItems}</div>
        {/* <Curve /> */}
        {/* <div className="w-full flex justify-center my-8">
          <button className="rounded-md px-6 py-2 hover:bg-gray-100 border">View More Work</button>
        </div> */}
      </div>
    </div>
  );
};

export default Work;

function Curve() {
  const floatingAnimation = {
    y: [0, 20, -20, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    },
  };

  const width = window.innerWidth;

  return (
    <svg className="absolute bottom-0 left-0 right-0 w-full h-16">
      <motion.path
        d={`M0,16 Q${width / 2},32 ${width},16`}
        stroke="cyan"
        strokeWidth="4"
        fill="transparent"
        animate={floatingAnimation}
      />
    </svg>
  );
}
