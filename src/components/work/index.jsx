import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
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
    container.addEventListener("mouseleave", handleMouseOut);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseover", handleMouseOver);
      container.removeEventListener("mouseleave", handleMouseOut);
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
    <div className="relative work pb-20 z-[99999] bg-white px-6 md:px-8 xl:px-0">
      <div className="z-10  relative pb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-main">
          Previous Work
          <span className="block w-24 h-[0.2rem] mt-2 bg-cyan-200"></span>
        </h2>

        <div className="flex flex-col divide-y-2 mt-4">{workItems}</div>
      </div>
    </div>
  );
};

export default Work;
