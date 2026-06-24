import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Filter, 
  LayoutDashboard, UserCheck, Users, CreditCard, 
  AlertTriangle, ArrowUpRight, Settings, LogOut,
  Download, Eye, ChevronDown, CheckCircle, XCircle
} from 'lucide-react';

interface PenaltiesProps {
  onBack: () => void;
  onNavigate: (page: 'overview' | 'approvals' | 'members' | 'transactions' | 'penalties' | 'withdrawals' | 'settings') => void;
  onLogout: () => void;
}

const Penalties: React.FC<PenaltiesProps> = ({ onBack, onNavigate, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'unpaid'>('all');

  const penaltiesData = [
    { id: '1', member: 'Fabrice Mutabazi', initials: 'FM', period: 'May 2026', reason: 'Missed contribution', amount: 2000, generated: '08 May 2026', status: 'Unpaid' },
    { id: '2', member: 'Eric Mugisha', initials: 'EM', period: 'May 2026', reason: 'Missed contribution', amount: 2000, generated: '09 May 2026', status: 'Unpaid' },
    { id: '3', member: 'Vincent Karangwa', initials: 'VK', period: 'May 2026', reason: 'Missed contribution', amount: 2000, generated: '10 May 2026', status: 'Unpaid' },
    { id: '4', member: 'Claude Iradukunda', initials: 'CI', period: 'Apr 2026', reason: 'Missed contribution', amount: 2000, generated: '11 Apr 2026', status: 'Unpaid' },
    { id: '5', member: 'Jean-Paul Habimana', initials: 'JH', period: 'Apr 2026', reason: 'Late contribution', amount: 2000, generated: '12 Apr 2026', status: 'Paid' },
    { id: '6', member: 'Eric Mugisha', initials: 'EM', period: 'Feb 2026', reason: 'Late contribution', amount: 2000, generated: '13 Feb 2026', status: 'Paid' },
    { id: '7', member: 'Vincent Karangwa', initials: 'VK', period: 'Jan 2026', reason: 'Missed contribution', amount: 2000, generated: '08 Jan 2026', status: 'Paid' },
    { id: '8', member: 'Thierry Hakizimana', initials: 'TH', period: 'Mar 2026', reason: 'Missed contribution', amount: 2000, generated: '08 Mar 2026', status: 'Paid' },
    { id: '9', member: 'Olivier Niyonzima', initials: 'ON', period: 'Jun 2026', reason: 'Late contribution', amount: 2000, generated: '08 Jun 2026', status: 'Unpaid' },
    { id: '10', member: 'Gaspard Tuyishime', initials: 'GT', period: 'Apr 2026', reason: 'Missed contribution', amount: 2000, generated: '08 Apr 2026', status: 'Paid' },
  ];

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', key: 'overview' },
    { icon: UserCheck, label: 'Approvals', key: 'approvals', badge: '4' },
    { icon: Users, label: 'Members', key: 'members' },
    { icon: CreditCard, label: 'Transactions', key: 'transactions' },
    { icon: AlertTriangle, label: 'Penalties', key: 'penalties', active: true },
    { icon: ArrowUpRight, label: 'Withdrawals', key: 'withdrawals' },
    { icon: Settings, label: 'Settings', key: 'settings' },
  ];

  // Calculate totals
  const totalGenerated = penaltiesData.reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = penaltiesData.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const totalUnpaid = penaltiesData.filter(p => p.status === 'Unpaid').reduce((sum, p) => sum + p.amount, 0);
  const paidCount = penaltiesData.filter(p => p.status === 'Paid').length;
  const unpaidCount = penaltiesData.filter(p => p.status === 'Unpaid').length;

  const filteredData = penaltiesData.filter(item => {
    const matchesSearch = item.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.period.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || item.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

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
                  onClick={() => item.key === 'penalties' ? null : onNavigate(item.key as any)}
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
                <h1 className="text-2xl font-bold text-[#112318] tracking-tight">Penalties</h1>
                <p className="text-xs text-[#7A827C] font-medium mt-0.5">71 penalties since Jan 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A827C]" />
                <input 
                  type="text" 
                  placeholder="Search penalties..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white border border-[#E4DFD3] rounded-xl text-sm text-[#112318] placeholder-[#9AA29C] focus:outline-none focus:ring-1 focus:ring-[#23533C] w-48" 
                />
              </div>
              <div className="flex gap-1 bg-white p-1 rounded-xl border border-[#E4DFD3]">
                <button 
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    filterStatus === 'all' ? 'bg-[#1F1F1F] text-white' : 'text-[#5C645E] hover:text-[#112318]'
                  }`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilterStatus('paid')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    filterStatus === 'paid' ? 'bg-[#1F1F1F] text-white' : 'text-[#5C645E] hover:text-[#112318]'
                  }`}
                >
                  Paid
                </button>
                <button 
                  onClick={() => setFilterStatus('unpaid')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    filterStatus === 'unpaid' ? 'bg-[#1F1F1F] text-white' : 'text-[#5C645E] hover:text-[#112318]'
                  }`}
                >
                  Unpaid
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
                  <AlertTriangle className="w-5 h-5 text-[#23533C]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">TOTAL GENERATED</p>
                  <p className="text-2xl font-bold text-[#112318]">{totalGenerated.toLocaleString()} RWF</p>
                  <p className="text-xs text-[#7A827C]">{penaltiesData.length} penalties</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-6 border border-[#EAE3D5]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E5F4ED] flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#1E724A]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">PAID</p>
                  <p className="text-2xl font-bold text-[#1E724A]">{totalPaid.toLocaleString()} RWF</p>
                  <p className="text-xs text-[#7A827C]">{paidCount} settled</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-6 border border-[#EAE3D5]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FCECE5] flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-[#B94723]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">UNPAID</p>
                  <p className="text-2xl font-bold text-[#B94723]">{totalUnpaid.toLocaleString()} RWF</p>
                  <p className="text-xs text-[#7A827C]">{unpaidCount} outstanding</p>
                </div>
              </div>
            </div>
          </div>

          {/* Penalties Table */}
          <div className="bg-white rounded-[20px] border border-[#EAE3D5] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#F5F2EA] border-b border-[#EAE3D5]">
                    <th className="px-6 py-3 text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">Member</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">Period</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">Reason</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">Generated</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F2EA]">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-[#7A827C]">No penalties found</td>
                    </tr>
                  ) : (
                    filteredData.map((penalty) => (
                      <tr key={penalty.id} className="hover:bg-[#FAF8F5] transition">
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              penalty.initials === 'EM' ? 'bg-[#B35A3B]/10 text-[#B35A3B]' :
                              penalty.initials === 'FM' ? 'bg-[#3B7BB3]/10 text-[#3B7BB3]' :
                              penalty.initials === 'VK' ? 'bg-[#1E724A]/10 text-[#1E724A]' :
                              penalty.initials === 'CI' ? 'bg-[#9AA29C]/20 text-[#7A827C]' :
                              penalty.initials === 'JH' ? 'bg-[#6554A2]/10 text-[#6554A2]' :
                              penalty.initials === 'TH' ? 'bg-[#B18817]/10 text-[#B18817]' :
                              penalty.initials === 'ON' ? 'bg-[#1E724A]/10 text-[#1E724A]' :
                              penalty.initials === 'GT' ? 'bg-[#6554A2]/10 text-[#6554A2]' :
                              'bg-[#F5F2EA] text-[#5C645E]'
                            }`}>
                              {penalty.initials}
                            </div>
                            <span className="font-medium text-[#112318]">{penalty.member}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3.5 text-sm text-[#5C645E]">{penalty.period}</td>
                        <td className="px-6 py-3.5 text-sm text-[#5C645E]">{penalty.reason}</td>
                        <td className="px-6 py-3.5 font-bold text-[#112318]">{penalty.amount.toLocaleString()} RWF</td>
                        <td className="px-6 py-3.5 text-sm text-[#5C645E]">{penalty.generated}</td>
                        <td className="px-6 py-3.5">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            penalty.status === 'Paid' 
                              ? 'bg-[#E5F4ED] text-[#1E724A]' 
                              : 'bg-[#FCECE5] text-[#B94723]'
                          }`}>
                            {penalty.status}
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

export default Penalties;