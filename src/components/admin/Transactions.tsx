import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Filter, 
  LayoutDashboard, UserCheck, Users, CreditCard, 
  AlertTriangle, ArrowUpRight, Settings, LogOut,
  Download, Eye, ChevronDown, Plus, 
  TrendingUp, TrendingDown, Clock
} from 'lucide-react';

interface TransactionsProps {
  onBack: () => void;
  onNavigate: (page: 'overview' | 'approvals' | 'members' | 'transactions' | 'penalties' | 'withdrawals' | 'settings') => void;
  onLogout: () => void;
}

const Transactions: React.FC<TransactionsProps> = ({ onBack, onNavigate, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'contribution' | 'withdrawal'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const transactionsData = [
    { id: '1', date: '20 Jun 2026', member: 'Jean-Paul Habimana', initials: 'JH', type: 'Contribution', amount: 44000, detail: 'Apr–May 2026', status: 'Pending', isCredit: true },
    { id: '2', date: '19 Jun 2026', member: 'Olivier Niyonzima', initials: 'ON', type: 'Contribution', amount: 60000, detail: 'Jul–Sep 2026', status: 'Pending', isCredit: true },
    { id: '3', date: '15 Jun 2026', member: 'Samuel Gatera', initials: 'SG', type: 'Withdrawal', amount: 1000000, detail: 'Investment · land plot', status: 'Approved', isCredit: false },
    { id: '4', date: '05 Jun 2026', member: 'Eric Mugisha', initials: 'EM', type: 'Contribution', amount: 20000, detail: 'Jun 2026', status: 'Approved', isCredit: true },
    { id: '5', date: '04 Jun 2026', member: 'Aimé Ndayisenga', initials: 'AN', type: 'Contribution', amount: 20000, detail: 'Jun 2026', status: 'Approved', isCredit: true },
    { id: '6', date: '20 Mar 2026', member: 'Samuel Gatera', initials: 'SG', type: 'Withdrawal', amount: 500000, detail: 'Investment · poultry', status: 'Approved', isCredit: false },
    { id: '7', date: '02 Dec 2025', member: 'Eric Mugisha', initials: 'EM', type: 'Contribution', amount: 20000, detail: 'Oct 2025', status: 'Rejected', isCredit: true },
  ];

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', key: 'overview' },
    { icon: UserCheck, label: 'Approvals', key: 'approvals', badge: '4' },
    { icon: Users, label: 'Members', key: 'members' },
    { icon: CreditCard, label: 'Transactions', key: 'transactions', active: true },
    { icon: AlertTriangle, label: 'Penalties', key: 'penalties' },
    { icon: ArrowUpRight, label: 'Withdrawals', key: 'withdrawals' },
    { icon: Settings, label: 'Settings', key: 'settings' },
  ];

  // Calculate totals
  const totalContributions = transactionsData
    .filter(t => t.type === 'Contribution')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalWithdrawals = transactionsData
    .filter(t => t.type === 'Withdrawal')
    .reduce((sum, t) => sum + t.amount, 0);
  const pendingCount = transactionsData.filter(t => t.status === 'Pending').length;

  const filteredData = transactionsData.filter(item => {
    const matchesSearch = item.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.detail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type.toLowerCase() === filterType;
    const matchesStatus = filterStatus === 'all' || item.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      'Pending': 'bg-[#FEF9E6] text-[#B18817]',
      'Approved': 'bg-[#E5F4ED] text-[#1E724A]',
      'Rejected': 'bg-[#FCECE5] text-[#B94723]',
    };
    return styles[status as keyof typeof styles] || 'bg-[#F5F2EA] text-[#5C645E]';
  };

  return (
    <div className="bg-[#EFECE6] min-h-screen p-4 flex">
      <div className="w-full bg-[#FAF8F5] rounded-[24px] shadow-sm flex overflow-hidden border border-[#E4DFD3]">
        
        {/* Sidebar */}
        <aside className="w-64 bg-[#FAF8F5] flex flex-col justify-between p-6 shrink-0 select-none">
          <div>
            <div className="flex items-center gap-3 mb-8 pl-2">
              <button onClick={() => onNavigate('overview')} className="bg-[#23533C] text-[#FAF8F5] font-bold w-10 h-10 rounded-xl flex items-center justify-center text-sm hover:opacity-90 transition">
                IK
              </button>
              <div>
                <h2 className="font-bold text-base tracking-tight text-[#112318] leading-none">IKIMINA</h2>
                <p className="text-[10px] uppercase tracking-wider text-[#7A827C] font-semibold mt-1">TREASURER CONSOLE</p>
              </div>
            </div>

            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => item.key === 'transactions' ? null : onNavigate(item.key as any)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[14px] transition ${
                    item.active 
                      ? 'bg-[#E6EFEA] text-[#23533C] font-semibold' 
                      : 'text-[#5C645E] hover:bg-[#F2EDE2] font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-[18px] h-[18px]" strokeWidth={2.5} />
                    {item.label}
                  </div>
                  {item.badge && (
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      item.active ? 'bg-[#23533C] text-white' : 'bg-[#C35331] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-[#EAE3D5]">
            <div className="w-10 h-10 rounded-full bg-[#23533C] text-white flex items-center justify-center font-bold text-sm">SG</div>
            <div>
              <h4 className="font-bold text-[14px] text-[#112318] leading-tight">Samuel Gatera</h4>
              <p className="text-[12px] text-[#7A827C] font-medium">Treasurer · Admin</p>
            </div>
            <button onClick={onLogout} className="ml-auto text-[#7A827C] hover:text-[#C35331] transition">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#F5F2EA] p-8 overflow-y-auto">
          
          {/* Header */}
          <header className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-2 hover:bg-[#EAE3D5] rounded-lg transition">
                <ArrowLeft className="w-5 h-5 text-[#5C645E]" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-[#112318] tracking-tight">Transactions</h1>
                <p className="text-xs text-[#7A827C] font-medium mt-0.5">{transactionsData.length} transactions</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A827C]" />
                <input 
                  type="text" 
                  placeholder="Search transactions..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white border border-[#E4DFD3] rounded-xl text-sm text-[#112318] placeholder-[#9AA29C] focus:outline-none focus:ring-1 focus:ring-[#23533C] w-48" 
                />
              </div>
              <div className="flex gap-1 bg-white p-1 rounded-xl border border-[#E4DFD3]">
                <button 
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    filterType === 'all' ? 'bg-[#1F1F1F] text-white' : 'text-[#5C645E] hover:text-[#112318]'
                  }`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilterType('contribution')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    filterType === 'contribution' ? 'bg-[#1F1F1F] text-white' : 'text-[#5C645E] hover:text-[#112318]'
                  }`}
                >
                  Contributions
                </button>
                <button 
                  onClick={() => setFilterType('withdrawal')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    filterType === 'withdrawal' ? 'bg-[#1F1F1F] text-white' : 'text-[#5C645E] hover:text-[#112318]'
                  }`}
                >
                  Withdrawals
                </button>
              </div>
              <div className="flex gap-1 bg-white p-1 rounded-xl border border-[#E4DFD3]">
                <button 
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    filterStatus === 'all' ? 'bg-[#1F1F1F] text-white' : 'text-[#5C645E] hover:text-[#112318]'
                  }`}
                >
                  All Status
                </button>
                <button 
                  onClick={() => setFilterStatus('pending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    filterStatus === 'pending' ? 'bg-[#1F1F1F] text-white' : 'text-[#5C645E] hover:text-[#112318]'
                  }`}
                >
                  Pending
                </button>
                <button 
                  onClick={() => setFilterStatus('approved')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    filterStatus === 'approved' ? 'bg-[#1F1F1F] text-white' : 'text-[#5C645E] hover:text-[#112318]'
                  }`}
                >
                  Approved
                </button>
              </div>
              <button className="px-3 py-2 bg-white border border-[#E4DFD3] rounded-xl text-sm font-medium text-[#5C645E] hover:bg-[#F2EDE2] transition flex items-center gap-1.5">
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
          </header>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-[20px] p-6 border border-[#EAE3D5]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E6EFEA] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#23533C]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">TOTAL CONTRIBUTIONS</p>
                  <p className="text-2xl font-bold text-[#23533C]">{totalContributions.toLocaleString()} RWF</p>
                  <p className="text-xs text-[#7A827C]">{transactionsData.filter(t => t.type === 'Contribution').length} transactions</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-6 border border-[#EAE3D5]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FCECE5] flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-[#B94723]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">TOTAL WITHDRAWALS</p>
                  <p className="text-2xl font-bold text-[#B94723]">{totalWithdrawals.toLocaleString()} RWF</p>
                  <p className="text-xs text-[#7A827C]">{transactionsData.filter(t => t.type === 'Withdrawal').length} transactions</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-6 border border-[#EAE3D5]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FEF9E6] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#B18817]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">PENDING</p>
                  <p className="text-2xl font-bold text-[#B18817]">{pendingCount}</p>
                  <p className="text-xs text-[#7A827C]">awaiting review</p>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-[20px] border border-[#EAE3D5] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#F5F2EA] border-b border-[#EAE3D5]">
                    <th className="px-6 py-3 text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">Member</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">Detail</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F2EA]">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-[#7A827C]">No transactions found</td>
                    </tr>
                  ) : (
                    filteredData.map((tx) => (
                      <tr key={tx.id} className="hover:bg-[#FAF8F5] transition">
                        <td className="px-6 py-3.5 text-sm text-[#5C645E]">{tx.date}</td>
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              tx.initials === 'JH' ? 'bg-[#6554A2]/10 text-[#6554A2]' :
                              tx.initials === 'ON' ? 'bg-[#1E724A]/10 text-[#1E724A]' :
                              tx.initials === 'SG' ? 'bg-[#23533C]/10 text-[#23533C]' :
                              tx.initials === 'EM' ? 'bg-[#B35A3B]/10 text-[#B35A3B]' :
                              tx.initials === 'AN' ? 'bg-[#3B7BB3]/10 text-[#3B7BB3]' :
                              'bg-[#F5F2EA] text-[#5C645E]'
                            }`}>
                              {tx.initials}
                            </div>
                            <span className="font-medium text-[#112318]">{tx.member}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            tx.type === 'Contribution' 
                              ? 'bg-[#E6EFEA] text-[#23533C]' 
                              : 'bg-[#FCECE5] text-[#B94723]'
                          }`}>
                            {tx.type}
                          </span>
                        </td>
                        <td className={`px-6 py-3.5 font-bold ${
                          tx.isCredit ? 'text-[#23533C]' : 'text-[#B94723]'
                        }`}>
                          {tx.isCredit ? '+' : '-'}{tx.amount.toLocaleString()} RWF
                        </td>
                        <td className="px-6 py-3.5 text-sm text-[#5C645E]">{tx.detail}</td>
                        <td className="px-6 py-3.5">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadge(tx.status)}`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Transactions;