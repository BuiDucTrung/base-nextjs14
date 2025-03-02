'use client';

import { useStorage } from '@/components/context/StorageProvider';
import { startTransition, useEffect, useState, useTransition } from 'react';
import { useLocalStorage } from 'usehooks-ts';

function useTheme() {
	const [themeLocalStorage, setThemeLocalStorage] = useLocalStorage('theme-toggle', '');
	const [theme, setTheme] = useState(themeLocalStorage);
	useEffect(() => {
		document.body?.classList?.remove?.('dark', 'light');
		if (themeLocalStorage) document.body?.classList?.add?.(themeLocalStorage);

		setTheme(themeLocalStorage);
	}, [themeLocalStorage]);

	const toggleTheme = () => {
		setThemeLocalStorage((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	return { theme, toggleTheme };
}

export default useTheme;
