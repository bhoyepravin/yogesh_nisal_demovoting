import React from "react";

const CandidateRow = ({
  candidate,
  t,
  isCurrent,
  votingCompleted,
  isProcessing,
  onVote,
  getCandidateName,
  bgColor,
  srNo,
  isNotaRow = false,
}) => {
  return (
    <tr
      className="border transition-colors duration-300"
      style={{ backgroundColor: bgColor }}
    >
      <td className="px-1 py-4 md:px-2 md:py-2 text-center font-semibold">
        {srNo}
      </td>
      <td className="px-1 py-4 md:px-2 md:py-2 font-semibold">
        {candidate ? (
          getCandidateName(candidate)
        ) : isNotaRow ? (
          <span className="text-center">{t.nota}</span>
        ) : (
          ""
        )}
      </td>
      <td className="px-1 py-4 md:px-2 md:py-2 text-center">
        <div className="flex justify-center">
          {candidate && candidate.photo ? (
            <img
              alt={getCandidateName(candidate)}
              className="h-16 w-12 md:h-10 md:w-10 object-contain rounded-full border"
              src={candidate.photo}
              style={{
                opacity: 1,
                transition: "opacity 0.2s ease-in-out",
              }}
            />
          ) : (
            <span className="text-neutral-300">&nbsp;</span>
          )}
        </div>
      </td>
      <td className="px-1 py-4 md:px-2 md:py-2 border-r border-l">
        <div className="flex justify-center items-center">
          {candidate && candidate.symbol ? (
            <img
              alt={getCandidateName(candidate)}
              className="h-8 md:h-10 w-auto object-contain"
              src={candidate.symbol}
            />
          ) : srNo === 16 && candidate ? (
            <span className="inline-flex items-center justify-center bg-black text-white rounded text-[10px] font-semibold px-2 py-1">
              {t.nota}
            </span>
          ) : (
            <span className="text-neutral-300">&nbsp;</span>
          )}
        </div>
      </td>
      <td className="px-1 py-4 md:px-2 md:py-2">
        <div className="flex items-center justify-center gap-2">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            version="1.1"
            viewBox="0 0 16 16"
            className="text-[#6a0000] text-xl md:text-2xl"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0.5 8l7.5 7.5v-4.5h8v-6h-8v-4.5z"></path>
          </svg>
          {isCurrent && !votingCompleted ? (
            <button
              onClick={onVote}
              className="text-xs md:text-sm tracking-tight rounded-full px-2 py-1 md:py-2 bg-[#003399] text-white shadow cursor-pointer hover:bg-blue-800 transition-colors"
              disabled={isProcessing}
            >
              {isProcessing ? t.processing : t.pressButton}
            </button>
          ) : candidate ? (
            <button
              disabled
              className="text-xs md:text-sm tracking-tight rounded-full px-2 py-1 md:py-2 bg-[#003399] cursor-not-allowed text-transparent"
            >
              {t.pressButton}
            </button>
          ) : (
            <button
              disabled
              className="text-xs md:text-sm tracking-tight rounded-full px-2 py-1 md:py-2 bg-[#003399] cursor-not-allowed text-transparent"
            >
              {t.pressButton}
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default CandidateRow;
