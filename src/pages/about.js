import React from "react";
import Menu from "../components/menu";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutMe from "../images/about-me/about-me.jpeg";

import DemoImage from "../images/about-me/messi.avif";
import { useGSAP } from "@gsap/react";
import { Link } from "gatsby";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    gsap.utils.toArray(".img-container").forEach(function (container) {
      let image = container.querySelector(".image-placeholder");

      gsap.to(image, {
        y: () => image.offsetHeight - container.offsetHeight,
        ease: "",
        scrollTrigger: {
          trigger: container,
          scrub: 1.2,
          pin: false,
          markers: false,
          invalidateOnRefresh: true,
        },
      });
    });

    gsap.from(".heading", {
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: ".heading",
        start: "top 80%",
        end: "top 60%",
        scrub: 1,
        markers: false,
      },
    });

    gsap.from(".about-heading", {
      y: -200,
      duration: 1,
      scrollTrigger: {
        trigger: ".about-heading",
        start: "top bottom",
        end: "top top",
        scrub: 1,
        markers: false,
      },
    });

    gsap.from(".card", {
      y: 100,
      ease: "power2.out",
      duration: 1.5,
      scrollTrigger: {
        trigger: ".cards-container",
        start: "top bottom",
        end: "top 50%",
        scrub: 1,
        markers: false,
      },
    });

    gsap.to(".football-image-placeholder", {
      x: "0%",
      scale: 1.2,
      ease: "power1.out",
      duration: 2,
      scrollTrigger: {
        trigger: ".football-image-placeholder",
        start: "top 95%",
        end: "top 100%",
        scrub: 1,
      },
    });
  });

  return (
    <div className="relative pb-20">
      <Link
        to="/"
        className="w-[80%] mx-auto h-10 mt-12 md:mt-14 cursor-pointer font-semibold text-lg text-cyan-900 flex flex-col"
      >
        FrivXd
      </Link>
      <Menu />
      <div className="heading h-[60vh] flex items-center border-b justify-center text-8xl w-[80%] mx-auto font-semibold text-cyan-900">
        <div className="flex flex-col gap-2">- I am here to build things</div>
      </div>
      <div className="flex gap-4 w-[80%] mx-auto py-20 justify-between items-center">
        <div className="w-[30%] about-heading">
          <p className="text-gray-700 leading-relaxed">
            I am a dedicated developer with a passion for creating scalable and
            user-friendly applications. My journey in the digital world has
            equipped me with a unique blend of development skills that I
            leverage to bring ideas to life.
          </p>
        </div>
        <div className="img-container relative overflow-hidden h-[620px] w-[50%]">
          <img
            src={AboutMe}
            alt="profile"
            className="absolute h-[130%] p-0 bottom-0 left-0 w-full image-placeholder"
          />
        </div>
      </div>
      <div className="cards-container w-[80%] mx-auto ">
        <h2 className="text-4xl font-semibold pb-6 pt-4 border-b text-cyan-900">
          I Specialize In...
        </h2>
        <div className="py-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="card flex flex-col bg-cyan-100 p-6 rounded-md shadow-lg">
            <h3 className="text-xl font-bold text-cyan-700">01</h3>
            <h2 className="text-3xl font-semibold py-2 text-cyan-900">
              Web Development
            </h2>
            <p className="text-gray-600">
              I specialize in building scalable websites from scratch, with a
              focus on clean, maintainable code and smooth user interactions.
            </p>
          </div>
          <div className="card flex flex-col bg-cyan-100 p-6 rounded-md shadow-lg">
            <h3 className="text-xl font-bold text-cyan-700">02</h3>
            <h2 className="text-3xl font-semibold py-2 text-cyan-900">
              Problem Solving
            </h2>
            <p className="text-gray-600">
              I enjoy tackling complex challenges and coming up with efficient
              solutions. My problem-solving skills are at the core of my
              development process.
            </p>
          </div>
          <div className="card flex flex-col bg-cyan-100 p-6 rounded-md shadow-lg">
            <h3 className="text-xl font-bold text-cyan-700">03</h3>
            <h2 className="text-3xl font-semibold py-2 text-cyan-900">
              Continuous Learning
            </h2>
            <p className="text-gray-600">
              I am always learning new technologies and techniques to improve my
              development process and deliver better results.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10 w-[80%] mx-auto py-20">
        <div className="flex justify-between items-center gap-10">
          <div className="relative overflow-hidden h-[500px] w-[50%] football-img-container">
            <img
              src={DemoImage}
              alt="Football"
              className="h-full w-full -translate-x-full scale-75  object-cover football-image-placeholder"
            />
          </div>
          <div className="w-[40%]">
            <h2 className="text-4xl font-semibold mb-4 text-cyan-900">
              Football Lover
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Football isn't just a sport for me; it's a passion. The strategy,
              teamwork, and perseverance required in football resonate deeply
              with how I approach coding projects. My favorite player, Messi,
              inspires me with his relentless pursuit of excellence, reminding
              me to always push the boundaries in my work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
