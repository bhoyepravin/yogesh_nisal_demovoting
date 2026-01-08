import React from "react";
import CandidateRow from "./CandidateRow";

const VotingTable4Rows = ({
  language,
  candidate,
  votingCompleted,
  isProcessing,
  handleVote,
  t,
  getCandidateName,
  currentBgColor,
  position = 1,
  showOnlyOne = true,
  isNota = false,
}) => {
  // Create empty rows for positions 1-5
  const generateRows = () => {
    const rows = [];

    for (let i = 1; i <= 8; i++) {
      const isCurrentRow = i === position || (isNota && i === 8);
      const rowCandidate = isCurrentRow ? candidate : null;

      rows.push({
        srNo: i,
        candidate: rowCandidate,
        isCurrent: isCurrentRow,
        bgColor: candidate.bgColor,
        isNotaRow: i === 8 && !rowCandidate && !isNota,
      });
    }

    return rows;
  };

  const tableRows = generateRows();

  return (
    <div
      className="  border border-[#cccccc]  relative panel-slide-left shadow-lg transition-all duration-500"
      style={{ backgroundColor: currentBgColor }}
    >
      <div className="overflow-x-auto rounded-xl">
        <div className=" text-center">
          <p className="text-black-700">
            <strong>
              {language === "en" && "gat:"}
              {language === "hi" && "गट:"}
              {language === "mr" && "गट:"}
            </strong>{" "}
            {candidate.code}
          </p>
        </div>
        <table className="w-full text-xs md:text-sm">
          <thead
            className="font-semibold sticky top-0 z-4"
            style={{ backgroundColor: currentBgColor }}
          >
            <tr>
              {t.tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className={`px-2 py-3 md:px-3 md:py-4  ${
                    index === 0
                      ? "w-[50px] md:w-[60px] text-left"
                      : index === 2
                      ? "w-[50px] md:w-[60px] text-center"
                      : index === 3
                      ? "w-18 md:w-20 text-center"
                      : index === 4
                      ? "w-[120px] text-center"
                      : "text-left"
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row) => (
              <CandidateRow
                key={row.srNo}
                candidate={row.candidate}
                t={t}
                isCurrent={row.isCurrent}
                votingCompleted={votingCompleted}
                isProcessing={isProcessing}
                onVote={handleVote}
                getCandidateName={getCandidateName}
                bgColor={row.bgColor}
                srNo={row.srNo}
                isNotaRow={row.isNotaRow}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Current Candidate Indicator */}
      {/* {showOnlyOne && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 bg-black/4 px-4 py-2 rounded-full">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-semibold">
              Candidate {position}: {getCandidateName(candidate)}
            </span>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default VotingTable4Rows;
