import React from 'react';

interface HeaderProps {
  onSkip?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSkip }) => {
  return (
    <header className="bg-gray-50 border-b border-gray-200">
      <div className="h-16 flex items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-[#174A5B] to-[#1C586C] rounded flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-gray-700 font-semibold text-lg">Demo Studio Kickstart</span>
        </div>
        {onSkip && (
          <button
            onClick={onSkip}
            className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            Skip Tour
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
