import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { mockMemberDashboardByEmail } from '../../data/mockData';

interface HistoryProps {
  onBack: () => void;
  userEmail: string;
}

const History: React.FC<HistoryProps> = ({ onBack, userEmail }) => {
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');
  
  const data = mockMemberDashboardByEmail(userEmail);
  const user = data.member;

  // Get all contributions sorted by date (newest first)
  const sortedContributions = [...data.contributions].sort((a, b) => {
    const dateA = new Date(`${a.month} 1, ${a.year}`);
    const dateB = new Date(`${b.month} 1, ${b.year}`);
    return dateB.getTime() - dateA.getTime();
  });

  // Get all penalties
  const sortedPenalties = [...data.penalties].sort((a, b) => {
    const dateA = new Date(`${a.month} 1, ${a.year}`);
    const dateB = new Date(`${b.month} 1, ${b.year}`);
    return dateB.getTime() - dateA.getTime();
  });

  // Format date for display
  const formatDate = (month: string, year: number) => {
    const date = new Date(`${month} 1, ${year}`);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Status badge component
  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const statusMap: Record<string, { bg: string; text: string; border: string; dot: string; label: string }> = {
      approved: {
        bg: 'bg-[#edf7f1]',
        text: 'text-[#287d51]',
        border: 'border-[#d3ecd9]',
        dot: 'bg-[#287d51]',
        label: 'Approved'
      },
      pending: {
        bg: 'bg-[#fdf2e2]',
        text: 'text-[#c07d24]',
        border: 'border-[#f3dfc1]',
        dot: 'bg-[#c07d24]',
        label: 'Pending'
      },
      rejected: {
        bg: 'bg-[#fbeae5]',
        text: 'text-[#b04724]',
        border: 'border-[#f4cfc4]',
        dot: 'bg-[#b04724]',
        label: 'Rejected'
      },
      paid: {
        bg: 'bg-[#edf7f1]',
        text: 'text-[#287d51]',
        border: 'border-[#d3ecd9]',
        dot: 'bg-[#287d51]',
        label: 'Paid'
      },
      unpaid: {
        bg: 'bg-[#fbeae5]',
        text: 'text-[#b04724]',
        border: 'border-[#f4cfc4]',
        dot: 'bg-[#b04724]',
        label: 'Unpaid'
      },
    };

    const config = statusMap[status.toLowerCase()] || statusMap.pending;
    
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold ${config.bg} ${config.text} rounded-full border ${config.border}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
        {config.label}
      </span>
    );
  };

  // Filter contributions
  const filteredContributions = sortedContributions.filter(contrib => {
    if (filter === 'all') return true;
    if (filter === 'approved') return contrib.paid === true;
    if (filter === 'pending') return contrib.paid === false;
    return true;
  });

  return (
    <div className="bg-[#ece7e1] p-4 md:p-8 min-h-screen text-[#3a3530]">
      <div className="max-w-6xl mx-auto bg-[#fbf9f6] rounded-3xl shadow-sm p-6 md:p-10 border border-[#e2ded9]">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#eeeae4] pb-6 mb-8">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg transition">
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div className="w-12 h-12 bg-[#1b5e3e] text-[#fbf9f6] rounded-xl flex items-center justify-center font-bold text-lg">
              IK
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#111]">IKIMINA</h1>
              <p className="text-[10px] uppercase tracking-widest text-[#7c756e] font-semibold">Gents • Investment</p>
            </div>
          </div>

          <nav className="flex items-center gap-2 bg-transparent">
            <button onClick={onBack} className="px-4 py-2 text-sm font-medium text-[#7c756e] hover:text-[#111] transition-colors">Dashboard</button>
            <button onClick={onBack} className="px-4 py-2 text-sm font-medium text-[#7c756e] hover:text-[#111] transition-colors">Contribute</button>
            <button className="px-4 py-2 text-sm font-semibold bg-[#e6eee9] text-[#1b5e3e] rounded-full px-5">History</button>
          </nav>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="text-right">
              <p className="text-sm font-bold text-[#111]">{user.name || 'User'}</p>
              <p className="text-xs text-[#7c756e]">Member • #{user.id || '000'}</p>
            </div>
            <div className="w-10 h-10 bg-[#b95d38] text-white font-semibold rounded-full flex items-center justify-center text-sm">
              {user.name ? user.name.split(' ').map((n: string) => n[0]).join('') : 'U'}
            </div>
          </div>
        </header>

        {/* Transactions Section */}
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#111] mb-1">My transactions & penalties</h2>
              <p className="text-sm text-[#7c756e]">Every record you've submitted, and every penalty on your account.</p>
            </div>
            <div className="flex bg-[#f5f2ed] p-1 rounded-xl self-start sm:self-auto">
              <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-xs font-bold rounded-lg shadow-sm transition ${
                  filter === 'all' 
                    ? 'bg-[#1e1c1a] text-white' 
                    : 'text-[#5c5650] hover:text-[#111]'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('approved')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  filter === 'approved' 
                    ? 'bg-[#1e1c1a] text-white' 
                    : 'text-[#5c5650] hover:text-[#111]'
                }`}
              >
                Approved
              </button>
              <button 
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  filter === 'pending' 
                    ? 'bg-[#1e1c1a] text-white' 
                    : 'text-[#5c5650] hover:text-[#111]'
                }`}
              >
                Pending
              </button>
            </div>
          </div>

          <div className="overflow-x-auto bg-[#faf8f4] border border-[#eeeae4] rounded-2xl">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#f3ede4] text-[11px] font-bold uppercase tracking-wider text-[#7a7269] border-b border-[#e2ded9]">
                  <th className="py-3 px-5">Date</th>
                  <th className="py-3 px-5">Type</th>
                  <th className="py-3 px-5">Amount</th>
                  <th className="py-3 px-5">Months</th>
                  <th className="py-3 px-5">Penalty</th>
                  <th className="py-3 px-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eeeae4] text-sm font-medium">
                {filteredContributions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#7c756e]">
                      No contributions found
                    </td>
                  </tr>
                ) : (
                  filteredContributions.map((contrib, idx) => {
                    const status = contrib.paid ? 'approved' : 'pending';
                    const monthRange = `${contrib.month} ${contrib.year}`;
                    const penaltyAmount = contrib.paid ? '—' : '2,000';
                    const isPenalty = penaltyAmount !== '—';
                    
                    return (
                      <tr key={idx} className="hover:bg-[#f6f2eb] transition-colors">
                        <td className="py-4 px-5 text-[#5c5650]">{formatDate(contrib.month, contrib.year)}</td>
                        <td className="py-4 px-5 font-bold text-[#111]">Contribution</td>
                        <td className="py-4 px-5 font-bold text-[#111]">{contrib.amount.toLocaleString()}</td>
                        <td className="py-4 px-5 text-[#5c5650]">{monthRange}</td>
                        <td className={`py-4 px-5 font-bold ${isPenalty ? 'text-[#b04724]' : 'text-[#b0aba4]'}`}>
                          {penaltyAmount}
                        </td>
                        <td className="py-4 px-5">
                          <StatusBadge status={status} />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Penalties Section */}
        <section>
          <h3 className="text-lg font-bold text-[#111] mb-4">Penalties</h3>
          
          <div className="overflow-x-auto bg-[#faf8f4] border border-[#eeeae4] rounded-2xl">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#f3ede4] text-[11px] font-bold uppercase tracking-wider text-[#7a7269] border-b border-[#e2ded9]">
                  <th className="py-3 px-5">Period</th>
                  <th className="py-3 px-5">Reason</th>
                  <th className="py-3 px-5">Amount</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5">Generated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eeeae4] text-sm font-medium">
                {sortedPenalties.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-[#7c756e]">
                      No penalties found
                    </td>
                  </tr>
                ) : (
                  sortedPenalties.map((penalty, idx) => {
                    const status = penalty.paid ? 'paid' : 'unpaid';
                    const reason = 'Missed contribution';
                    
                    return (
                      <tr key={idx} className="hover:bg-[#f6f2eb] transition-colors">
                        <td className="py-4 px-5 font-bold text-[#111]">{penalty.month} {penalty.year}</td>
                        <td className="py-4 px-5 text-[#7c756e] font-normal">{reason}</td>
                        <td className="py-4 px-5 font-bold text-[#111]">{penalty.amount.toLocaleString()}</td>
                        <td className="py-4 px-5">
                          <StatusBadge status={status} />
                        </td>
                        <td className="py-4 px-5 text-[#7c756e]">
                          {formatDate(penalty.month, penalty.year)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
};

export default History;