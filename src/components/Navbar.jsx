// src/components/Navbar.jsx
// ─────────────────────────────────────────────────────────────────
// Top navigation bar — purely presentational (no props needed).
// ─────────────────────────────────────────────────────────────────

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="1.5" />
                <path d="M6 9.5l2.2 2.2L12 7" stroke="white" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight text-gray-900">
              Koin<span className="text-blue-600">X</span>
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900 transition-colors">Dashboard</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Portfolio</a>
            <a href="#" className="text-blue-600 font-medium">Tax Harvesting</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Reports</a>
          </div>

          {/* CTA */}
          <button className="hidden md:block bg-blue-600 text-white text-sm font-medium
            px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Get Tax Report
          </button>
        </div>
      </div>
    </nav>
  )
}
