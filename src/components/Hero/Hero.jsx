import BgVideo from "../../assets/video/bg_video.mp4";
import { FaAnglesDown } from "react-icons/fa6";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const Hero = () => {
  const { scrollY } = useScroll();
  
  const videoScale = useSpring(
    useTransform(scrollY, [0, 100, 300, 500], [1, 0.85, 0.6, 0.5]),
    { stiffness: 100, damping: 15 }
  );

  const videoTop = useSpring(
    useTransform(scrollY, [0, 100, 300, 500], [0, -20, -50, -100]), // Skroll bo‘yicha yuqoriga ko‘tariladi
    { stiffness: 100, damping: 15 }
  );

  // Kontent Scale 3 bosqichda: [1, 0.95, 0.90, 0.85] (kichikroq o‘zgarish)
  const contentScale = useSpring(
    useTransform(scrollY, [0, 100, 300, 500], [1, 0.95, 0.9, 0.85]),
    { stiffness: 100, damping: 15 }
  );
  const borderRadius = useSpring(
    useTransform(scrollY, [0, 100, 300, 500], [0, 20, 30, 50]),
    { stiffness: 100, damping: 15 }
  );

  const textSize = useTransform(scrollY, [0, 100, 300, 500], ["3.5rem", "3rem", "2.5rem", "2rem"]);
  


  return (
    <motion.section
      id="hero"
      className="relative h-screen w-full overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    //   variants={sectionVariants}
    >
      {/* Background Video */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{
          scale: videoScale, // Scale dinamik o‘zgaradi
          borderRadius: borderRadius,
          opacity: 1,
          top: videoTop
        }}
      >
        <source src={BgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>

      {/* Content */}
      <div
        className="relative z-20 h-full flex items-center justify-center text-center px-4"
        style={{ scale: contentScale }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.h1
            className="font-bold text-white mb-6 animate-fade-in-down"
            style={{ fontSize: textSize }} // Matn hajmini silliq o‘zgartirish
          >
            Welcome to Davan Group
          </motion.h1>
        </div>
        <div className="absolute bottom-16 animate-bounce">
          <FaAnglesDown className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
