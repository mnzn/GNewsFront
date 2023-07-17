import { useState, useEffect } from 'react'
import Link from './NoScrollLink'
import DarkModeToggle from './DarkModeToggle'
import { useRouter } from "next/router";

const Header = (): JSX.Element => {

    return (
    <header
        className="
        w-full sm:fixed bg-white flex flex-row 
        h-14 z-50 border-b border-gray-200 shadow-sm
        px-8 sm:px-0
        dark:bg-gray-800 dark:border-b dark:border-gray-600
        text-black dark:text-white
    "
    >
        <div className="container mx-auto flex flex-row justify-between items-center">
        <Link href="/">
		<span className="">Infinite News</span>
        </Link>
        <div className="flex flex-row items-center">
            {/* <Navigation /> */}
            <DarkModeToggle />
        </div>
        </div>
    </header>
    )
}

export default Header;
