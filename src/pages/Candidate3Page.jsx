import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import VotingTable from "../components/VotingTable";

const Candidate3Page = ({
  votes,
  setVotes,
  language,
  handleLanguageChange,
  testBeepSound,
  t,
  getCandidateName,
  handleVote,
  votingCompleted,
  isProcessing,
  candidate,
  playBeepSound,
}) => {
  const navigate = useNavigate();
  const [localVoteDone, setLocalVoteDone] = useState(false);
  const voteDigits = votes.toString().padStart(8, "0").split("");
  const currentBgColor = candidate.bgColor;

  const handleLocalVote = () => {
    if (votingCompleted || isProcessing) return;

    // Play beep sound immediately on button click
    playBeepSound();

    // Call parent handle vote
    handleVote(candidate);

    // Mark local vote done
    setLocalVoteDone(true);

    // Navigate to next candidate after delay
    setTimeout(() => {
      navigate("/c4");
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <Header
        title={`${t.title}`}
        language={language}
        handleLanguageChange={handleLanguageChange}
        voteDigits={voteDigits}
        setVotes={setVotes}
        testBeepSound={testBeepSound}
        t={t}
        showCounter={true}
        showLanguageSelector={true}
      />

      <hr className="border-t max-w-xl mx-auto border-neutral-400 my-4" />

      <div className="max-w-2xl mx-auto px-3 md:px-8 relative">
        {/* Current Status */}
        {/* <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-yellow-400 shadow-lg">
          <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2 text-lg">
            <span className="text-xl">🗳️</span> Voting for Candidate 3
          </h3>
          <p className="text-yellow-700">
            <strong>Position:</strong> 3
          </p>
          <p className="text-yellow-700">
            <strong>Candidate:</strong> {getCandidateName(candidate)}
          </p>
          <p className="text-yellow-700">
            <strong>Code:</strong> {candidate.code}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm">Table Color:</span>
            <div
              className="w-6 h-6 rounded border"
              style={{ backgroundColor: currentBgColor }}
            ></div>
            <span className="text-sm font-mono">{currentBgColor}</span>
          </div>
        </div> */}

        {/* Voting Table */}
        <VotingTable
          candidate={candidate}
          votingCompleted={votingCompleted}
          isProcessing={isProcessing}
          handleVote={handleLocalVote} // Use local function that plays beep
          t={t}
          getCandidateName={getCandidateName}
          currentBgColor={currentBgColor}
          position={1}
          showOnlyOne={true}
        />

        {/* Navigation */}
        <div className="mt-6 flex justify-between items-center">
          {/* <button
            onClick={() => navigate("/c2")}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow transition-all"
          >
            ← Back to Candidate 2
          </button> */}

          {/* <div className="text-center">
            {localVoteDone ? (
              <div className="flex items-center gap-2 text-green-600 font-bold">
                <span>✓ Vote Recorded!</span>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                <span>Redirecting to next candidate...</span>
              </div>
            ) : (
              <button
                onClick={handleVote}
                disabled={votingCompleted || isProcessing}
                className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-bold rounded-lg shadow-lg hover:from-yellow-700 hover:to-orange-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? t.processing : `Vote for ${candidate.code}`}
              </button>
            )}
          </div> */}

          {/* <button
            onClick={() => navigate("/c4")}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition-all"
          >
            Skip to Next →
          </button> */}
        </div>

        {/* Progress Indicator */}
      </div>
    </div>
  );
};

export default Candidate3Page;
