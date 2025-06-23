
import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import ThemeContext from "../context/ThemeContext";

// Mock Redux setup for demo
const mockSetCurrentPoll = (poll) => ({ type: 'setCurrentPoll', payload: poll });
const mockUpdateVote = (votes) => ({ type: 'updateVote', payload: votes });

// Theme Context
const ThemeContext = React.createContext();

// Mock Redux store state
const initialPoll = {
  question: "What's your favorite programming language?",
  options: ["JavaScript", "Python", "Java", "C++"],
  votes: [45, 32, 18, 12]
};

// PollCard Component
const PollCard = () => {
  const { isDark } = useContext(ThemeContext);
  const [poll, setPoll] = useState(initialPoll);
  const [votedIndex, setVotedIndex] = useState(null);
  
  if (!poll) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`max-w-2xl w-full ${isDark ? 'bg-gray-900' : 'bg-white'} p-8 rounded-2xl shadow-2xl`}
    >
      <div className="animate-pulse">
        <div className={`h-6 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-4`}></div>
        <div className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-2`}></div>
      </div>
    </motion.div>
  );

  const totalVotes = poll.votes.reduce((a, b) => a + b, 0);

  const handleVote = (index) => {
    setVotedIndex(index);
    const newVotes = [...poll.votes];
    newVotes[index] += 1;
    
    setPoll(prev => ({ ...prev, votes: newVotes }));
    
    // Since we can't use localStorage in artifacts, we'll simulate it
    console.log("Votes saved:", newVotes);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`max-w-2xl w-full ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700' 
          : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
      } p-8 rounded-2xl shadow-2xl backdrop-blur-sm`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-3 mb-6"
      >
        <BarChart3 className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {poll.question}
        </h2>
      </motion.div>

      <div className="space-y-4">
        {poll.options.map((option, index) => {
          const percent = totalVotes > 0 ? Math.round((poll.votes[index] / totalVotes) * 100) : 0;
          const isVoted = votedIndex === index;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`p-4 rounded-xl transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' 
                  : 'bg-gray-50 border border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {option}
                </span>
                <motion.span
                  key={percent}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-sm font-bold px-2 py-1 rounded-full ${
                    isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {percent}%
                </motion.span>
              </div>

              <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-3 overflow-hidden mb-3`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleVote(index)}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                  isVoted
                    ? isDark
                      ? 'bg-green-700 text-green-100 border border-green-600'
                      : 'bg-green-600 text-white border border-green-500'
                    : isDark
                    ? 'bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {isVoted ? 'Voted!' : 'Vote'}
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`mt-6 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
      >
        Total votes: {totalVotes}
      </motion.div>
    </motion.div>
  );
};

export default PollCard