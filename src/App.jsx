import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Candidate1Page from "./pages/Candidate1Page";
import Candidate2Page from "./pages/Candidate2Page";
import Candidate3Page from "./pages/Candidate3Page";
import Candidate4Page from "./pages/Candidate4Page";
import Candidates23Page from "./pages/Canditates23Page";
import NotaPage from "./pages/NotaPage";
import {
  ajikysane,
  audiobeep,
  audiolast,
  dipalikulkarni,
  kamalsign,
  ratna,
  rohitgade,
  shyambadode,
  supriyakhode,
  vandana,
  yogesh,
} from "./assets";
import Footer from "./pages/Footer";

// API endpoints
const API_BASE_URL = "https://voteback.demovoting.com/api/prabhag-18";
const INCREMENT_VOTE_URL = `${API_BASE_URL}/votes/increment`;
const GET_VOTES_URL = `${API_BASE_URL}/votes`;

// Language translations
const translations = {
  en: {
    title: "Municipal Corporation Dummy Voting Machine",
    demoInstruction:
      "For demo voting press the blue button in front candidate name and symbol",
    votingMachine: "Municipal Corporation Dummy Voting Machine",
    candidateList:
      "A - Rohit Anil Gade, B - Vandana Suresh Borade, C - Ratna Ashok Satbhai, D - Yogesh Chindhuji Nisal",
    voteThem: "Vote them in by a huge margin by clicking the button!",
    pollingDate: "Polling Date",
    pollingDateValue: "- Thursday, 2026-01-15 From 7:30 AM to 5:30 PM",
    division: "Division No.",
    divisionValue: "- 18",
    tableHeaders: ["SrNo", "Candidate Name", "Photo", "Symbol", "Button"],
    pressButton: "Press Button",
    share: "Share",
    currentStep: "Currently voting for candidate",
    finalStep: "Final step:",
    nota: "NOTA",
    votingCompleted: "Voting Completed Successfully!",
    thankYou:
      "Thank you for participating in the Municipal Corporation Dummy Election",
    totalVotes: "Total Votes Recorded:",
    resetButton: "Reset & Vote Again",
    replayMessage: "🔊 Play Sound",
    instructions: "Instructions:",
    instruction1:
      "• Click the 'Press Button' to vote for each candidate one by one",
    instruction2: "• You will hear a confirmation beep after each vote",
    instruction3: "• After voting for all candidates, you can vote for NOTA",
    instruction4: "• When completed, you will hear completion sound",
    instruction5:
      "• Use the 'Reset & Vote Again' button to restart the voting process",
    footer: "RICH SYSTEM SOLUTIONS PVT LTD 9595902006",
    testSound: "Test Sound 🔊",
    processing: "Press Button",
    voteSummary: "Voting Summary",
    currentStatus: "Current Voting Status",
    nextToVote: "Next to vote:",
    clickToVote:
      "Click the 'Press Button' in front of candidate to cast your vote",
    finalStepDesc:
      "Click the button to select NOTA if you don't want to vote for any candidate",
    completedMessage:
      "✅ Your vote has been successfully submitted. Thank you!",
  },
  hi: {
    title: "महानगर पालिका डमी वोटिंग मशीन",
    demoInstruction:
      "डेमो मतदान के लिए उम्मीदवार के नाम और चिन्ह के सामने नीले बटन को दबाएं",
    votingMachine: "महानगर पालिका डमी वोटिंग मशीन",
    candidateList:
      "(अ) - कु. रोहित (शिवा) अनिल गाडे, (ब) - सौ. वंदना सुरेश बोराडे, (क) - सौ. रत्ना अशोक सातभाई, (ड) - श्री. योगेश चिंधुजी निसाळ",
    voteThem:
      "उनके नाम और चिन्ह के सामने बटन दबाकर उन्हें भारी मतों से जिताएं!",
    pollingDate: "मतदान तिथि",
    pollingDateValue: "- गुरुवार, 2026-01-15 सुबह ७:३० बजे से शाम ५:३० बजे तक",
    division: "प्रभाग क्र.",
    divisionValue: "- १८",
    tableHeaders: ["अ. क्र.", "उम्मीदवार का नाम", "छायाचित्र", "चिन्ह", "बटन"],
    pressButton: "बटण दबाएँ",
    share: "शेयर करें",
    currentStep: "वर्तमान में मतदान कर रहे हैं",
    finalStep: "अंतिम चरण:",
    nota: "नोटा",
    votingCompleted: "मतदान सफलतापूर्वक पूर्ण हुआ!",
    thankYou: "महानगर पालिका डमी चुनाव में भाग लेने के लिए धन्यवाद",
    totalVotes: "कुल मत दर्ज किए गए:",
    resetButton: "रीसेट करें और फिर से मतदान करें",
    replayMessage: "🔊 ध्वनि चलाएं",
    instructions: "निर्देश:",
    instruction1:
      "• प्रत्येक उम्मीदवार के लिए मतदान करने के लिए 'बटन दबाएँ' पर क्लिक करें",
    instruction2: "• प्रत्येक मतदान के बाद आप एक पुष्टि बीप सुनेंगे",
    instruction3:
      "• सभी उम्मीदवारों के लिए मतदान करने के बाद, आप नोटा के लिए मतदान कर सकते हैं",
    instruction4: "• पूरा होने पर, आप पूरा होने की ध्वनि सुनेंगे",
    instruction5:
      "• मतदान प्रक्रिया को फिर से शुरू करने के लिए 'रीसेट करें और फिर से मतदान करें' बटन का उपयोग करें",
    footer: "RICH SYSTEM SOLUTIONS PVT LTD 9595902006",
    testSound: "ध्वनि परीक्षण 🔊",
    processing: "बटन दबाएँ",
    voteSummary: "मतदान सारांश",
    currentStatus: "वर्तमान मतदान स्थिति",
    nextToVote: "अगले मतदान के लिए:",
    clickToVote:
      "मतदान करने के लिए उम्मीदवार के सामने 'बटन दबाएँ' पर क्लिक करें",
    finalStepDesc:
      "यदि आप किसी उम्मीदवार को मत नहीं देना चाहते हैं तो नोटा चुनने के लिए बटन दबाएं",
    completedMessage: "✅ आपका वोट सफलतापूर्वक दर्ज किया गया है। धन्यवाद!",
  },
  mr: {
    title: "महानगर पालिका डमी मतदान मशीन",
    demoInstruction:
      "डेमो मतदानासाठी उमेदवाराच्या नाव आणि चिन्हासमोरील निळ्या बटणावर क्लिक करा",
    votingMachine: "महानगर पालिका डमी मतदान मशीन",
    candidateList:
      "(अ) - कु. रोहित (शिवा) अनिल गाडे, (ब) - सौ. वंदना सुरेश बोराडे, (क) - सौ. रत्ना अशोक सातभाई, (ड) - श्री. योगेश चिंधुजी निसाळ",
    voteThem:
      "त्यांचे नाव आणि चिन्हासमोरील बटणावर क्लिक करून त्यांना प्रचंड मतांनी विजयी करा!",
    pollingDate: "मतदान दिनांक",
    pollingDateValue:
      "- गुरुवार, 2026-01-15 रोजी सकाळी ७:३० ते सायंकाळी ५:३० वाजेपर्यत",
    division: "प्रभाग क्र.",
    divisionValue: "- १८",
    tableHeaders: ["क्रमांक", "उमेदवाराचे नाव", "छायाचित्र", "चिन्ह", "बटण"],
    pressButton: "बटण दाबा",
    share: "शेअर करा",
    currentStep: "सध्या मतदान करीत आहेत",
    finalStep: "अंतिम चरण:",
    nota: "नोटा",
    votingCompleted: "मतदान यशस्वीरित्या पूर्ण झाले!",
    thankYou: "महानगर पालिका डमी निवडणुकीत सहभागी झाल्याबद्दल धन्यवाद",
    totalVotes: "एकूण मते नोंदविली:",
    resetButton: "रीसेट करा आणि पुन्हा मतदान करा",
    replayMessage: "🔊 ध्वनी चालवा",
    instructions: "सूचना:",
    instruction1: "• प्रत्येक उमेदवाराला मत देण्यासाठी 'बटण दाबा' वर क्लिक करा",
    instruction2: "• प्रत्येक मतदानानंतर आपण एक पुष्टीकरण बीप ऐकू शकाल",
    instruction3: "• सर्व उमेदवारांना मत दिल्यानंतर, आपण नोटा साठी मत देऊ शकता",
    instruction4: "• पूर्ण झाल्यावर, आपण पूर्ण होण्याचा आवाज ऐकू शकाल",
    instruction5:
      "• मतदान प्रक्रिया पुन्हा सुरू करण्यासाठी 'रीसेट करा आणि पुन्हा मतदान करा' बटण वापरा",
    footer: "RICH SYSTEM SOLUTIONS PVT LTD 9595902006",
    testSound: "ध्वनी चाचणी 🔊",
    processing: "बटण दाबा",
    voteSummary: "मतदान सारांश",
    currentStatus: "वर्तमान मतदान स्थिती",
    nextToVote: "पुढील मतदानासाठी:",
    clickToVote: "मत देण्यासाठी उमेदवारासमोर 'बटण दाबा' वर क्लिक करा",
    finalStepDesc:
      "जर तुम्हाला कोणत्याही उमेदवाराला मत द्यायचे नसेल तर नोटा निवडण्यासाठी बटण दाबा",
    completedMessage: "✅ तुमचे मत यशस्वीरित्या नोंदवले गेले आहे. धन्यवाद!",
  },
};

