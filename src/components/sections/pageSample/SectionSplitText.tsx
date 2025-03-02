'use client';
import {FC, useEffect, useRef, useState} from 'react';
import SplitType from 'split-type'
import {motion} from 'framer-motion'
const SectionSplitText: FC<any> = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [chars, setChars] = useState<any[]>([]);

  useEffect(() => {
    if (textRef.current) {
      const splitText = new SplitType(textRef.current, { types: "chars" });
      setChars(splitText?.chars || []); // Lưu danh sách ký tự
    } 
  },[])

  return (
    <div className="SectionSplitText">
       <h1 ref={textRef} className="hidden">
          NextJs 14
       </h1>
        {chars.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.05, delay: index * 0.05 }}
          className="inline-block"
        >
          {char.innerText}
        </motion.span>
      ))}
    </div>
  );
};

export default SectionSplitText;