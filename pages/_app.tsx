import Head from 'next/head'
import { AppProps } from "next/app";
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    })

  return (
<>
    <Head>
      <title>Infinite News</title>
      <link rel="icon" href="/favicon.png" type="image/png" />
      <meta name="keywords" content="news,AI translated" />
      <meta name="description" content="AI translated hot news" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <AnimatePresence
	mode={ 'wait' }
	initial={false}
	onExitComplete={() => window.scrollTo(0, 0)}
    >
      <Component {...pageProps} />
    </AnimatePresence>
</>
  );
};

export default App;
