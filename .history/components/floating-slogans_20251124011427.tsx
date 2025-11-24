"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const slogans = [
  "দেশ আর এভাবে চলতে পারে না, পরিবর্তনের জন্যে হ্যাঁ বলুন",
  "গণভোটে হ্যাঁ যারা, পরিবর্তনের পক্ষে তারা",
  "তারুণ্যের প্রথম ভোট গণভোটের পক্ষে হোক",
  "Change is necessary, not a choice. Say Yes to the July Charter",
  "পরিবর্তন অপরিহার্য, কোনও মর্জি নয়। জুলাই সনদকে হ্যাঁ বলুন",
  "ভবিষ্যৎকে সুরক্ষিত করতে বলুন—হ্যাঁ",
  "গণতন্ত্রকে শক্তিশালী করতে দিন—হ্যাঁ ভোট দিন",
  "ন্যায় ও নীতির পথে এগোতে বলুন—হ্যাঁ",
  "স্বচ্ছ রাজনীতির জন্য সাহসী হোন—হ্যাঁ বলুন",
  "দায়বদ্ধতার নতুন যুগ শুরু করতে—হ্যাঁ ভোট দিন",
  "অন্যায়ের বিরুদ্ধে দাঁড়াতে—হ্যাঁ বলুন",
  "সঠিক সিদ্ধান্তের পথে হাঁটতে—হ্যাঁ",
  "আগামী প্রজন্মের ভবিষ্যৎ রক্ষা করতে—হ্যাঁ ভোট দিন",
  "দেশকে এগিয়ে নিতে—হ্যাঁ বলুন",
  "বিভেদের রাজনীতি ছাড়তে—হ্যাঁ বলুন",
  "উন্নতির দরজা খুলতে—হ্যাঁ ভোট দিন",
  "শান্তি ও স্থিতিশীলতার জন্য—হ্যাঁ",
  "সত্যের পক্ষে দাঁড়াতে—হ্যাঁ বলুন",
  "নতুন সম্ভাবনার পথ খুলতে—হ্যাঁ",
  "দায়িত্বশীল সিদ্ধান্তের জন্য বলুন—হ্যাঁ",
  "সচেতন নাগরিক হিসেবে বলুন—হ্যাঁ",
  "Vote YES for July Charter",
  "Build a New Bangladesh",
  "জুলাই সনদে হ্যাঁ",
  "নতুন বাংলাদেশ গড়ুন",
  "জুলাই বিপ্লব জিন্দাবাদ",
  "July Revolution Forever",
  "শহীদদের রক্ত বৃথা যেতে দেব না",
  "We won't let martyrs' blood go in vain",
  "হ্যাঁ ভোট দিন, দেশ বাঁচান",
  "Vote YES, Save the Nation",
  "নতুন সংবিধানে হ্যাঁ",
  "YES to New Constitution",
  "গণতন্ত্র রক্ষায় হ্যাঁ",
  "YES for Democracy",
  "জনগণের ভোট জনগণের অধিকার",
  "People's Vote, People's Right",
  "স্বাধীন বিচার বিভাগ চাই",
  "Independent Judiciary Needed",
  "দুর্নীতিমুক্ত বাংলাদেশ গড়ি",
  "Build Corruption-Free Bangladesh",
  "সমানাধিকার সকলের জন্য",
  "Equal Rights for All",
  "জুলাইয়ের চেতনায় এগিয়ে যাই",
  "Move Forward with July Spirit",
  "তরুণদের স্বপ্ন পূরণ হোক",
  "Fulfill Youth's Dreams",
  "পরিবর্তন এখনই",
  "Change Now",
  "হ্যাঁ বলুন নতুন আশায়",
  "Say YES to New Hope",
  "ভোটের অধিকার রক্ষা করুন",
  "Protect Voting Rights",
  "জুলাই সনদ জনগণের সনদ",
  "July Charter is People's Charter",
  "স্বচ্ছতায় বিশ্বাসী",
  "Believe in Transparency",
  "জবাবদিহিতা নিশ্চিত করুন",
  "Ensure Accountability",
  "মানবাধিকার সুরক্ষিত হোক",
  "Protect Human Rights",
  "আইনের শাসন প্রতিষ্ঠা করুন",
  "Establish Rule of Law",
  "শিক্ষার অধিকার নিশ্চিত করুন",
  "Ensure Right to Education",
  "স্বাস্থ্যসেবা সবার জন্য",
  "Healthcare for Everyone",
  "কর্মসংস্থান সৃষ্টি করুন",
  "Create Employment",
  "নারী ক্ষমতায়ন জরুরি",
  "Women Empowerment Essential",
  "শিশুদের ভবিষ্যৎ সুরক্ষিত করুন",
  "Secure Children's Future",
  "পরিবেশ রক্ষায় সচেতন হন",
  "Be Conscious about Environment",
  "সবার জন্য ন্যায়বিচার",
  "Justice for All",
  "একতাই শক্তি",
  "Unity is Strength",
  "হ্যাঁ মানে হ্যাঁ",
  "YES means YES",
];

interface FloatingSloganProps {
  count?: number;
  className?: string;
}

interface SloganData {
  text: string;
  id: string;
  randomX: number;
  randomY: number;
  randomDuration: number;
  randomDelay: number;
  randomRotate: number;
  randomOpacity: number;
  direction: number;
  moveDistance: number;
}

export function FloatingSlogans({
  count = 30,
  className = "",
}: FloatingSloganProps) {
  const [displaySlogans, setDisplaySlogans] = useState<SloganData[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Generate random positions and slogans
    const randomSlogans = Array.from({ length: count }, (_, i) => {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      // Random direction: left or right
      const direction = Math.random() > 0.5 ? 1 : -1;
      const moveDistance = 10 + Math.random() * 30;

      return {
        text: slogans[Math.floor(Math.random() * slogans.length)],
        id: `slogan-${i}`,
        randomX: startX,
        randomY: startY,
        randomDuration: 25 + Math.random() * 35,
        randomDelay: Math.random() * 10,
        randomRotate: (Math.random() - 0.5) * 8,
        randomOpacity: 0.1 + Math.random() * 0.15,
        direction,
        moveDistance,
      };
    });
    setDisplaySlogans(randomSlogans);
  }, [count]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      <AnimatePresence>
        {displaySlogans.map((slogan) => {
          const endX = slogan.randomX + slogan.direction * slogan.moveDistance;
          const endY = (slogan.randomY + 20) % 100;

          return (
            <motion.div
              key={slogan.id}
              initial={{
                x: `${slogan.randomX}vw`,
                y: `${slogan.randomY}vh`,
                opacity: 0,
                rotate: slogan.randomRotate,
              }}
              animate={{
                x: [`${slogan.randomX}vw`, `${endX}vw`],
                y: [`${slogan.randomY}vh`, `${endY}vh`],
                opacity: [0, slogan.randomOpacity, slogan.randomOpacity, 0],
                rotate: [
                  slogan.randomRotate,
                  slogan.randomRotate + slogan.direction * 3,
                ],
              }}
              transition={{
                duration: slogan.randomDuration,
                delay: slogan.randomDelay,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="absolute whitespace-nowrap text-sm md:text-base font-semibold text-gray-700 dark:text-gray-300 select-none"
              style={{
                textShadow:
                  "0 1px 3px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.5)",
              }}
            >
              {slogan.text}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
