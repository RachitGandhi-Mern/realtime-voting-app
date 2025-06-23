import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import PollCard from "./components/PollCard";
import PollCreator from "./components/PollCreator";
import ThemeContext from "./context/ThemeContext"; // ✅ Make sure this file exists

const ThemeToggle = ({ isDark, toggleTheme }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={toggleTheme}
    className={`fixed top-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 z-50 ${
      isDark
        ? "bg-gray-800 text-yellow-400 border border-gray-700"
        : "bg-white text-gray-700 border border-gray-200"
    }`}
  >
    <motion.div
      initial={false}
      animate={{ rotate: isDark ? 180 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </motion.div>
  </motion.button>
);

const App = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark((prev) => !prev);

  useEffect(() => {
    // Simulated localStorage check
    console.log("Checking localStorage for saved poll...");
    const savedPoll = null; // Example: localStorage.getItem("customPoll");
    if (savedPoll) {
      const pollData = JSON.parse(savedPoll);
      console.log("Found saved poll:", pollData);
      // dispatch(setCurrentPoll(pollData));
    } else {
      console.log("No saved poll found, using default");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`min-h-screen transition-colors duration-500 ${
          isDark
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
            : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
        }`}
      >
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

        <div className="container mx-auto px-4 py-12 flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1
              className={`text-4xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Interactive Polls
            </h1>
            <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Create and vote on polls with beautiful animations
            </p>
          </motion.div>

          <PollCreator />
          <PollCard />
        </div>
      </motion.div>
    </ThemeContext.Provider>
  );
};

export default App;