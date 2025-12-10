import { FiGithub, FiGlobe } from 'react-icons/fi';

interface FooterProps {
  language: 'zh' | 'en';
  onToggleLanguage: () => void;
}

export const Footer = ({ language, onToggleLanguage }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bottom-0 left-0 right-0 z-40 border-t border-white/5 bg-black/40 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        {/* Copyright */}
        <div className="text-[9px] font-black tracking-[0.15em] text-neutral-500 uppercase sm:text-xs">
          © {currentYear} Eden Chang. All rights reserved.
        </div>

        {/* Links and Language Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* GitHub Link */}
          <a
            href="https://github.com/eden0118/bible-quiz"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repository"
            className="rounded-full border border-white/10 bg-white/5 p-2 text-neutral-400 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white sm:p-2.5"
          >
            <FiGithub size={12} />
          </a>

          {/* Language Toggle */}
          <button
            onClick={onToggleLanguage}
            title={language === 'zh' ? 'Switch to English' : '切換為中文'}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] font-black tracking-widest text-neutral-400 uppercase transition-all hover:border-white/30 hover:bg-white/10 hover:text-white sm:px-4 sm:py-2 sm:text-xs"
          >
            <FiGlobe size={12} />
            <span>{language === 'zh' ? 'EN' : '中文'}</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
