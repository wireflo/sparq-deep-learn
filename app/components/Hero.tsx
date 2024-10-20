import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pointer-events-none z-10 whitespace-pre-wrap pb-2 bg-gradient-to-b from-[#3a3b3b] via-[#555555] to-[#6a6a6a] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent"
      >
        Learn Thing
      </motion.span>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="text-sm md:text-base text-gray-800 mt-2 text-center"
      >
        AI-generated mind map to learn about <strong>anything you want</strong>.
      </motion.p>
    </div>
  );
};

export default Hero;
