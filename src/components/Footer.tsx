import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-24 bg-[#0a0a0a] border-t border-white/5 pb-12 relative z-10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Ready to Amplify Your Brand?
            </h2>
            <p className="text-gray-400 mb-8 max-w-md">
              Stop losing customers to terrible websites and boring content. Let&apos;s build something world-class.
            </p>
            <Link href="/contact" className="inline-block px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
              Start Your Project Now
            </Link>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Navigation</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing & Plans</Link></li>
              <li><Link href="/testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Connect</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <Link href="/">
              {/* Bolt ⚡: Swapped raw img for next/image for automatic optimization, faster LCP, and reduced bandwidth */}
              <Image
                src="/logo.png"
                alt="AmplifyCO Logo"
                width={40}
                height={40}
                className="h-10 w-auto object-cover rounded-xl grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all shadow-[0_0_10px_rgba(255,255,255,0.05)] cursor-pointer"
              />
            </Link>
            <p>AmplifyCO.digital © 2026. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-white transition-colors">Company</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
