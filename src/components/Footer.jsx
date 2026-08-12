const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-line px-6 sm:px-16 py-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <p className="text-white-100 text-[15px] font-semibold tracking-tight">
            Rohit <span className="text-secondary font-normal">— iOS Developer</span>
          </p>
          <p className="mt-1 text-secondary text-[12px]">
            Designed and built with Swift, SwiftUI, and a lot of attention to detail.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-secondary text-[13px] hover:text-white-100 transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-secondary text-[13px] hover:text-white-100 transition-colors">
            LinkedIn
          </a>
          <a href="mailto:kevatrohit63@gmail.com" className="text-secondary text-[13px] hover:text-white-100 transition-colors">
            Email
          </a>
        </div>
      </div>

      <p className="max-w-7xl mx-auto mt-8 text-secondary/60 text-[11px]">
        © {new Date().getFullYear()} Rohit. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
