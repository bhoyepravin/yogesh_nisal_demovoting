import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import VotingTable from "../components/VotingTable";

const Candidate4Page = ({
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
  playCandidate4Sound,
}) => {
  const navigate = useNavigate();
  const [localVoteDone, setLocalVoteDone] = useState(false);
  const voteDigits = votes.toString().padStart(8, "0").split("");
  const currentBgColor = candidate.bgColor;
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  console.log(candidate, playCandidate4Sound);
  const handleLocalVote = () => {
    if (votingCompleted || isProcessing) return;

    // Play beep sound immediately on button click
    // Play special sound for candidate 4
    if (playCandidate4Sound) {
      playCandidate4Sound(); // Use the special audio for candidate 4
    } else {
      // Fallback to regular beep if special audio not available
      playBeepSound();
    }
    console.log(candidate);
    // Call parent handle vote
    handleVote(candidate);

    // Mark local vote done
    setLocalVoteDone(true);
    // Show popup message in current language
    let message = "";
    if (language === "en") {
      message = `${t.voteRegistered} ${t.redirecting}`;
    } else if (language === "hi") {
      message = `${t.voteJamaHindi} ${t.redirectingHindi}`;
    } else if (language === "mr") {
      message = `${t.voteJamaMarathi} ${t.redirectingMarathi}`;
    }

    setPopupMessage(message);
    setShowPopup(true);
    // Navigate to NOTA after delay
    setTimeout(() => {
      setShowPopup(false);

      navigate("/");
    }, 4000);
  };

  return (
    <div className="min-h-screen">
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 shadow-2xl transform transition-all duration-300 scale-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-3">
                {language === "en" && "Vote Registered!"}
                {language === "hi" && "आपले मत नोंदवले गेले आहे!"}
                {language === "mr" && "आपले मत नोंदवले गेले आहे!"}
              </h3>
              {/* <p className="text-lg mb-4">{popupMessage}</p> */}
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                <div
                  className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
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

      <div className="max-w-2xl mx-auto  relative">
        {/* Current Status */}
        {/* <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-red-400 shadow-lg">
          <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2 text-lg">
            <span className="text-xl">🗳️</span> Voting for Candidate 4
          </h3>
          <p className="text-red-700">
            <strong>Position:</strong> 4
          </p>
          <p className="text-red-700">
            <strong>Candidate:</strong> {getCandidateName(candidate)}
          </p>
          <p className="text-red-700">
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
          position={3}
          showOnlyOne={true}
        />

        {/* Navigation */}
        <div className="mt-6 flex justify-between items-center">
          {/* <button
            onClick={() => navigate("/c3")}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow transition-all"
          >
            ← Back to Candidate 3
          </button> */}

          {/* <div className="text-center">
            {localVoteDone ? (
              <div className="flex items-center gap-2 text-green-600 font-bold">
                <span>✓ Vote Recorded!</span>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                <span>Redirecting to NOTA...</span>
              </div>
            ) : (
              <button
                onClick={handleVote}
                disabled={votingCompleted || isProcessing}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-red-700 hover:to-pink-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? t.processing : `Vote for ${candidate.code}`}
              </button>
            )}
          </div> */}

          {/* <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition-all"
          >
            Back to Home
          </button> */}
        </div>

        {/* Progress Indicator */}
      </div>
    </div>
  );
};

export default Candidate4Page;
