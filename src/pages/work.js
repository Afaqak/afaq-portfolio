import { graphql, Link, useStaticQuery } from "gatsby";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Menu from "../components/menu";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import gsap, { Elastic, Linear, TimelineMax } from "gsap";
import { useGSAP } from "@gsap/react";
import Footer from "../components/footer";

const WorkItem = ({
  title,
  currentColor,
  onEnter,
  onLeave,
  imageData,
  work,
  index,
  dataLabel,
  layoutMode,
}) => {
  const itemRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const item = itemRef.current;

    gsap.set(item, { scale: 0, x: 0, y: 0 });

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
      key={index}
      data-label={dataLabel}
      ref={containerRef}
      className={` w-full ${
        layoutMode === "grid"
          ? "flex flex-col h-40"
          : "justify-between flex-col md:flex-row md:items-center flex h-40"
      } place-content-center  border-b px-6 md:px-0 border-gray-200`}
    >
      <span className="text-3xl font-medium w-full">{work.title}</span>
      <span className="text-gray-600 w-full">{work.location}</span>
      <span className="text-gray-600 w-full">{work.services}</span>
      <span className="text-gray-600 w-full  ">{work.year}</span>
      <div
        ref={itemRef}
        className={`bg-gray-50 border-2 cursor-pointer flex items-center justify-center shadow-sm rounded p-4`}
        style={{
          position: "absolute",
          width: "380px",
          height: "280px",
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        {imageData && (
          <GatsbyImage image={imageData} alt={title} className="rounded-md" />
        )}
      </div>
    </div>
  );
};

const colors = ["bg-cyan-900", "bg-cyan-900", "bg-cyan-900", "bg-yellow-400"];

const Work = () => {
  const filterButtonsRef = useRef(null);

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

  const projects = [
    {
      title: "TWICE",
      location: "Spain",
      services: "Interaction & Development",
      year: "2024",
      category: "Development",
    },
    {
      title: "The Damai",
      location: "Bali, Indonesia",
      services: "Design & Development",
      year: "2024",
      category: "Design",
    },
    {
      title: "FABRIC™",
      location: "United Kingdom",
      services: "Design & Development",
      year: "2023",
      category: "Design",
    },
  ];

  const [currentFilter, setCurrentFilter] = useState("All");
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentLabel, setCurrentLabel] = useState(null);
  const [layoutMode, setLayoutMode] = useState("row");

  useEffect(() => {
    if (filterButtonsRef.current) {
      gsap.fromTo(
        filterButtonsRef.current.children,
        { x: 0 },
        { x: 10, duration: 0.1, repeat: 2, yoyo: true }
      );
    }
  }, [currentFilter]);

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

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const handleLayoutChange = (mode) => {
    const tl = gsap.timeline();

    tl.to(".grid > div", {
      duration: 0.3,
      opacity: 0,
      y: 20,
      stagger: 0.1,
      onComplete: () => {
        setLayoutMode(mode);
      },
    }).to(".grid > div", {
      duration: 0.3,
      opacity: 1,
      y: 0,
      stagger: 0.1,
    });
  };

  const filteredProjects =
    currentFilter === "All"
      ? projects
      : projects.filter((project) => project.category === currentFilter);

  const workItems = filteredProjects.map((project, index) => {
    const imageData = getImage(data.allFile.edges[index].node.childImageSharp);
    return (
      <WorkItem
        key={data.allFile.edges[index].node.id}
        title={project.title}
        onLeave={handleMouseLeave}
        onEnter={handleMouseEnter}
        currentColor={colors[index]}
        work={project}
        imageData={imageData}
        dataId={index + 1}
        layoutMode={layoutMode}
      />
    );
  });

  const gridColumnsClass = layoutMode === "row" ? "grid-cols-1" : "grid-cols-2";

  return (
    <div>
      <div className="relative xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto">
        <Link
          to="/"
          className="px-6 md:px-8 xl:px-0 mx-auto h-10 mt-12 md:mt-14 cursor-pointer font-semibold text-lg text-cyan-900 flex flex-col"
        >
          FrivXd
        </Link>
        <Menu />
        <div className="heading h-[40vh] flex leading-snug items-center border-b  text-4xl md:text-5xl xl:text-6xl 2xl:text-8xl md:px-0 px-6 mx-auto font-semibold text-cyan-900">
          <div className="flex flex-col gap-2">
            Creating next level <br className="hidden md:block" />
            digital products
          </div>
        </div>

        <div
          className="mx-auto mt-16 flex flex-col md:flex-row px-6 md:px-8 xl:px-0 justify-between gap-4 md:items-center"
          ref={filterButtonsRef}
        >
          <div className="flex gap-4">
            <button
              className={`${
                currentFilter === "All"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-400"
              } rounded-full px-6 py-1 text-sm md:text-base md:px-10 md:py-5`}
              onClick={() => handleFilterChange("All")}
            >
              All
            </button>
            <button
              className={`${
                currentFilter === "Design"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-400"
              } rounded-full px-6 py-3 md:px-10 text-sm  md:py-5`}
              onClick={() => handleFilterChange("Design")}
            >
              Design
            </button>
            <button
              className={`${
                currentFilter === "Development"
                  ? "bg-black text-white"
                  : "bg-white text-black overflow-hidden border relative border-gray-400"
              } rounded-full px-6 py-3 text-sm :px-10 md:py-5`}
              onClick={() => handleFilterChange("Development")}
            >
              Development
            </button>
          </div>
          <div className="flex gap-4">
            <button
              className={` ${
                layoutMode === "row" ? "bg-black text-black" : "bg-white"
              } text-white rounded-full border-2 md:w-16 w-14 h-14 md:h-16 flex justify-center items-center`}
              onClick={() => handleLayoutChange("row")}
            >
              <span className="sr-only">Row Layout</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke={layoutMode === "row" ? "white" : "black"}
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
                />
              </svg>
            </button>
            <button
              className={`${
                layoutMode === "grid" && "bg-black "
              }  text-black rounded-full md:w-16 w-14 h-14 md:h-16 border-2 flex justify-center items-center`}
              onClick={() => handleLayoutChange("grid")}
            >
              <span className="sr-only">Grid Layout</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={layoutMode === "grid" ? "white" : "black"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-layout-grid"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
            </button>
          </div>
        </div>

        <div className={` mx-auto mt-20 mb-32 px-6 md:px-8 xl:px-0 grid gap-8 ${gridColumnsClass}`}>
          {workItems}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Work;
