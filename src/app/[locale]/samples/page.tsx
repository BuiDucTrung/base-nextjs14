'use client';
import SectionChangeLanguage from '@/components/sections/pageSample/SectionChangeLanguage';
import SectionChangeTheme from '@/components/sections/pageSample/SectionChangeTheme';
import SectionForm from '@/components/sections/pageSample/SectionForm';
import SectionSplitText from '@/components/sections/pageSample/SectionSplitText';
import useTheme from '@/lib/hooks/useTheme';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { FC } from 'react';
// import {useTranslations} from 'next-intl';
const PageSamples: FC<any> = (props) => {
	const { theme, toggleTheme } = useTheme();
	const { scrollYProgress } = useScroll();
	const renderBgTheme = () => {
		if (theme === 'dark') {
			return ['#00f', '#f00'];
		}
		return ['#f00', '#00f'];
	};
	const bg = useTransform(scrollYProgress, [0, 1], renderBgTheme());
	const rawScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

	const scaleX = useSpring(rawScaleX, { stiffness: 150, damping: 100 });

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5 }} // Set duration here
				className={`pageSamples w-full h-[200dvh] grid grid-rows-[20px_1fr_20px] items-start justify-items-center !pt-0  pb-20 gap-16 font-[family-name:var(--font-geist-sans)] duration-300 ${
					theme !== 'dark' ? 'text-black' : 'text-white'
				} `}
				style={{ background: bg }}
			>
				<motion.div
					className="sticky top-0 left-0 origin-left w-full bg-pink-500 h-[10px]"
					style={{ scaleX: scaleX }}
				></motion.div>
				<main className="w-full flex flex-col g items-center gap-[1rem]">
					<SectionChangeLanguage />

					<SectionChangeTheme />
					<SectionSplitText />

					<SectionForm />
				</main>
			</motion.div>
		</AnimatePresence>
)};

export default PageSamples;
