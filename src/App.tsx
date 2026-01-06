import { useState } from 'react';
import { Header } from './components/Header';
import { Editor } from './components/Editor';
import { OutputViewer } from './components/OutputViewer';
import { formatJson, minifyJson, loadSample } from './utils/json';
import { Play, Minimize2, Trash2, FileJson } from 'lucide-react';
import './index.css';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    if (!input.trim()) return;
    try {
      const formatted = formatJson(input);
      setOutput(formatted);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      const minified = minifyJson(input);
      setOutput(minified);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleLoadSample = () => {
    const sample = loadSample();
    setInput(sample);
    setOutput('');
    setError(null);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  // Auto-validate on input change? Maybe too aggressive for large JSON. 
  // Let's just clear error on change.
  const handleInputChange = (val: string) => {
    setInput(val);
    if (error) setError(null);
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        
        {/* Actions Toolbar */}
        <div className="glass glass-panel">
          <button onClick={handleFormat} className="primary-btn">
            <Play size={18} /> Format
          </button>
          <button onClick={handleMinify} className="primary-btn" style={{ background: 'var(--text-color)', opacity: 0.8 }}>
            <Minimize2 size={18} /> Minify
          </button>
          <div style={{ flex: 1 }}></div>
          <button onClick={handleLoadSample} className="icon-btn" title="Load Sample">
            <FileJson size={20} />
          </button>
          <button onClick={handleClear} className="icon-btn" title="Clear All" style={{ color: 'var(--error-color)' }}>
            <Trash2 size={20} />
          </button>
        </div>

        {/* Editors Grid */}
        <div className="grid-cols">
          <Editor 
            label="Input JSON" 
            value={input} 
            onChange={handleInputChange} 
            error={error} 
            placeholder="Paste your JSON here..."
          />
          <OutputViewer 
            value={output} 
            placeholder="Result will appear here..."
          />
        </div>

      </main>
      
      <footer className="p-md text-sm opacity-50" style={{ textAlign: 'center' }}>
        <p>Progressive Web App • Built with React & Vite</p>
      </footer>
    </div>
  );
}

export default App;
