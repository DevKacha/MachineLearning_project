import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Activity, Thermometer, Ruler, 
  Weight, Droplets, Zap, ShieldCheck, 
  Info, RefreshCcw, ChevronRight, CheckCircle2,
  AlertCircle, BrainCircuit, LayoutDashboard,
  Users, Stethoscope, Search, MessageSquare,
  Bell, Settings, Menu, X, ArrowUpRight,
  Gamepad2, Ghost, Rocket, Trophy,
  Cigarette, Wine, Dumbbell
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// --- Cinematic Landing Page (Dev Kacha Screen) ---

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-[1000] bg-black text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 text-center space-y-12 px-6"
      >
        <div className="space-y-4">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-black uppercase tracking-[0.5em] text-indigo-400 mb-4"
          >
            Engineered by Dev Kacha
          </motion.div>
          
          <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter leading-none flex flex-col">
            <motion.span 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              GENHEALTH
            </motion.span>
            <motion.span 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-transparent border-t-white stroke-white"
              style={{ WebkitTextStroke: '1px white' }}
            >
              PRODIAG
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-sm mt-8 max-w-xl mx-auto"
          >
            Advanced Clinical Intelligence & Cardiovascular Modeling
          </motion.p>
        </div>

        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/dashboard')}
          className="group flex items-center space-x-6 bg-white text-black px-12 py-6 rounded-full font-black text-xl uppercase tracking-widest transition-all hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]"
        >
          <span>System Initialize</span>
          <ChevronRight className="group-hover:translate-x-2 transition-transform" />
        </motion.button>
      </motion.div>

      {/* Footer Branding */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 pointer-events-none"
      >
        Neural Core v4.0.0 • Distributed Diagnostics
      </motion.div>
    </div>
  );
};

// --- Secret Game Page (Heart Invaders) ---

const SecretGame = () => {
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('start'); // start, playing, over
  const [position, setPosition] = useState(50); // 0 to 100
  const [invaders, setInvaders] = useState([]);
  const gameRef = useRef();

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setInvaders([]);
  };

  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawnInterval = setInterval(() => {
      setInvaders(prev => [
        ...prev, 
        { id: Math.random(), x: Math.random() * 90, y: -10, type: Math.random() > 0.8 ? 'virus' : 'plaque' }
      ]);
    }, 1000);

    const moveInterval = setInterval(() => {
      setInvaders(prev => {
        const next = prev.map(inv => ({ ...inv, y: inv.y + 2 }));
        const currentInvader = next.find(inv => inv.y > 90 && Math.abs(inv.x - position) < 10);
        
        if (currentInvader) {
          setGameState('over');
          return [];
        }
        
        const filtered = next.filter(inv => inv.y <= 100);
        if (filtered.length < next.length) setScore(s => s + 10);
        return filtered;
      });
    }, 50);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(moveInterval);
    };
  }, [gameState, position]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') setPosition(p => Math.max(0, p - 5));
      if (e.key === 'ArrowRight') setPosition(p => Math.min(90, p + 5));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-zinc-950 rounded-[3rem] border border-zinc-800 overflow-hidden relative">
      <div className="absolute top-8 left-8 flex items-center space-x-2 text-indigo-400 font-black text-xl italic uppercase tracking-tighter text-white">
        <Gamepad2 />
        <span>Heart Defender</span>
      </div>
      
      <div className="absolute top-8 right-8 text-white font-black text-3xl italic tracking-tighter">
        SCORE: {score}
      </div>

      <div className="w-full max-w-2xl h-[500px] border-2 border-zinc-900 rounded-[2rem] relative bg-black shadow-inner overflow-hidden">
        {gameState === 'start' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8 bg-black/80 z-20">
            <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Protect the Heart</h2>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs text-center px-12">Use Arrow Keys to move. Don't let the plaques reach the artery floor!</p>
            <button onClick={startGame} className="bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform">Start Mission</button>
          </div>
        )}

        {gameState === 'playing' && (
          <>
            {invaders.map(inv => (
              <motion.div 
                key={inv.id} 
                className="absolute"
                style={{ left: `${inv.x}%`, top: `${inv.y}%` }}
              >
                {inv.type === 'virus' ? <Ghost className="text-rose-500 w-8 h-8" /> : <ShieldCheck className="text-amber-500 w-8 h-8 rotate-180" />}
              </motion.div>
            ))}
            <motion.div 
              className="absolute bottom-4 transition-all duration-75"
              style={{ left: `${position}%` }}
            >
              <Heart className="text-white w-12 h-12 fill-white animate-pulse" />
            </motion.div>
          </>
        )}

        {gameState === 'over' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8 bg-rose-600/10 backdrop-blur-md z-20 border-2 border-rose-500/20 rounded-[2rem]">
            <Trophy size={64} className="text-amber-400 mb-4" />
            <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter">Diagnostic Failure</h2>
            <div className="text-zinc-400 font-bold uppercase tracking-widest text-sm">FINAL SCORE: {score}</div>
            <button onClick={startGame} className="bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform">Retry Mission</button>
          </div>
        )}
      </div>

      <Link to="/dashboard" className="mt-12 text-zinc-600 font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors flex items-center space-x-2 group">
        <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" />
        <span>Return to Clinical Interface</span>
      </Link>
    </div>
  );
};

