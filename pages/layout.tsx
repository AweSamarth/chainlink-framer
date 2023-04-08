import {
  animate,
  motion,
  MotionValue,
  useMotionValue,
  useScroll,
  useTime,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

export default function Layout() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, 100000);

    return controls.stop;
  }, []);

  const time = useTime();

  const rotate = useTransform(time, [0, 1000], [0, 360], { clamp: false });

  const {scrollYProgress} = useScroll()


  function Image({ id }: { id: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);
  
    return (
      <section>
        <div ref={ref}>
          <img src={`/${id}.jpg`} alt="A London skyscraper" />
        </div>
        <motion.h2 style={{ y }}>{`#00${id}`}</motion.h2>
      </section>
    );
  }
  







  return (
    <main className=" border-red-500 min-h-[200vh] items-center justify-between">

      <motion.div className="fixed top-0 left-0 right-0 h-5 bg-red-500 z-20 origin-left" style={{scaleX:scrollYProgress}} />

      <motion.div
        layout
        className="bg-black w-20 h-20 m-20"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "75%", "50%", "50%", "0%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
      <motion.div>{rounded}</motion.div>

      <motion.div
        className="w-20 h-20 bg-black"
        animate={{ x: [100, 200, 300, 100] }}
        initial={true}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
      />

      <div className="">
        <motion.div className="bg-black rounded-lg w-20 h-20" style={{ rotate }} />
      </div>
    </main>
  );
}
function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
  }
