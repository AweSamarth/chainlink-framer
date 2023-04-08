import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

const Parallax = () => {
  const { scrollYProgress } = useScroll();
//   console.log(useScroll())
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
  }
  )

  return (
    <main className="h-[200vh] bg-gradient-to-b from-green-300 via-blue-500 to-purple-600">

    <div className="wrapper w-[150px] h-[150px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  ">

      <motion.div
        className="container w-[100%] h-[100%] overflow-hidden bg-black bg-opacity-10  rounded-lg"
        style={{
          scale
        }}
      >
        <motion.div
          className="item h-[100%] w-full bg-blue-700 opacity-100 origin-bottom"
          style={{
            scaleY: scrollYProgress
          }}
        />
      </motion.div>
    </div>
    </main>
  )
};

export default Parallax;
