"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { FloatingSlogans } from "./floating-slogans";
import { Button } from "./ui/button";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 bg-gradient-to-br from-green-600 via-green-700 to-red-600 relative overflow-hidden"
    >
      <FloatingSlogans count={20} className="opacity-10" />
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center text-white space-y-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            আজই যোগ দিন আমাদের আন্দোলনে
          </h2>
          <p className="text-xl md:text-2xl opacity-90">
            লক্ষ লক্ষ মানুষের সাথে একসাথে গড়ুন নতুন বাংলাদেশ
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Link href="/volunteer">
              <Button
                size="lg"
                className="bg-white text-green-700 hover:bg-gray-100 font-bold text-lg px-10 py-7 rounded-full shadow-2xl hover:shadow-white/50 transition-all duration-300 group"
              >
                স্বেচ্ছাসেবক হন
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/20 font-semibold text-lg px-10 py-7 rounded-full backdrop-blur-md"
              >
                আরও জানুন
              </Button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-12 border-t border-white/20"
          >
            <p className="text-lg opacity-80 italic">
              &ldquo;গণভোটে হ্যাঁ বলুন, দেশের ভবিষ্যৎ সুরক্ষিত করুন&rdquo;
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
