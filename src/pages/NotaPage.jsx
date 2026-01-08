import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import VotingTable from "../components/VotingTable";

const NotaPage = ({
  votes,
  setVotes,
  language,
  handleLanguageChange,
  testBeepSound,
  t,
  getCandidateName,
  handleVote: parentHandleVote,
  votingCompleted,
  isProcessing,
  notaCandidate,
  playSuccessSound,
  playEndVotingSound,
}) => {
  const navigate = useNavigate();
  const [localVoteDone, setLocalVoteDone] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const voteDigits = votes.toString().padStart(8, "0").split("");
  const currentBgColor = notaCandidate.bgColor;

  const handleVote = () => {
    if (votingCompleted || isProcessing) return;

    // Play beep sound
    testBeepSound();

    // Call parent handle vote
    parentHandleVote(notaCandidate);

    // Mark local vote done
    setLocalVoteDone(true);

    // Show success message and play sounds
    setTimeout(() => {
      setShowSuccess(true);
      playSuccessSound();

      setTimeout(() => {
        playEndVotingSound();
      }, 1000);
    }, 500);
  };

  const resetVoting = () => {
    // Reset and go back to home
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-slate-900">
      <Header
        title={`${t.title} - NOTA`}
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
        <div className="mt-4 bg-white rounded-xl p-4 border-2 border-black shadow-lg">
          <h3 className="font-bold text-black mb-2 flex items-center gap-2 text-lg">
            <span className="text-xl">⚠️</span> NOTA - None of the Above
          </h3>
          <p className="text-gray-700">
            <strong>Position:</strong> 16
          </p>
          <p className="text-gray-700">
            <strong>Description:</strong> Select this if you don't want to vote
            for any candidate
          </p>
          <p className="text-gray-700">
            <strong>Final Step:</strong> This is the last voting option
          </p>
        </div>

        {/* Voting Table */}
        <VotingTable
          candidate={notaCandidate}
          votingCompleted={votingCompleted}
          isProcessing={isProcessing}
          handleVote={handleVote}
          t={t}
          getCandidateName={getCandidateName}
          currentBgColor={currentBgColor}
          position={16}
          showOnlyOne={true}
          isNota={true}
        />

        {/* Success Message */}
        {showSuccess && (
          <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-xl p-6 border-2 border-green-400 animate-fade-in">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-green-500 text-white rounded-full text-3xl">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-green-800">
                {t.votingCompleted}
              </h3>
              <p className="text-gray-700 mt-2">{t.thankYou}</p>
              <p className="text-green-600 font-semibold mt-3">
                🎉 {t.completedMessage}
              </p>
              <p className="text-gray-600 mt-4">
                {t.totalVotes}{" "}
                <strong className="text-2xl text-green-700">{votes}</strong>
              </p>

              <div className="mt-6">
                <button
                  onClick={resetVoting}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105"
                >
                  {t.resetButton}
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Click to start voting process again
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation and Voting Button */}
        {!showSuccess && (
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => navigate("/c4")}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow transition-all"
            >
              ← Back to Candidate 4
            </button>

            <div className="text-center">
              {localVoteDone ? (
                <div className="flex items-center gap-2 text-green-600 font-bold">
                  <span>✓ Vote Recorded!</span>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                  <span>Processing final vote...</span>
                </div>
              ) : (
                <button
                  onClick={handleVote}
                  disabled={votingCompleted || isProcessing}
                  className="px-6 py-3 bg-gradient-to-r from-black to-gray-800 text-white font-bold rounded-lg shadow-lg hover:from-gray-800 hover:to-black transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? t.processing : `Vote for ${t.nota}`}
                </button>
              )}
            </div>

            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition-all"
            >
              Back to Home
            </button>
          </div>
        )}

        {/* Progress Indicator */}
        {!showSuccess && (
          <div className="mt-4 bg-white rounded-lg p-3 border">
            <div className="flex justify-between text-sm mb-1">
              <span>Voting Progress</span>
              <span>5 of 5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-black h-2.5 rounded-full transition-all duration-500"
                style={{ width: "100%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Final Step - Complete the voting process
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotaPage;
