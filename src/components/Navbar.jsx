import { useState } from 'react';
import { Menu, X, Download, User } from 'lucide-react';

export default function Navbar({ activePage, onNavigate, onAuthClick }) {
  const [open, setOpen] = useState(false);

  const linkClasses = (page) => `px-4 py-2 rounded-full transition-colors ${
    activePage === page ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
  }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <nav className="mx-auto mt-4 w-[95%] md:w-11/12 lg:w-4/5 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-[#1DB954] text-black shadow-lg">
              <Download size={18} />
            </div>
            <span className="text-white text-lg md:text-xl font-semibold tracking-tight">SpotifyDL</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button className={linkClasses('home')} onClick={() => onNavigate('home')}>Home</button>
            <button className={linkClasses('dashboard')} onClick={() => onNavigate('dashboard')}>Dashboard</button>
            <button className={linkClasses('pricing')} onClick={() => onNavigate('pricing')}>Pricing</button>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button onClick={onAuthClick} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white hover:bg-white/20 transition">
              <User size={18} />
              <span>Sign in</span>
            </button>
            <button onClick={() => onNavigate('dashboard')} className="rounded-full bg-[#1DB954] px-4 py-2 font-medium text-black shadow-[0_0_30px_rgba(29,185,84,0.5)] hover:shadow-[0_0_40px_rgba(29,185,84,0.7)] transition">
              Open App
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-white/10 px-4 py-3 space-y-2">
            <button className={linkClasses('home') + ' w-full text-left'} onClick={() => {onNavigate('home'); setOpen(false);}}>Home</button>
            <button className={linkClasses('dashboard') + ' w-full text-left'} onClick={() => {onNavigate('dashboard'); setOpen(false);}}>Dashboard</button>
            <button className={linkClasses('pricing') + ' w-full text-left'} onClick={() => {onNavigate('pricing'); setOpen(false);}}>Pricing</button>
            <div className="pt-2 flex items-center gap-2">
              <button onClick={onAuthClick} className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white">
                <User size={18} />
                <span>Sign in</span>
              </button>
              <button onClick={() => {onNavigate('dashboard'); setOpen(false);}} className="flex-1 rounded-full bg-[#1DB954] px-4 py-2 font-medium text-black">Open App</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
