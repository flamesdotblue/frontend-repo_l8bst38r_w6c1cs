import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import FeaturesAndStats from './components/FeaturesAndStats';
import Footer from './components/Footer';
import { Download, ExternalLink, History, Loader2, LogIn, PlayCircle, Search, User } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [queue, setQueue] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  // Simulate progress updates for downloads
  useEffect(() => {
    const id = setInterval(() => {
      setQueue((items) => items.map(item => item.status === 'done' ? item : {
        ...item,
        progress: Math.min(100, item.progress + Math.random() * 10),
        status: item.progress + 10 >= 100 ? 'done' : 'downloading'
      }));
    }, 1200);
    return () => clearInterval(id);
  }, []);

  const activeDownloads = useMemo(() => queue.filter(q => q.status !== 'done'), [queue]);
  const history = useMemo(() => queue.filter(q => q.status === 'done'), [queue]);

  const handleSubmit = ({ url, quality }) => {
    const id = Math.random().toString(36).slice(2);
    setQueue(prev => [{ id, url, quality, title: `Track ${prev.length + 1}` , progress: 0, status: 'queued' }, ...prev]);
    setActivePage('dashboard');
  };

  const handleAuthClick = () => {
    // Simulated auth flow
    setIsAuth(true);
    setActivePage('dashboard');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-700 via-indigo-700 to-blue-800 font-inter">
      <Navbar activePage={activePage} onNavigate={setActivePage} onAuthClick={handleAuthClick} />

      {activePage === 'home' && (
        <>
          <HeroSearch onSubmit={handleSubmit} />
          <FeaturesAndStats />
          <Footer />
        </>
      )}

      {activePage === 'dashboard' && (
        <DashboardPage isAuth={isAuth} onRequireAuth={handleAuthClick} activeDownloads={activeDownloads} history={history} />
      )}

      {activePage === 'pricing' && (
        <PricingPage onSelectPlan={() => setActivePage('dashboard')} />
      )}
    </div>
  );
}

function DashboardPage({ isAuth, onRequireAuth, activeDownloads, history }) {
  return (
    <main className="pt-28 pb-16">
      <div className="mx-auto w-[95%] md:w-11/12 lg:w-4/5 grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="h-fit rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl text-white p-5">
          <div className="text-xl font-bold">Your Space</div>
          <div className="mt-4 grid gap-2">
            <NavPill icon={<Search size={16} />} label="New Download" />
            <NavPill icon={<Download size={16} />} label="Active" />
            <NavPill icon={<History size={16} />} label="History" />
            <NavPill icon={<User size={16} />} label="Profile" />
          </div>

          <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-4">
            <div className="text-sm text-white/80">Upgrade to Pro for batch downloads, priority speed, and FLAC.</div>
            <button className="mt-3 w-full rounded-xl bg-[#1DB954] px-4 py-2 text-black font-semibold">Go Pro</button>
          </div>
        </aside>

        {/* Main content */}
        <section className="grid gap-6">
          {/* Auth gate */}
          {!isAuth && (
            <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-6 text-white flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="text-xl font-bold">Sign in to sync your downloads</div>
                <p className="text-white/80">Continue with Email, Google, or Spotify.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={onRequireAuth} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 border border-white/20"><LogIn size={16}/> Email</button>
                <button onClick={onRequireAuth} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 border border-white/20">Google</button>
                <button onClick={onRequireAuth} className="inline-flex items-center gap-2 rounded-xl bg-[#1DB954] text-black px-4 py-2">Spotify</button>
              </div>
            </div>
          )}

          {/* Active Downloads */}
          <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Active Downloads</h2>
              <span className="text-white/70">{activeDownloads.length} running</span>
            </div>
            <div className="mt-4 grid gap-3">
              {activeDownloads.length === 0 ? (
                <div className="text-white/70">No active downloads. Paste a link on the Home page to start one.</div>
              ) : (
                activeDownloads.map(item => (
                  <DownloadCard key={item.id} item={item} />
                ))
              )}
            </div>
          </div>

          {/* History */}
          <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Download History</h2>
              <button className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 border border-white/20 text-sm">Export CSV <ExternalLink size={14} /></button>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-white/70">
                  <tr>
                    <th className="py-2 pr-4">Title</th>
                    <th className="py-2 pr-4">Quality</th>
                    <th className="py-2 pr-4">URL</th>
                    <th className="py-2 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.slice(0, 8).map(row => (
                    <tr key={row.id} className="border-t border-white/10">
                      <td className="py-2 pr-4">{row.title}</td>
                      <td className="py-2 pr-4 uppercase">{row.quality.replace('_', ' ')}</td>
                      <td className="py-2 pr-4 text-white/70 max-w-[280px] truncate">{row.url}</td>
                      <td className="py-2 pr-4"><span className="rounded-full bg-emerald-400/20 text-emerald-300 px-2 py-0.5 text-xs">done</span></td>
                    </tr>
                  ))}
                  {history.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-4 text-white/70">No history yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Profile */}
          <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-6 text-white">
            <h2 className="text-2xl font-bold">Profile</h2>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm text-white/70">Display name</label>
                <input className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white" defaultValue="Guest" />
              </div>
              <div>
                <label className="text-sm text-white/70">Email</label>
                <input className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white" defaultValue={isAuth ? 'you@example.com' : ''} placeholder="Sign in to set" />
              </div>
            </div>
            <button className="mt-4 rounded-xl bg-[#1DB954] px-4 py-2 text-black font-semibold">Save</button>
          </div>
        </section>
      </div>
    </main>
  );
}