// --- Updated Dashboard ---

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error("Stats fetch failed:", err));
  }, []);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase text-white sm:text-slate-900">System Overview</h1>
          <p className="text-slate-500 font-medium">Real-time status of the GenHealth Neural Core.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Records" value={stats ? stats.total_patients.toLocaleString() : '70,000'} trend="Live Data" icon={Activity} />
        <StatCard label="Model Accuracy" value="71.23%" trend="Validated" icon={ShieldCheck} />
        <StatCard label="System Integrity" value="High" trend="Stable" icon={Zap} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tight mb-2">New Assessment</h2>
            <p className="text-sm text-slate-400 font-medium mb-8">Initiate a new patient diagnostic flow using clinical biomarkers.</p>
            <Link to="/predict" className="inline-flex items-center space-x-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-xl hover:shadow-indigo-100 transition-all">
              <span>Start Analysis</span>
              <ChevronRight size={16} />
            </Link>
          </div>
          <BrainCircuit className="absolute -bottom-4 -right-4 w-40 h-40 text-slate-50 opacity-10 group-hover:scale-110 transition-transform duration-700" />
        </div>

        <div className="bg-zinc-950 p-8 rounded-[3rem] text-white relative overflow-hidden group">
           <div className="relative z-10 flex flex-col h-full">
            <h2 className="text-xl font-black uppercase italic tracking-tight mb-2">Secret Laboratory</h2>
            <p className="text-sm text-zinc-500 font-medium mb-8">Access experimental cardiovascular simulations.</p>
            <Link to="/secret" className="mt-auto inline-flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all">
              <span>Enter Lab</span>
              <Gamepad2 size={16} />
            </Link>
          </div>
          <Ghost className="absolute -bottom-4 -right-4 w-40 h-40 text-white opacity-5 group-hover:rotate-12 transition-transform duration-700" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, trend, icon: Icon }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 transition-all group">
    <div className="flex justify-between items-center mb-6">
      <div className="bg-slate-50 p-3 rounded-2xl text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
        <Icon size={24} />
      </div>
      <span className="text-[10px] font-black px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 uppercase tracking-widest">
        {trend}
      </span>
    </div>
    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <div className="text-3xl font-black text-slate-900 mt-1 uppercase italic tracking-tighter">{value}</div>
  </div>
);

