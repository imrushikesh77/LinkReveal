import { Terminal } from "lucide-react"

function Header() {
  return (
    <header className="z-10 border-b border-green-500/50 bg-black/90 backdrop-blur-sm py-3 sm:py-4 sticky top-0">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="text-green-500 h-5 w-5 sm:h-6 sm:w-6" />
          <div>
            <span className="text-green-500 font-bold text-sm sm:text-base tracking-wider">HACKNET</span>
            <span className="text-green-300 text-xs sm:text-sm opacity-70 ml-2">[v1.0.0]</span>
          </div>
        </div>
        <nav className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
          <a
            href="/"
            className="text-green-400 hover:text-green-500 transition-colors py-1 px-2 rounded hover:bg-green-900/20"
          >
            SCAN
          </a>
          <a
            href="/"
            className="text-green-400 hover:text-green-500 transition-colors py-1 px-2 rounded hover:bg-green-900/20"
          >
            LOGS
          </a>
          <a
            href="/"
            className="text-green-400 hover:text-green-500 transition-colors py-1 px-2 rounded hover:bg-green-900/20"
          >
            EXIT
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header

