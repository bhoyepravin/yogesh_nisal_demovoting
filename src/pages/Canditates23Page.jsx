import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import VotingTable4Rows from "../components/VotingTable4Rows";

const Candidates23Page = ({
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
  candidate2,
  candidate3,
  playBeepSound,
}) => {
  const navigate = useNavigate();
  const [localVoteDone2, setLocalVoteDone2] = useState(false);
  const [localVoteDone3, setLocalVoteDone3] = useState(false);
  const voteDigits = votes.toString().padStart(8, "0").split("");

  const handleLocalVote2 = () => {
    if (votingCompleted || isProcessing || localVoteDone2) return;

    // Play beep sound immediately on button click
    playBeepSound();

    // Call parent handle vote
    handleVote(candidate2);

    // Mark local vote done
    setLocalVoteDone2(true);

    // Auto navigate after delay if both votes done
    if (localVoteDone3) {
      setTimeout(() => {
        navigate("/c4");
      }, 1000);
    }
  };

  const handleLocalVote3 = () => {
    if (votingCompleted || isProcessing || localVoteDone3) return;

    // Play beep sound immediately on button click
    playBeepSound();

    // Call parent handle vote
    handleVote(candidate3);

    // Mark local vote done
    setLocalVoteDone3(true);

    // Auto navigate after delay if both votes done
    if (localVoteDone2) {
      setTimeout(() => {
        navigate("/c4");
      }, 1000);
    }
  };
  const getThaiTableHeaders = () => {
    if (language === "en") {
      return ["SrNo", "Candidate Name", "Symbol", "Button"];
    } else if (language === "hi") {
      return ["अ. क्र.", "उम्मीदवार का नाम", "चिन्ह", "बटण"];
    } else if (language === "mr") {
      return ["क्रमांक", "उमेदवाराचे नाव", "छायाचित्र", "चिन्ह", "बटण"];
    }
    return ["SrNo", "Candidate Name", "Symbol", "Button"];
  };

  // Get Thai table headers based on language
  //   const getThaiTableHeaders = () => {
  //     if (language === "en") {
  //       return ["SrNo", "Candidate Name", "Photo", "Symbol", "Button"];
  //     } else if (language === "hi") {
  //       return ["अ. क्र.", "उम्मीदवार का नाम", "छवि", "चिन्ह", "बटन"];
  //     } else if (language === "mr") {
  //       return ["क्रमांक", "उमेदवाराचे नाव", "छायाचित्र", "चिन्ह", "बटण"];
  //     }
  //     return ["SrNo", "Candidate Name", "Photo", "Symbol", "Button"];
  //   };

  const thaiHeaders = getThaiTableHeaders();

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

      <div className="max-w-2xl mx-auto  relative">
        {/* Combined Table Container */}
        <div>
          {/* Candidate 2 Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl ">
            {/* Candidate 2 Voting Table */}
            <VotingTable4Rows
              language={language}
              candidate={candidate2}
              votingCompleted={votingCompleted}
              isProcessing={isProcessing}
              handleVote={handleLocalVote2}
              t={t}
              getCandidateName={getCandidateName}
              currentBgColor={candidate2.bgColor}
              position={2}
              showOnlyOne={true}
            />
          </div>

          {/* Candidate 3 Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl  ">
            {/* Candidate 3 Voting Table */}
            <VotingTable4Rows
              language={language}
              candidate={candidate3}
              votingCompleted={votingCompleted}
              isProcessing={isProcessing}
              handleVote={handleLocalVote3}
              t={t}
              getCandidateName={getCandidateName}
              currentBgColor={candidate3.bgColor}
              position={5}
              showOnlyOne={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Candidates23Page;