function App() {
  const [votes, setVotes] = useState(0);
  const [votedCandidates, setVotedCandidates] = useState([]);
  const [votingCompleted, setVotingCompleted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [language, setLanguage] = useState("mr");
  const [isLoading, setIsLoading] = useState(true);

  // Audio refs
  const beepAudioRef = useRef(null);
  const successAudioRef = useRef(null);
  const endAudioRef = useRef(null);
  const candidate4AudioRef = useRef(null);

  // Fetch initial vote count on mount
  useEffect(() => {
    fetchVotes();
    initializeAudio();
    loadVotedCandidatesFromStorage();
  }, []);

  // Save voted candidates to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("votedCandidates", JSON.stringify(votedCandidates));
    localStorage.setItem("votingCompleted", JSON.stringify(votingCompleted));
  }, [votedCandidates, votingCompleted]);

  // Initialize audio
  const initializeAudio = () => {
    beepAudioRef.current = new Audio(audiobeep);
    successAudioRef.current = new Audio(audiobeep);
    endAudioRef.current = new Audio(audiobeep);
    candidate4AudioRef.current = new Audio(audiolast);

    beepAudioRef.current.volume = 0.7;
    successAudioRef.current.volume = 0.7;
    endAudioRef.current.volume = 0.7;
    candidate4AudioRef.current.volume = 0.7;

    beepAudioRef.current.preload = "auto";
    successAudioRef.current.preload = "auto";
    endAudioRef.current.preload = "auto";
    candidate4AudioRef.current.preload = "auto";
  };

  // Load voted candidates from localStorage
  const loadVotedCandidatesFromStorage = () => {
    const savedVotedCandidates = localStorage.getItem("votedCandidates");
    const savedVotingCompleted = localStorage.getItem("votingCompleted");

    if (savedVotedCandidates) {
      setVotedCandidates(JSON.parse(savedVotedCandidates));
    }

    if (savedVotingCompleted) {
      setVotingCompleted(JSON.parse(savedVotingCompleted));
    }
  };

  // Fetch votes from API
  const fetchVotes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(GET_VOTES_URL);
      if (response.ok) {
        const data = await response.json();
        // Assuming the API returns { total: number } or similar structure
        const voteCount = data.total || data.count || data.votes || 0;
        setVotes(voteCount);
      }
    } catch (error) {
      console.error("Error fetching votes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Increment vote on API
  const incrementVoteOnAPI = async (candidateId) => {
    try {
      const response = await fetch(INCREMENT_VOTE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidate_id: candidateId,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Vote incremented successfully:", data);
        // Update local vote count after successful API call
        setVotes((prev) => prev + 1);
        return true;
      } else {
        console.error("Failed to increment vote");
        return false;
      }
    } catch (error) {
      console.error("Error incrementing vote:", error);
      return false;
    }
  };

  // Current language translations
  const t = translations[language];

  // Candidate data
  const candidates = [
    {
      id: 1,
      srNo: 1,
      name: " रोहित अनिल गाडे",
      nameHindi: " रोहित अनिल गाडे",
      nameMarathi: " रोहित अनिल गाडे",
      nameEnglish: "Rohit (Shiva) Anil Gade",
      party: "Independent",
      photo: rohitgade,
      symbol: kamalsign,
      symbolText: "Lotus",
      code: "अ",
      bgColor: "#ffffff",
    },
    {
      id: 2,
      srNo: 2,
      name: " वंदना सुरेश बोराडे",
      nameHindi: " वंदना सुरेश बोराडे",
      nameMarathi: " वंदना सुरेश बोराडे",
      nameEnglish: " Vandan Suresh Borade",
      party: "Independent",
      photo: vandana,
      symbol: kamalsign,
      symbolText: "Lotus",
      code: "ब",
      bgColor: "#c777b0",
    },
    {
      id: 3,
      srNo: 3,
      name: " रत्ना अशोक सातभाई",
      nameHindi: "रत्ना अशोक सातभाई",
      nameMarathi: " रत्ना अशोक सातभाई",
      nameEnglish: " Ratna Ashok Satbhai",
      party: "राष्ट्रवादी काँग्रेस पुरस्कृत",
      photo: ratna,
      symbol: kamalsign,
      symbolText: "Lotus",
      code: "क",
      bgColor: "#f0e47f",
    },
    {
      id: 4,
      srNo: 4,
      name: "योगेश चिंधुजी निसाळ",
      nameHindi: "योगेश चिंधुजी निसाळ",
      nameMarathi: "योगेश चिंधुजी निसाळ",
      nameEnglish: "Yogesh Chindhuji Nisal",
      party: "राष्ट्रवादी काँग्रेस पुरस्कृत",
      photo: yogesh,
      symbol: kamalsign,
      symbolText: "Lotus",
      code: "ड",
      bgColor: "#7384d1",
    },
  ];

  // NOTA candidate
  const notaCandidate = {
    id: 16,
    srNo: 16,
    name: "NOTA",
    nameHindi: "नोटा",
    nameMarathi: "नोटा",
    nameEnglish: "NOTA",
    party: "None of the Above",
    photo: "",
    symbol: "",
    symbolText: "",
    code: "N",
    bgColor: "#ffffff",
  };

  // Get candidate name based on language
  const getCandidateName = (candidate) => {
    if (!candidate) return "";
    if (language === "en") return candidate.nameEnglish || candidate.name;
    if (language === "hi") return candidate.nameHindi || candidate.name;
    if (language === "mr") return candidate.nameMarathi || candidate.name;
    return candidate.name;
  };

  // Play beep sound
  const playBeepSound = () => {
    if (beepAudioRef.current) {
      try {
        beepAudioRef.current.currentTime = 0;
        beepAudioRef.current.play().catch((e) => {
          console.log("Beep audio failed to play:", e);
        });
      } catch (error) {
        console.error("Error playing beep sound:", error);
      }
    }
  };

  // Play special sound for candidate 4
  const playCandidate4Sound = () => {
    if (candidate4AudioRef.current) {
      try {
        candidate4AudioRef.current.currentTime = 0;
        candidate4AudioRef.current.play().catch((e) => {
          console.log("Candidate 4 audio failed to play:", e);
        });
      } catch (error) {
        console.error("Error playing candidate 4 sound:", error);
      }
    }
  };

  // Play success sound
  const playSuccessSound = () => {
    if (successAudioRef.current) {
      successAudioRef.current.currentTime = 0;
      successAudioRef.current
        .play()
        .catch((e) => console.log("Success audio failed:", e));
    }
  };

  // Play end voting sound
  const playEndVotingSound = () => {
    if (endAudioRef.current) {
      endAudioRef.current.currentTime = 0;
      endAudioRef.current
        .play()
        .catch((e) => console.log("End audio failed:", e));
    }
  };
  // Handle vote
  const handleVote = async (candidate) => {
    if (votingCompleted) return;
    try {
      console.log("Voting for candidate:", candidate.srNo);

      // Play appropriate sound
      if (candidate.srNo === 4) {
        console.log("Playing special audio for candidate 4");
        playCandidate4Sound();
      } else {
        console.log("Playing regular beep for candidate", candidate.srNo);
        playBeepSound();
      }

      setIsProcessing(true);

      // Call API to increment vote
      const apiSuccess = await incrementVoteOnAPI(
        candidate.id || candidate.srNo
      );

      if (apiSuccess) {
        // Add to voted candidates
        setVotedCandidates((prev) => [...prev, candidate]);

        // If it's NOTA, mark voting as completed
        if (candidate.srNo === 16) {
          setVotingCompleted(true);
          setTimeout(() => {
            playSuccessSound();
            setTimeout(() => playEndVotingSound(), 50);
          }, 50);
        }
      } else {
        console.error("Failed to record vote on API");
      }
    } catch (error) {
      console.error("Error in vote handling:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle language change
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const testBeepSound = () => {
    playBeepSound();
  };

  // Reset voting session
  const resetVoting = () => {
    setVotedCandidates([]);
    setVotingCompleted(false);
    localStorage.removeItem("votedCandidates");
    localStorage.removeItem("votingCompleted");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Candidate1Page
              votes={votes}
              setVotes={setVotes}
              language={language}
              handleLanguageChange={handleLanguageChange}
              testBeepSound={playBeepSound}
              t={t}
              getCandidateName={getCandidateName}
              handleVote={handleVote}
              votingCompleted={votingCompleted}
              isProcessing={isProcessing}
              candidate={candidates[0]}
              playBeepSound={playBeepSound}
              resetVoting={resetVoting}
              isLoading={isLoading}
            />
          }
        />

        <Route
          path="/c1"
          element={
            <Candidate1Page
              votes={votes}
              setVotes={setVotes}
              language={language}
              handleLanguageChange={handleLanguageChange}
              testBeepSound={playBeepSound}
              t={t}
              getCandidateName={getCandidateName}
              handleVote={handleVote}
              votingCompleted={votingCompleted}
              isProcessing={isProcessing}
              candidate={candidates[0]}
              playBeepSound={playBeepSound}
              resetVoting={resetVoting}
              isLoading={isLoading}
            />
          }
        />

        <Route
          path="/c2"
          element={
            <Candidates23Page
              votes={votes}
              setVotes={setVotes}
              language={language}
              handleLanguageChange={handleLanguageChange}
              testBeepSound={playBeepSound}
              t={t}
              getCandidateName={getCandidateName}
              handleVote={handleVote}
              votingCompleted={votingCompleted}
              isProcessing={isProcessing}
              candidate2={candidates[1]}
              candidate3={candidates[2]}
              playBeepSound={playBeepSound}
              resetVoting={resetVoting}
              isLoading={isLoading}
            />
          }
        />

        <Route path="/c3" element={<Navigate to="/c2" />} />

        <Route
          path="/c4"
          element={
            <Candidate4Page
              votes={votes}
              setVotes={setVotes}
              language={language}
              handleLanguageChange={handleLanguageChange}
              testBeepSound={playBeepSound}
              t={t}
              getCandidateName={getCandidateName}
              handleVote={handleVote}
              votingCompleted={votingCompleted}
              isProcessing={isProcessing}
              candidate={candidates[3]}
              playBeepSound={playBeepSound}
              playCandidate4Sound={playCandidate4Sound}
              resetVoting={resetVoting}
              isLoading={isLoading}
            />
          }
        />

        <Route
          path="/nota"
          element={
            <NotaPage
              votes={votes}
              setVotes={setVotes}
              language={language}
              handleLanguageChange={handleLanguageChange}
              testBeepSound={playBeepSound}
              t={t}
              getCandidateName={getCandidateName}
              handleVote={handleVote}
              votingCompleted={votingCompleted}
              isProcessing={isProcessing}
              notaCandidate={notaCandidate}
              playSuccessSound={playSuccessSound}
              playEndVotingSound={playEndVotingSound}
              playBeepSound={playBeepSound}
              playCandidate4Sound={playCandidate4Sound}
              resetVoting={resetVoting}
              isLoading={isLoading}
            />
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer t={t} />
    </Router>
  );
}

export default App;
