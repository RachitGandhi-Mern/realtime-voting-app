import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import ThemeContext from "../context/ThemeContext"; // ✅ Make sure this file exists

const PollCreator = () => {
  const { isDark } = useContext(ThemeContext);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [isCreating, setIsCreating] = useState(false);

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, ""]);
    }
  };

  const handleChangeOption = (i, value) => {
    const updated = [...options];
    updated[i] = value;
    setOptions(updated);
  };

  const handleCreate = () => {
    const cleanOptions = options.filter((opt) => opt.trim() !== "");
    if (!question.trim() || cleanOptions.length < 2) {
      alert("Minimum 2 options required");
      return;
    }

    setIsCreating(true);

    setTimeout(() => {
      const newPoll = {
        question,
        options: cleanOptions,
        votes: Array(cleanOptions.length).fill(0),
      };

      // 🧪 Simulate dispatch
      console.log("setCurrentPoll dispatched:", newPoll);
      console.log("Poll saved to localStorage");

      setQuestion("");
      setOptions(["", ""]);
      setIsCreating(false);
    }, 1000);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`mb-8 p-6 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700"
          : "bg-gradient-to-br from-white to-gray-50 border border-gray-200"
      } rounded-2xl shadow-xl w-full max-w-2xl`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3 mb-6"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          📝
        </motion.div>
        <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          Create Your Own Poll
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-4"
      >
        <input
          className={`w-full border-2 p-4 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-opacity-50 ${
            isDark
              ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
          }`}
          type="text"
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </motion.div>

      <motion.div className="space-y-3 mb-4">
        {options.map((opt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            <input
              className={`w-full border-2 p-4 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-opacity-50 ${
                isDark
                  ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
              }`}
              type="text"
              placeholder={`Option ${i + 1}...`}
              value={opt}
              onChange={(e) => handleChangeOption(i, e.target.value)}
            />
            {options.length > 2 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeOption(i)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full ${
                  isDark
                    ? "bg-red-800 text-red-300 hover:bg-red-700"
                    : "bg-red-100 text-red-600 hover:bg-red-200"
                } flex items-center justify-center text-sm`}
              >
                ×
              </motion.button>
            )}
          </motion.div>
        ))}
      </motion.div>

      <div className="flex gap-3">
        {options.length < 5 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddOption}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isDark
                ? "text-blue-400 hover:bg-gray-800 border border-gray-700 hover:border-blue-600"
                : "text-blue-600 hover:bg-blue-50 border border-blue-200 hover:border-blue-400"
            }`}
          >
            ➕ Add Option
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreate}
          disabled={isCreating}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            isCreating
              ? isDark
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              : isDark
              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-500 shadow-lg"
              : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-500 shadow-lg"
          }`}
        >
          <motion.div
            animate={{ rotate: isCreating ? 360 : 0 }}
            transition={{
              duration: 1,
              repeat: isCreating ? Infinity : 0,
              ease: "linear",
            }}
          >
            ✅
          </motion.div>
          {isCreating ? "Creating..." : "Create Poll"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PollCreator;