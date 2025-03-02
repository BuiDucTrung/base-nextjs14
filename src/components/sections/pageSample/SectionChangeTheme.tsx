'use client';
import useTheme from '@/lib/hooks/useTheme';
import { FC } from 'react';

const SectionChangeTheme: FC<any> = () => {
	const { theme, toggleTheme } = useTheme();
	return (
		<div className="SectionChangeTheme cursor-pointer w-[200px]" onClick={toggleTheme}>
			{/* {theme !== 'dark' ? <p className='text-black'>Switch dark</p> : <p className='text-white'>Switch light</p>} */}
			<p className={`duration-300`}>{`Theme ${theme}`}</p>
		</div>
	);
};

export default SectionChangeTheme;
