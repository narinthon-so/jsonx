
import { useState } from 'react';
import { Mail, Clipboard, Check } from 'lucide-react';

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const email = import.meta.env.VITE_CONTACT_EMAIL || 'zylonode.info@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="contact-section-container">
      <div className="glass-panel p-md rounded-lg" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', border: 'none' }}>
        
        <h2 className="text-center mb-2">
          <span className="gradient-text text-3xl font-bold" style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Get in Touch</span>
        </h2>
        
        <p className="text-subtle mb-6" style={{ width: '100%', margin: '0 auto 1.5rem auto' }}>
          Found a bug? Need a new feature? Or looking for custom contract work?
        </p>

        <div className="contact-actions">
          <a 
            href={`mailto:${email}`}
            className="primary-btn"
            style={{ textDecoration: 'none', justifyContent: 'center', minWidth: '160px' }}
          >
            <Mail size={20} />
            <span>Contact Me</span>
          </a>

          <button
            onClick={handleCopy}
            className="secondary-btn"
            style={{ minWidth: '220px', justifyContent: 'center' }}
          >
            {copied ? (
              <>
                <Check size={20} className="copy-feedback" />
                <span className="copy-feedback">Copied!</span>
              </>
            ) : (
              <>
                <Clipboard size={20} />
                <span style={{ fontFamily: 'monospace' }}>{email}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
