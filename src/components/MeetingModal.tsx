"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";

export default function MeetingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formValues, setFormValues] = useState({ name: '', email: '', phone: '', preferredTime: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.name || !formValues.email || !formValues.preferredTime) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          <motion.div 
            initial={{ scale: 0.95, y: 20 }} 
            animate={{ scale: 1, y: 0 }} 
            exit={{ scale: 0.95, y: 20 }}
            className="bg-[#0f0f0f] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden relative"
          >
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-white/60" />
                <h2 className="text-2xl font-light tracking-wide text-white">Schedule Meeting</h2>
              </div>
              
              {status === 'success' ? (
                <div className="py-12 text-center text-green-400 font-light tracking-wide">
                  Meeting request sent successfully.<br/>Our team will be in touch shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm text-white/50 uppercase tracking-widest mb-2">Name</label>
                    <input 
                      required
                      type="text" 
                      value={formValues.name}
                      onChange={e => setFormValues({...formValues, name: e.target.value})}
                      className="w-full bg-black border border-white/10 p-3 rounded text-white focus:outline-none focus:border-white/50" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/50 uppercase tracking-widest mb-2">Email</label>
                    <input 
                      required
                      type="email" 
                      value={formValues.email}
                      onChange={e => setFormValues({...formValues, email: e.target.value})}
                      className="w-full bg-black border border-white/10 p-3 rounded text-white focus:outline-none focus:border-white/50" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/50 uppercase tracking-widest mb-2">Phone (Optional)</label>
                    <input 
                      type="tel" 
                      value={formValues.phone}
                      onChange={e => setFormValues({...formValues, phone: e.target.value})}
                      className="w-full bg-black border border-white/10 p-3 rounded text-white focus:outline-none focus:border-white/50" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/50 uppercase tracking-widest mb-2">Preferred Time / Date</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Next Tuesday at 2pm EST"
                      value={formValues.preferredTime}
                      onChange={e => setFormValues({...formValues, preferredTime: e.target.value})}
                      className="w-full bg-black border border-white/10 p-3 rounded text-white focus:outline-none focus:border-white/50" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/50 uppercase tracking-widest mb-2">Topic (Optional)</label>
                    <textarea 
                      value={formValues.message}
                      onChange={e => setFormValues({...formValues, message: e.target.value})}
                      className="w-full bg-black border border-white/10 p-3 rounded text-white focus:outline-none focus:border-white/50 resize-none h-24" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-white text-black font-medium tracking-wide rounded hover:bg-white/90 disabled:opacity-50 transition-colors"
                  >
                    {status === 'loading' ? 'Sending...' : 'Request Meeting'}
                  </button>
                  {status === 'error' && <p className="text-red-500 text-sm mt-2">Error sending request.</p>}
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
