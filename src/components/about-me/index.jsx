import React, { useEffect, useLayoutEffect, useRef } from "react";

import Scroll from "../scroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const data = useStaticQuery(graphql`
    query {
      profilePic: file(relativePath: { eq: "profile/profilepic.png" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FIXED
            width: 260
            height: 260
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
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
                layout: FIXED
                width: 200
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

  const profileImage = getImage(data.profilePic.childImageSharp);

  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    const box = scrollRef.current.querySelector(".box");

    gsap.to(box, {
      scrollTrigger: {
        trigger: box,
        start: "top 100%",
        end: "top 40%",
        scrub: 1,
      },
      duration: 0.5,
      y: -80,
      borderRadius: 0,
      ease: "power1.out",
    });
  }, []);

  return (
    <div className="flex items-center justify-center  ">
      <div ref={scrollRef}>
        <div className="px-8 md:px-20 mx-0 md:mx-32 py-12 box transform translate-y-20 md:translate-y-40 bg-cyan-950">
          <div>
            <h1 className=" text-yellow-300 w-[90%] font-semibold text-4xl">
              About Me
              <span className="block w-24 h-[0.2rem] mt-2 bg-yellow-400"></span>
            </h1>
          </div>
          <div className="grid my-4 lg:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <div className="text-para flex gap-4 flex-col">
                <p>
                  Hello! My name is Afaq Ahmad and I enjoy creating things that
                  live on the internet.{" "}
                  <strong className="text-white">
                    I have over 1.5 years of experience in web development
                  </strong>{" "}
                  with expertise in Node.js, React, MongoDB, and other
                  technologies. My journey began with freelance projects on
                  Fiverr, where I worked with various clients to deliver quality
                  software solutions.
                </p>
                <p>
                  Fast-forward to today, I’ve had the privilege of working at an
                  agency called Fuzio Dev, as well as contributing to other
                  projects. My main focus these days is building optimized,
                  scalable, and accessible digital experiences.
                </p>
                <p>
                  I am passionate about developing inclusive products and
                  continuously enhancing my skills by working on diverse
                  projects. Recently, I have also been exploring new
                  technologies and frameworks to stay updated in this
                  ever-evolving field.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64">
                <GatsbyImage
                  image={profileImage}
                  alt="profile"
                  className="z-10 grayscale hover:grayscale-0 transition ease-in-out"
                />

                <div className="inset-0 bg-cyan-200 absolute translate-x-5 translate-y-5"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-32">
          <Scroll />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
