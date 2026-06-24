import React, { useState } from 'react';
import { mockMemberDashboardByEmail } from '../../data/mockData';
import { Plus } from 'lucide-react';
import Contribute from './Contribute';
import History from './History';

interface DashboardProps {
  onLogout: () => void;
  userEmail: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, userEmail }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showContribute, setShowContribute] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  const data = mockMemberDashboardByEmail(userEmail);
  const user = data.member;

  // Show Contribute page if clicked
  if (showContribute) {
    return <Contribute onBack={() => setShowContribute(false)} />;
  }

  // Show History page if clicked
  if (showHistory) {
    return <History onBack={() => setShowHistory(false)} userEmail={userEmail} />;
  }

  const totalPenaltyGenerated = data.penalties.reduce((sum, p) => sum + p.amount, 0);
  const totalPenaltyPaid = data.penalties.filter(p => p.paid).reduce((sum, p) => sum + p.amount, 0);
  const totalPenaltyUnpaid = data.penalties.filter(p => !p.paid).reduce((sum, p) => sum + p.amount, 0);

  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const chartData = months.map((month) => {
    const isMissed = data.missingMonths.some(m => m.month === month && m.year === 2026);
    let height: number;
    if (isMissed) {
      height = 8 + Math.random() * 10;
    } else {
      height = 50 + Math.random() * 50;
    }
    return { height, paid: !isMissed };
  });

  return (
    <div className="min-h-screen bg-[#F4F1EA] p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-[#FAF8F5] rounded-3xl shadow-sm border border-stone-200/60 overflow-hidden">
        
        <header className="flex flex-col sm:flex-row items-center justify-between px-8 py-6 border-b border-stone-200/60 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#23533E] text-white font-bold flex items-center justify-center rounded-xl text-sm">IK</div>
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-wide text-[#23533E]">IKIMINA</h1>
              <p className="text-xs text-[#706E6B] tracking-wider font-medium">GENTS · INVESTMENT</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-2">
            <button onClick={() => setActiveTab('dashboard')} className={`px-5 py-2 font-semibold rounded-xl text-sm transition ${activeTab === 'dashboard' ? 'bg-[#E6F0EB] text-[#23533E]' : 'text-[#706E6B] hover:text-[#1E1E1E]'}`}>
              Dashboard
            </button>
            <button onClick={() => setShowContribute(true)} className={`px-5 py-2 font-medium rounded-xl text-sm transition ${activeTab === 'contribute' ? 'bg-[#E6F0EB] text-[#23533E]' : 'text-[#706E6B] hover:text-[#1E1E1E]'}`}>
              Contribute
            </button>
            <button onClick={() => setShowHistory(true)} className={`px-5 py-2 font-medium rounded-xl text-sm transition ${activeTab === 'history' ? 'bg-[#E6F0EB] text-[#23533E]' : 'text-[#706E6B] hover:text-[#1E1E1E]'}`}>
              History
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={onLogout} className="text-xs text-[#706E6B] hover:text-[#9E4A28] transition font-medium">Logout</button>
            <div className="w-10 h-10 bg-[#9E4A28] text-white font-bold flex items-center justify-center rounded-full text-sm">
              {user.name ? user.name.split(' ').map((n: string) => n[0]).join('') : 'U'}
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-sm">{user.name || 'User'}</h4>
              <p className="text-xs text-[#706E6B]">Member · #{user.id || '000'}</p>
            </div>
          </div>
        </header>

        <main className="p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user.name ? user.name.split(' ')[0] : 'User'}</h2>
              <p className="text-[#706E6B] text-sm mt-1">Your savings standing as of 23 June 2026.</p>
            </div>
            <button onClick={() => setShowContribute(true)} className="bg-[#23533E] hover:bg-opacity-90 text-white font-semibold px-5 py-3 rounded-xl text-sm flex items-center gap-2 shadow-sm transition">
              <Plus className="w-4 h-4" /> Record a contribution
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200/50 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-bold tracking-wider text-[#706E6B] uppercase">Total Shares</span>
              <div className="mt-4">
                <span className="text-4xl font-bold">{data.totalShares}</span>
                <p className="text-xs text-[#706E6B] mt-1">of {data.totalMonths} months · since Jan 2025</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200/50 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-bold tracking-wider text-[#706E6B] uppercase">Total Contributed</span>
              <div className="mt-4">
                <span className="text-4xl font-bold">{data.totalContributed.toLocaleString()}</span> <span className="text-sm font-semibold text-[#706E6B]">RWF</span>
                <p className="text-xs text-[#706E6B] mt-1">{data.totalShares} shares × 20,000</p>
              </div>
            </div>
            <div className="bg-[#FFF2EC] p-5 rounded-2xl border border-orange-200/40 flex flex-col justify-between">
              <span className="text-xs font-bold tracking-wider text-[#9E4A28] uppercase">Unpaid Penalty</span>
              <div className="mt-4">
                <span className="text-4xl font-bold text-[#9E4A28]">{data.unpaidPenalty.toLocaleString()}</span> <span className="text-sm font-semibold text-[#9E4A28]">RWF</span>
                <p className="text-xs text-[#9E4A28] opacity-80 mt-1">{data.missingMonths.length} penalties outstanding</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200/50 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-bold tracking-wider text-[#706E6B] uppercase">Missing Months</span>
              <div className="mt-4">
                <span className="text-4xl font-bold">{data.missingMonths.length}</span>
                <p className="text-xs text-[#706E6B] mt-1">{data.missingMonths.map(m => `${m.month} ${m.year}`).join(' · ')}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-stone-200/50 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-base">Contributions over time</h3>
                <span className="text-xs text-[#706E6B]">Last 12 months · RWF</span>
              </div>
              <div className="h-48 flex items-end justify-between gap-2 px-2 pt-4">
                {months.map((month, i) => {
                  const isMissed = !chartData[i].paid;
                  const height = chartData[i].height;
                  return (
                    <div key={i} className="flex flex-col items-center flex-1 group">
                      <div className={`w-full rounded-sm transition-all ${isMissed ? 'bg-orange-200' : 'bg-[#23533E]'}`} style={{ height: `${height}px` }} />
                      <span className={`text-xs mt-2 ${isMissed ? 'text-[#9E4A28] font-medium' : 'text-[#706E6B]'}`}>{month}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-stone-100 text-xs">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-[#23533E]"></span><span className="text-[#706E6B] font-medium">Paid</span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-orange-200"></span><span className="text-[#706E6B] font-medium">Missed month</span></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200/50 shadow-sm flex flex-col justify-between">
              <h3 className="font-bold text-base mb-4">Penalty summary</h3>
              <div className="space-y-4 flex-1 flex flex-col justify-center">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-1"><span className="text-[#706E6B]">Generated</span><span className="font-bold">{totalPenaltyGenerated.toLocaleString()} RWF</span></div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden"><div className="bg-stone-400 h-full w-full rounded-full"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-medium mb-1"><span className="text-[#706E6B]">Paid</span><span className="font-bold text-emerald-700">{totalPenaltyPaid.toLocaleString()} RWF</span></div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden"><div className="bg-emerald-700 h-full rounded-full" style={{ width: `${totalPenaltyGenerated > 0 ? (totalPenaltyPaid / totalPenaltyGenerated) * 100 : 0}%` }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-medium mb-1"><span className="text-[#706E6B]">Unpaid</span><span className="font-bold text-[#9E4A28]">{totalPenaltyUnpaid.toLocaleString()} RWF</span></div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden"><div className="bg-[#9E4A28] h-full rounded-full" style={{ width: `${totalPenaltyGenerated > 0 ? (totalPenaltyUnpaid / totalPenaltyGenerated) * 100 : 0}%` }}></div></div>
                </div>
              </div>
              <button className="w-full mt-6 bg-[#FFF2EC] hover:bg-opacity-80 text-[#9E4A28] font-bold py-3 rounded-xl text-sm transition tracking-wide">Settle penalty</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200/50 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center">
              <h3 className="font-bold text-base">Months to catch up</h3>
              <span className="text-xs text-[#706E6B] font-medium">Allocated oldest-first</span>
            </div>
            <div className="divide-y divide-stone-100">
              {data.missingMonths.map((missing, idx) => {
                const month = missing.month.toUpperCase();
                return (
                  <div key={idx} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FFF2EC] flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] font-bold text-[#9E4A28] tracking-wider uppercase leading-none">{month}</span>
                        <span className="text-base font-bold text-[#9E4A28] leading-tight">{missing.year}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{month} {missing.year}</h4>
                        <p className="text-xs text-[#706E6B] mt-0.5">Overdue since 7 {month} · penalty applied</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="font-bold text-sm text-[#1E1E1E]">20,000 <span className="text-[#9E4A28] font-medium">+ 2,000</span></span>
                      <button className="bg-[#E6F0EB] hover:bg-opacity-80 text-[#23533E] font-bold px-4 py-2 rounded-lg text-xs transition">Pay now</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;