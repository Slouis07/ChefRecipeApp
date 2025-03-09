import { useState, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

export default function App() {
    const [darkMode, setDarkMode] = useState(() => {
        // Load the user's preferred theme from localStorage (if available)
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        // Apply the theme to the <body> element
        document.body.classList.toggle("dark-mode", darkMode);

        // Save theme preference to localStorage
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    return (
        <>
            <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(prev => !prev)} />
            <Main />
        </>
    );
}
