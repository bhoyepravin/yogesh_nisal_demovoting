import React from "react";

const Footer = ({ t }) => {
  return (
    <footer className="mt-8">
      {/* Instructions */}
      {/* <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border-2 border-yellow-300 mb-6 shadow">
        <h4 className="font-bold text-yellow-800 mb-3 text-lg flex items-center gap-2">
          <span className="text-xl">📋</span> {t.instructions}
        </h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 mt-1">•</span>
            <span>{t.instruction1}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 mt-1">•</span>
            <span>{t.instruction2}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 mt-1">•</span>
            <span>{t.instruction3}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 mt-1">•</span>
            <span>{t.instruction4}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-600 mt-1">•</span>
            <span>{t.instruction5}</span>
          </li>
        </ul>
      </div> */}

      {/* Footer */}
      <div className="flex items-center justify-center py-6 mt-4  rounded-xl">
        <h1 className="text-gray-500 text-xs">{t.footer}</h1>
      </div>
    </footer>
  );
};

export default Footer;
