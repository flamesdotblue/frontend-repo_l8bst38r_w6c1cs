import { Check, Download, History, User, TrendingUp } from 'lucide-react';

export default function FeaturesAndStats() {
  return (
    <section className="mx-auto w-[95%] md:w-11/12 lg:w-4/5 py-12 md:py-16">
      <div className="grid gap-6 md:grid-cols-2 items-stretch">
        {/* Left: Feature highlight */}
        <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-6 md:p-8 text-white">
          <h3 className="text-2xl md:text-3xl font-bold">Why creators love SpotifyDL</h3>
          <ul className="mt-5 space-y-3">
            {[
              'Batch download playlists and albums',
              'Preserves metadata with ID3 tags',
              'Lossless FLAC and high-bitrate MP3',
              'Privacy-first. No logs, no tracking',
              'Works on mobile, tablet, and desktop',
              'Smart suggestions powered by AI',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1DB954] text-black">
                  <Check size={16} />
                </span>
                <span className="text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Stats card */}
        <div className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-6 md:p-8 text-white grid gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#1DB954] text-black flex items-center justify-center"><Download size={18} /></div>
              <div>
                <div className="text-2xl font-extrabold">1,203,441</div>
                <div className="text-white/70 text-sm">Total downloads</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-emerald-300"><TrendingUp size={18} /> 12% this month</div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Stat label="Active users" value="340k" icon={<User size={16} />} />
            <Stat label="Success rate" value="99.7%" icon={<Check size={16} />} />
            <Stat label="History entries" value="4.8M" icon={<History size={16} />} />
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
            <div className="text-white/80 text-sm">Tip: Sign in to sync your download history and access your dashboard from any device.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl p-4 text-center text-white">
      <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">{icon}</div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-white/70 text-sm">{label}</div>
    </div>
  );
}
