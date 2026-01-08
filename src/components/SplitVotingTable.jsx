// SplitVotingTable.jsx
import React from "react";
import CandidateRow from "./CandidateRow";

const SplitVotingTable = ({
  candidate1,
  candidate2,
  votingCompleted,
  isProcessing,
  handleVote1,
  handleVote2,
  t,
  getCandidateName,
  currentBgColor1,
  currentBgColor2,
  position1 = 1,
  position2 = 9,
}) => {
  // Generate rows for the first half (1-8)
  const generateRowsFirstHalf = () => {
    const rows = [];

    for (let i = 1; i <= 8; i++) {
      const isCurrentRow = i === position1;
      const rowCandidate = isCurrentRow ? candidate1 : null;

      rows.push({
        srNo: i,
        candidate: rowCandidate,
        isCurrent: isCurrentRow,
        bgColor: isCurrentRow ? candidate1.bgColor : "#ffffff",
        isNotaRow: i === 8 && !rowCandidate,
        onVote: handleVote1,
      });
    }

    return rows;
  };

  // Generate rows for the second half (9-16)
  const generateRowsSecondHalf = () => {
    const rows = [];

    for (let i = 9; i <= 16; i++) {
      const isCurrentRow = i === position2;
      const rowCandidate = isCurrentRow ? candidate2 : null;

      rows.push({
        srNo: i,
        candidate: rowCandidate,
        isCurrent: isCurrentRow,
        bgColor: isCurrentRow ? candidate2.bgColor : "#ffffff",
        isNotaRow: i === 16 && !rowCandidate,
        onVote: handleVote2,
      });
    }

    return rows;
  };

  const rowsFirstHalf = generateRowsFirstHalf();
  const rowsSecondHalf = generateRowsSecondHalf();

  return (
    <div
      className="mt-6 rounded-2xl border-2 border-[#cccccc] px-3 py-8 md:px-4 md:py-8 relative panel-slide-left shadow-lg transition-all duration-500"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* First Half - Candidate 1 */}
        <div className="overflow-x-auto rounded-xl">
          <div className="mb-4 text-center">
            <div className="inline-flex items-center gap-2 bg-black/10 px-4 py-2 rounded-full">
              <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-sm font-semibold">
                Candidate {position1}: {getCandidateName(candidate1)}
              </span>
            </div>
          </div>

          <table className="w-full text-xs md:text-sm">
            <thead
              className="font-semibold sticky top-0 z-10"
              style={{ backgroundColor: currentBgColor1 }}
            >
              <tr>
                {t.tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className={`px-2 py-3 md:px-3 md:py-4 border-b-2 border-gray-300 ${
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
              {rowsFirstHalf.map((row) => (
                <CandidateRow
                  key={row.srNo}
                  candidate={row.candidate}
                  t={t}
                  isCurrent={row.isCurrent}
                  votingCompleted={votingCompleted}
                  isProcessing={isProcessing}
                  onVote={row.onVote}
                  getCandidateName={getCandidateName}
                  bgColor={row.bgColor}
                  srNo={row.srNo}
                  isNotaRow={row.isNotaRow}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Divider Line */}
        <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-px bg-gray-300 transform -translate-x-1/2"></div>

        {/* Second Half - Candidate 2 */}
        <div className="overflow-x-auto rounded-xl">
          <div className="mb-4 text-center">
            <div className="inline-flex items-center gap-2 bg-black/10 px-4 py-2 rounded-full">
              <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
              <span className="text-sm font-semibold">
                Candidate {position2}: {getCandidateName(candidate2)}
              </span>
            </div>
          </div>

          <table className="w-full text-xs md:text-sm">
            <thead
              className="font-semibold sticky top-0 z-10"
              style={{ backgroundColor: currentBgColor2 }}
            >
              <tr>
                {t.tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className={`px-2 py-3 md:px-3 md:py-4 border-b-2 border-gray-300 ${
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
              {rowsSecondHalf.map((row) => (
                <CandidateRow
                  key={row.srNo}
                  candidate={row.candidate}
                  t={t}
                  isCurrent={row.isCurrent}
                  votingCompleted={votingCompleted}
                  isProcessing={isProcessing}
                  onVote={row.onVote}
                  getCandidateName={getCandidateName}
                  bgColor={row.bgColor}
                  srNo={row.srNo}
                  isNotaRow={row.isNotaRow}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile view - Stacked */}
      <div className="lg:hidden space-y-8 mt-8">
        {/* Candidate 1 for mobile */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-black/10 px-4 py-2 rounded-full mb-4">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-sm font-semibold">
              Candidate {position1}: {getCandidateName(candidate1)}
            </span>
          </div>
        </div>

        {/* Candidate 2 for mobile */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-black/10 px-4 py-2 rounded-full mb-4">
            <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
            <span className="text-sm font-semibold">
              Candidate {position2}: {getCandidateName(candidate2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitVotingTable;