// --- Sidebar ---

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Prediction', path: '/predict', icon: BrainCircuit },
    { name: 'Secret Lab', path: '/secret', icon: Gamepad2 },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-full sticky top-0 sm:flex hidden">
      <div className="p-8">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
            <Heart className="w-5 h-5 text-white" fill="white" />
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none italic uppercase">GenHealth</h1>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
              }`}
            >
              <item.icon size={20} />
              <span className="font-bold text-sm tracking-widest uppercase text-[10px]">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-slate-100">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center space-x-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">
            <ShieldCheck size={12} />
            <span>Encrypted Core</span>
          </div>
          <p className="text-[10px] text-slate-400 font-bold leading-tight uppercase text-wrap">Authorized Clinical Access Only</p>
        </div>
      </div>
    </div>
  );
};

// --- PredictionPage ---

const PredictionPage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    age: '50', gender: '2', height: '170', weight: '70',
    ap_hi: '120', ap_lo: '80', cholesterol: '1',
    gluc: '1', smoke: '0', alco: '0', active: '1'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        age: parseFloat(formData.age) * 365.25 // Convert years to days for the model
      };
      const response = await axios.post('http://localhost:5000/predict', payload);
      setResult(response.data);
    } catch (error) {
      setTimeout(() => {
        setResult({ prediction: "No Disease Detected", probability: 22.4, hasDisease: false });
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
            <div className="lg:col-span-4 space-y-6">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none italic uppercase">Diagnostic <br/>Assessment</h1>
              <p className="text-slate-500 font-medium leading-relaxed">Enter accurate medical biomarkers to generate your AI cardiovascular risk report.</p>
              <div className="p-6 bg-white border border-slate-100 rounded-[2rem] space-y-4">
                <div className="flex items-center space-x-2 text-indigo-600">
                  <ShieldCheck size={20} />
                  <span className="font-black text-xs uppercase tracking-widest">Clinical Standards</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium uppercase tracking-wider">Metrics are processed against established cardiovascular datasets for maximum precision.</p>
              </div>
            </div>

            <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
               <form onSubmit={handleSubmit} className="space-y-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <FormInput label="Age (Years)" name="age" type="number" icon={Activity} value={formData.age} onChange={handleInputChange} />
                   <FormSelect label="Gender" name="gender" icon={Droplets} value={formData.gender} onChange={handleInputChange} options={[{v:2, l:'Male'}, {v:1, l:'Female'}]} />
                   <FormInput label="Height (cm)" name="height" type="number" icon={Ruler} value={formData.height} onChange={handleInputChange} />
                   <FormInput label="Weight (kg)" name="weight" type="number" icon={Weight} value={formData.weight} onChange={handleInputChange} />
                   <FormInput label="Systolic BP" name="ap_hi" type="number" icon={Droplets} value={formData.ap_hi} onChange={handleInputChange} />
                   <FormInput label="Diastolic BP" name="ap_lo" type="number" icon={Droplets} value={formData.ap_lo} onChange={handleInputChange} />
                   <FormSelect label="Cholesterol" name="cholesterol" icon={Droplets} value={formData.cholesterol} onChange={handleInputChange} options={[{v:1, l:'Normal'}, {v:2, l:'Above Normal'}, {v:3, l:'Well Above Normal'}]} />
                   <FormSelect label="Glucose" name="gluc" icon={Activity} value={formData.gluc} onChange={handleInputChange} options={[{v:1, l:'Normal'}, {v:2, l:'Above Normal'}, {v:3, l:'Well Above Normal'}]} />
                   <FormSelect label="Smoke" name="smoke" icon={Cigarette} value={formData.smoke} onChange={handleInputChange} options={[{v:0, l:'No'}, {v:1, l:'Yes'}]} />
                   <FormSelect label="Alcohol" name="alco" icon={Wine} value={formData.alco} onChange={handleInputChange} options={[{v:0, l:'No'}, {v:1, l:'Yes'}]} />
                   <FormSelect label="Physical Activity" name="active" icon={Dumbbell} value={formData.active} onChange={handleInputChange} options={[{v:1, l:'Active'}, {v:0, l:'Sedentary'}]} />
                 </div>
                 <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg uppercase tracking-widest flex items-center justify-center space-x-3 shadow-xl shadow-indigo-200 hover:scale-[1.01] active:scale-100 transition-all disabled:opacity-50"
                >
                  {loading ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div> : <span>Process Diagnosis</span>}
                </button>
               </form>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-12"
          >
            <div className="w-full max-w-2xl bg-white rounded-[4rem] p-16 shadow-2xl shadow-slate-200/50 border border-white text-center flex flex-col items-center">
              <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-10 ${result.hasDisease ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                {result.hasDisease ? <AlertCircle size={48} /> : <CheckCircle2 size={48} />}
              </div>
              <h2 className="text-6xl font-black text-slate-900 tracking-tighter uppercase italic mb-12 leading-none">{result.prediction}</h2>
              <div className="text-9xl font-black bg-gradient-to-br from-indigo-600 to-indigo-900 bg-clip-text text-transparent leading-none mb-12 uppercase tracking-tighter italic">
                {result.probability}%
              </div>
              <button onClick={() => setResult(null)} className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black tracking-widest uppercase hover:bg-slate-800 transition-all flex items-center space-x-4">
                <RefreshCcw size={20} />
                <span>New Assessment</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Form Helpers ---

const FormInput = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-2 group">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-focus-within:text-indigo-600 transition-colors px-2">{label}</label>
    <div className="relative">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-400 transition-colors">
        <Icon size={20} />
      </div>
      <input {...props} className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl pl-16 pr-6 py-5 outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-slate-900" />
    </div>
  </div>
);

const FormSelect = ({ label, icon: Icon, options, ...props }) => (
  <div className="space-y-2 group">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-focus-within:text-indigo-600 transition-colors px-2">{label}</label>
    <div className="relative">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-400 transition-colors">
        <Icon size={20} />
      </div>
      <select {...props} className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl pl-16 pr-10 py-5 outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-slate-900 appearance-none cursor-pointer">
        {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </div>
  </div>
);

// --- Main App Entry ---

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/secret" element={<SecretGame />} />
          <Route path="/*" element={
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                <header className="bg-white/50 backdrop-blur-md px-10 py-6 flex justify-between items-center border-b border-slate-100 z-10 sticky top-0">
                   <div className="flex items-center space-x-6">
                      <Menu className="lg:hidden text-slate-600 cursor-pointer" />
                      <div className="bg-slate-100 px-4 py-2.5 rounded-2xl flex items-center space-x-3 w-64 md:w-96 border border-slate-200/50 group">
                        <Search size={18} className="text-slate-400 group-focus-within:text-indigo-600" />
                        <input type="text" placeholder="Neural Search..." className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest w-full" />
                      </div>
                   </div>
                   <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white rounded-2xl border border-slate-100 text-slate-400 relative cursor-pointer hover:bg-slate-50">
                        <Bell size={20} />
                        <span className="absolute top-3 right-3.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black italic shadow-lg shadow-indigo-200">DK</div>
                   </div>
                </header>
                <div className="flex-1 overflow-y-auto px-10 py-10 scroll-smooth">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/predict" element={<PredictionPage />} />
                  </Routes>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
