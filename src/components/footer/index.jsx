import React, { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { motion, useInView } from "framer-motion";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      profilePic: file(relativePath: { eq: "profile/profilepic.png" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FIXED
            width: 96
            height: 96
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
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { margin: "100px" });

  useEffect(() => {
    gsap.to(".footer-container", {
      y: 300,
      duration: 0.5,
      borderRadius: 0,
      ease: "power1.out",
    });
  }, []);

  useEffect(() => {
    if (isInView) {
      gsap.to(".footer-container", {
        y: 0,
        duration: 0.5,
        borderRadius: 0,
        ease: "power1.out",
      });
    }
  }, [isInView]);

  return (
    <footer   ref={footerRef} className="footer">
      <section
      
        className="h-[80vh] footer-container bg-cyan-900 overflow-y-hidden text-white flex flex-col items-center justify-center space-y-8"
      >
        <div className="text-center">
          <GatsbyImage
            image={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h1 className="text-3xl md:text-5xl font-bold mt-4">Let's work together</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 space-x-4">
          <div className="bg-cyan-300 text-black px-6 py-2 rounded-full">
            afaqak124@gmail.com
          </div>
          <div className="bg-cyan-300 text-black px-6 py-2 rounded-full">
            +31 6 27 84 74 30
          </div>
        </div>

        <motion.div
          className="bg-cyan-300 text-black text-center py-3 px-6 rounded-full cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Get in touch
        </motion.div>

        <div className="absolute bottom-4 left-4">
          <p className="text-sm">2022 © Edition</p>
          <p className="text-sm">08:48 AM CEST</p>
        </div>

        <div className="absolute bottom-4 right-4">
          <p className="text-sm">SOCIALS</p>
          <div className="flex space-x-4">
          
            <a href="#" className="text-sm">
              Instagram
            </a>
            <a href="#" className="text-sm">
              Twitter
            </a>
            <a href="#" className="text-sm">
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
