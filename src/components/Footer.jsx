import { Github, Twitter, Mail, Shield, HelpCircle, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16">
      <div className="mx-auto w-[95%] md:w-11/12 lg:w-4/5 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-8 text-white">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="text-xl font-bold">SpotifyDL</div>
            <p className="text-white/70 mt-2">Modern, privacy-first Spotify music downloader.</p>
            <div className="flex gap-3 mt-4">
              <a className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" href="#" aria-label="GitHub"><Github size={18} /></a>
              <a className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" href="#" aria-label="Twitter"><Twitter size={18} /></a>
              <a className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" href="#" aria-label="Email"><Mail size={18} /></a>
            </div>
          </div>

          <div>
            <div className="font-semibold mb-3">Product</div>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Changelog</a></li>
              <li><a href="#" className="hover:text-white">Roadmap</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-3">Support</div>
            <ul className="space-y-2 text-white/80">
              <li className="inline-flex items-center gap-2"><HelpCircle size={16} /> <a href="#" className="hover:text-white">Help Center</a></li>
              <li className="inline-flex items-center gap-2"><Mail size={16} /> <a href="#" className="hover:text-white">Contact</a></li>
              <li className="inline-flex items-center gap-2"><Shield size={16} /> <a href="#" className="hover:text-white">Security</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-3">Legal</div>
            <ul className="space-y-2 text-white/80">
              <li className="inline-flex items-center gap-2"><FileText size={16} /> <a href="#" className="hover:text-white">Terms</a></li>
              <li className="inline-flex items-center gap-2"><Shield size={16} /> <a href="#" className="hover:text-white">Privacy</a></li>
              <li className="inline-flex items-center gap-2"><FileText size={16} /> <a href="#" className="hover:text-white">Licenses</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-4 text-sm text-white/70 flex flex-col md:flex-row items-center justify-between">
          <p>© {new Date().getFullYear()} SpotifyDL. All rights reserved.</p>
          <p>Built with love for music.</p>
        </div>
      </div>
    </footer>
  );
}