function DownloadCard({ item }) {
  const pct = Math.round(item.progress);
  const color = item.status === 'done' ? 'bg-emerald-400' : 'bg-[#1DB954]';
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4">
      <div className="h-14 w-14 rounded-xl bg-white/10 flex items-center justify-center text-white overflow-hidden">
        <PlayCircle />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between text-white">
          <div className="font-semibold">{item.title}</div>
          <div className="text-xs uppercase text-white/70">{item.quality.replace('_', ' ')}</div>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-white/10">
          <div className={`h-2 rounded-full ${color}`} style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-1 text-white/70 text-xs">{pct}% • {item.status}</div>
      </div>
      {item.status !== 'done' ? <Loader2 className="animate-spin text-white/70" /> : <Download className="text-emerald-300" />}
    </div>
  );
}

function NavPill({ icon, label }) {
  return (
    <button className="flex items-center gap-2 rounded-xl px-3 py-2 text-white/90 hover:bg-white/10 border border-transparent hover:border-white/15 transition">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function PricingPage({ onSelectPlan }) {
  const tiers = [
    {
      name: 'Free', price: '$0', tagline: 'Great for trying things out', features: ['128-192kbps MP3', 'Single track download', 'Basic support'], cta: 'Get Started', highlight: false
    },
    {
      name: 'Pro', price: '$9/mo', tagline: 'For power users and collectors', features: ['320kbps MP3', 'Batch playlists & albums', 'Priority speed', 'FLAC & M4A'], cta: 'Start Pro', highlight: true
    },
    {
      name: 'Lifetime', price: '$99', tagline: 'One-time payment, forever access', features: ['All Pro features', 'Lifetime updates', 'Priority support'], cta: 'Go Lifetime', highlight: false
    },
  ];

  return (
    <main className="pt-28 pb-16">
      <div className="mx-auto w-[95%] md:w-11/12 lg:w-4/5 text-white">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">Simple, transparent pricing</h1>
          <p className="mt-3 text-white/80">Choose the plan that fits your library.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div key={t.name} className={`relative rounded-3xl border ${t.highlight ? 'border-[#1DB954]' : 'border-white/15'} bg-white/10 backdrop-blur-xl p-6 flex flex-col`}>
              {t.highlight && (<div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#1DB954] text-black px-3 py-1 text-xs font-bold shadow">POPULAR</div>)}
              <div className="text-2xl font-bold">{t.name}</div>
              <div className="mt-1 text-4xl font-extrabold">{t.price}</div>
              <div className="text-white/80">{t.tagline}</div>

              <ul className="mt-4 space-y-2 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2"><span className="h-5 w-5 rounded-full bg-[#1DB954] text-black inline-flex items-center justify-center"><span className="font-bold">✓</span></span> <span>{f}</span></li>
                ))}
              </ul>

              <button onClick={onSelectPlan} className={`mt-6 rounded-xl px-4 py-2 font-semibold ${t.highlight ? 'bg-[#1DB954] text-black' : 'bg-white/10 border border-white/20'}`}>{t.cta}</button>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-6 text-white/80 text-center">
          Secure payments powered by Stripe. Cancel anytime.
        </div>
      </div>
    </main>
  );
}
