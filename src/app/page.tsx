import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import GlobalImpact from "@/components/GlobalImpact";
import PremiumShowcase from "@/components/PremiumShowcase";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <GlobalImpact />
      <PremiumShowcase />
      
      {/* Footer CTA */}
      <footer className="py-24 bg-[#0a0a0a] border-t border-white/5 pb-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Ready to Amplify Your Brand?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Stop losing customers to terrible websites and boring content. Let&apos;s build something world-class.
          </p>
          <a href="/contact" className="inline-block px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
            Start Your Project Now
          </a>
          
          <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="AmplifyCO Logo" className="h-10 w-auto object-cover rounded-xl grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all shadow-[0_0_10px_rgba(255,255,255,0.05)]" />
              <p>AmplifyCO.digital © 2026. All rights reserved.</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
