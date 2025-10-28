import { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Search, Music, Shield, Zap, Globe, Tag } from 'lucide-react';

export default function HeroSearch({ onSubmit }) {
  const [url, setUrl] = useState('');
  const [quality, setQuality] = useState('mp3_320');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    onSubmit({ url, quality });
    setUrl('');
  };

  return (
    <section className="relative pt-28 md:pt-32 pb-14 md:pb-24">
      {/* Animated gradient background overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-b-[3rem]">
        <div className="absolute -top-40 -left-20 h-80 w-80 rounded-full bg-purple-500/40 blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-10 h-96 w-96 rounded-full bg-blue-500/40 blur-3xl animate-pulse" />
      </div>

      {/* Spline 3D Scene */}
      <div className="relative mx-auto w-[95%] md:w-11/12 lg:w-4/5 h-[420px] md:h-[520px] rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />

        {/* Floating headline and search box */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1020]/70 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-8 lg:p-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-sm">
              Download Spotify music in crystal-clear quality
            </h1>
            <p className="mt-3 md:mt-4 text-white/80 max-w-2xl">
              Lightning-fast downloads with ID3 tags, album artwork, and a privacy-first experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 md:mt-8 flex flex-col md:flex-row items-stretch gap-3">
            <div className="flex-1 rounded-2xl border border-white/20 bg-white/20 backdrop-blur-xl shadow-lg px-4 py-2.5 md:py-3 flex items-center gap-2">
              <Search className="text-white/80" size={18} />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste a Spotify track, album, or playlist URL"
                className="w-full bg-transparent outline-none text-white placeholder-white/60"
                required
              />
            </div>

            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="rounded-2xl border border-white/20 bg-white/20 backdrop-blur-xl text-white px-4 py-2.5 md:py-3 shadow-lg"
            >
              <option value="mp3_320">MP3 320kbps</option>
              <option value="mp3_192">MP3 192kbps</option>
              <option value="flac">FLAC</option>
              <option value="m4a">M4A</option>
            </select>

            <button
              type="submit"
              className="rounded-2xl bg-[#1DB954] px-6 py-3 font-semibold text-black shadow-[0_0_40px_rgba(29,185,84,0.6)] hover:shadow-[0_0_60px_rgba(29,185,84,0.8)] transition"
            >
              Download
            </button>
          </form>

          {/* Feature bullets */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-white/90">
            <Feature icon={<Zap size={18} />} label="Lightning Fast" />
            <Feature icon={<Tag size={18} />} label="ID3 Tags" />
            <Feature icon={<Music size={18} />} label="High Quality" />
            <Feature icon={<Shield size={18} />} label="Private & Secure" />
          </div>
        </div>
      </div>

      {/* Secondary feature grid and stats */}
      <div className="mx-auto mt-10 md:mt-14 w-[95%] md:w-11/12 lg:w-4/5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { icon: <Zap size={18} />, text: 'Lightning Fast' },
            { icon: <Globe size={18} />, text: 'Works Everywhere' },
            { icon: <Music size={18} />, text: 'High Quality' },
            { icon: <Tag size={18} />, text: 'ID3 Tags' },
            { icon: <Shield size={18} />, text: 'Private & Secure' },
            { icon: <Search size={18} />, text: 'Batch Downloads' },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 backdrop-blur-xl px-3 py-2 text-white/90">
              <div className="text-[#1DB954]">{f.icon}</div>
              <span className="text-sm">{f.text}</span>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Downloads', value: '1.2M+' },
            { label: 'Users', value: '340K+' },
            { label: 'Success Rate', value: '99.7%' },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl px-6 py-5 text-center text-white">
              <div className="text-3xl font-extrabold">{s.value}</div>
              <div className="text-white/70">{s.label}</div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-10 md:mt-14">
          <h2 className="text-white text-2xl md:text-3xl font-bold">How it works</h2>
          <ol className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              { step: '1', title: 'Paste your URL', desc: 'Copy a Spotify track, album, or playlist link.' },
              { step: '2', title: 'Choose quality', desc: 'Select MP3, FLAC, or M4A with ID3 tags.' },
              { step: '3', title: 'Download', desc: 'Click download and watch real-time progress.' },
            ].map((t, i) => (
              <li key={i} className="relative rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl p-5 text-white">
                <div className="absolute -top-3 -left-3 h-10 w-10 rounded-2xl bg-[#1DB954] text-black font-extrabold flex items-center justify-center shadow-lg">{t.step}</div>
                <div className="pl-1 mt-2">
                  <div className="text-xl font-semibold">{t.title}</div>
                  <p className="text-white/80 mt-1">{t.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, label }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-xl px-3 py-1.5 w-max">
      <span className="text-[#1DB954]">{icon}</span>
      <span className="text-white/90 text-sm">{label}</span>
    </div>
  );
}
