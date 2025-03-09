import chefLogo from "../images/chef.png";

export default function Header({ darkMode, toggleDarkMode }) {
    return (
        <header>
            <img src={chefLogo} alt="Culinary Genie Logo"/>
            <h1>Culinary Genie</h1>
            <button onClick={toggleDarkMode} className="theme-toggle">
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
        </header>
    );
}
