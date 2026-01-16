import { FaGithub, FaCoffee } from 'react-icons/fa';

interface FooterProps {}

export const Footer = ({}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative right-0 bottom-0 left-0 z-30 border-t border-white/5 bg-black/40 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-4">
      <div className="mx-auto flex w-full max-w-md flex-col-reverse items-center justify-between gap-4 md:flex-row lg:max-w-lg">
        {/* Copyright */}
        <div className="text-[8px] font-bold tracking-[0.15em] text-neutral-500 uppercase sm:text-[10px]">
          © {currentYear} Bible Wisdom. All rights reserved.
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* GitHub Link */}
          <a
            href="https://buymeacoffee.com/eden0118"
            target="_blank"
            rel="noopener noreferrer"
            title="Buy me a coffee"
            className="small-circle-btn"
          >
            <FaCoffee size={12} />
          </a>
          {/* GitHub Link */}
          <a
            href="https://github.com/eden0118"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="small-circle-btn"
          >
            <FaGithub size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
};
