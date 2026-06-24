import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Plus, 
  LayoutDashboard, UserCheck, Users, CreditCard, 
  AlertTriangle, ArrowUpRight, Settings, LogOut,
  MoreVertical
} from 'lucide-react';

interface MembersProps {
  onBack: () => void;
  onNavigate: (page: 'overview' | 'approvals' | 'members' | 'add-member' | 'transactions' | 'penalties' | 'withdrawals' | 'settings' | `member/${string}`) => void;
  onLogout: () => void;
}

const Members: React.FC<MembersProps> = ({ onBack, onNavigate, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const membersData = [
    { 
      id: '1', 
      name: 'Emmanuel Bizimana', 
      memberId: '#001', 
      initials: 'EB',
      bgColor: 'bg-[#23533C]/10',
      textColor: 'text-[#23533C]',
      shares: 18, 
      contributed: 360000, 
      unpaidPenalty: 0, 
      missing: 0, 
      lastPayment: '05 Jun 2026', 
      status: 'Active' 
    },
    { 
      id: '2', 
      name: 'Jean-Paul Habimana', 
      memberId: '#003', 
      initials: 'JH',
      bgColor: 'bg-[#6554A2]/10',
      textColor: 'text-[#6554A2]',
      shares: 15, 
      contributed: 300000, 
      unpaidPenalty: 2000, 
      missing: 1, 
      lastPayment: '20 Jun 2026', 
      status: 'Active' 
    },
    { 
      id: '3', 
      name: 'Thierry Hakizimana', 
      memberId: '#004', 
      initials: 'TH',
      bgColor: 'bg-[#B18817]/10',
      textColor: 'text-[#B18817]',
      shares: 18, 
      contributed: 360000, 
      unpaidPenalty: 0, 
      missing: 0, 
      lastPayment: '02 Jun 2026', 
      status: 'Active' 
    },
    { 
      id: '4', 
      name: 'Fabrice Mutabazi', 
      memberId: '#005', 
      initials: 'FM',
      bgColor: 'bg-[#3B7BB3]/10',
      textColor: 'text-[#3B7BB3]',
      shares: 16, 
      contributed: 320000, 
      unpaidPenalty: 4000, 
      missing: 2, 
      lastPayment: '11 May 2026', 
      status: 'Active' 
    },
    { 
      id: '5', 
      name: 'Eric Mugisha', 
      memberId: '#007', 
      initials: 'EM',
      bgColor: 'bg-[#B35A3B]/10',
      textColor: 'text-[#B35A3B]',
      shares: 16, 
      contributed: 320000, 
      unpaidPenalty: 4000, 
      missing: 2, 
      lastPayment: '05 Jun 2026', 
      status: 'Active' 
    },
    { 
      id: '6', 
      name: 'Vincent Karangwa', 
      memberId: '#008', 
      initials: 'VK',
      bgColor: 'bg-[#1E724A]/10',
      textColor: 'text-[#1E724A]',
      shares: 14, 
      contributed: 280000, 
      unpaidPenalty: 8000, 
      missing: 3, 
      lastPayment: '09 Apr 2026', 
      status: 'Active' 
    },
    { 
      id: '7', 
      name: 'Olivier Niyonzima', 
      memberId: '#010', 
      initials: 'ON',
      bgColor: 'bg-[#1E724A]/10',
      textColor: 'text-[#1E724A]',
      shares: 18, 
      contributed: 360000, 
      unpaidPenalty: 0, 
      missing: 0, 
      lastPayment: '19 Jun 2026', 
      status: 'Active' 
    },
    { 
      id: '8', 
      name: 'Gaspard Tuyishime', 
      memberId: '#011', 
      initials: 'GT',
      bgColor: 'bg-[#6554A2]/10',
      textColor: 'text-[#6554A2]',
      shares: 17, 
      contributed: 340000, 
      unpaidPenalty: 0, 
      missing: 1, 
      lastPayment: '03 Jun 2026', 
      status: 'Active' 
    },
    { 
      id: '9', 
      name: 'Claude Iradukunda', 
      memberId: '#012', 
      initials: 'CI',
      bgColor: 'bg-[#9AA29C]/20',
      textColor: 'text-[#7A827C]',
      shares: 13, 
      contributed: 260000, 
      unpaidPenalty: 6000, 
      missing: 4, 
      lastPayment: '28 Mar 2026', 
      status: 'Inactive' 
    },
  ];

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', key: 'overview' },
    { icon: UserCheck, label: 'Approvals', key: 'approvals', badge: '4' },
    { icon: Users, label: 'Members', key: 'members', active: true },
    { icon: CreditCard, label: 'Transactions', key: 'transactions' },
    { icon: AlertTriangle, label: 'Penalties', key: 'penalties' },
    { icon: ArrowUpRight, label: 'Withdrawals', key: 'withdrawals' },
    { icon: Settings, label: 'Settings', key: 'settings' },
  ];

  const filteredData = membersData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.memberId.includes(searchTerm);
    return matchesSearch;
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
                  onClick={() => item.key === 'members' ? null : onNavigate(item.key as any)}
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
                    <span className="bg-[#C35331] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
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
        <main className="flex-1 bg-[#F5F2EA] p-8 overflow-y-auto flex flex-col gap-5">
          
          {/* Header */}
          <header className="flex justify-between items-center select-none">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-2 hover:bg-[#EAE3D5] rounded-lg transition">
                <ArrowLeft className="w-5 h-5 text-[#5C645E]" />
              </button>
              <h1 className="text-2xl font-bold text-[#112318] tracking-tight">Members</h1>
              <span className="text-sm text-[#7A827C] font-semibold mt-1">{membersData.length} active</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <span className="absolute inset-y-0 left-3.5 flex items-center text-[#7A827C]">
                  <Search className="w-4 h-4" />
                </span>
                <input 
                  type="text" 
                  placeholder="Search members..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-[#E4DFD3] rounded-xl text-[13px] font-medium text-[#112318] placeholder-[#9AA29C] focus:outline-none focus:ring-1 focus:ring-[#23533C]"
                />
              </div>
              <button 
                onClick={() => onNavigate('add-member' as any)}
                className="bg-[#23533C] text-white text-[13px] font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 hover:opacity-90 transition shadow-xs"
              >
                <span className="text-base font-medium leading-none">+</span> Add member
              </button>
            </div>
          </header>

          {/* Members Table */}
          <div className="bg-white rounded-[24px] border border-[#EAE3D5] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#FAF8F5] text-[10px] font-bold text-[#9AA29C] tracking-wider uppercase bg-white select-none">
                  <th className="py-4 pl-6 w-[280px]">Member</th>
                  <th className="py-4 px-4 text-center">Shares</th>
                  <th className="py-4 px-4 text-right">Contributed</th>
                  <th className="py-4 px-4 text-right">Unpaid Penalty</th>
                  <th className="py-4 px-4 text-center">Missing</th>
                  <th className="py-4 px-4 text-right">Last Payment</th>
                  <th className="py-4 pr-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAF8F5] text-[14px]">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-[#7A827C]">No members found</td>
                  </tr>
                ) : (
                  filteredData.map((member) => (
                    <tr 
                      key={member.id} 
                      className="hover:bg-[#FAF8F5]/60 transition cursor-pointer"
                      onClick={() => onNavigate(`member/${member.id}` as any)}
                    >
                      <td className="py-4 pl-6 flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${member.bgColor} ${member.textColor} font-bold flex items-center justify-center text-xs`}>
                          {member.initials}
                        </div>
                        <div>
                          <p className="font-bold text-[#112318] leading-tight">{member.name}</p>
                          <p className="text-[11px] text-[#9AA29C] font-medium mt-0.5">{member.memberId}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-[#112318]">{member.shares}</td>
                      <td className="py-4 px-4 text-right font-medium text-[#2D312E]">{member.contributed.toLocaleString()}</td>
                      <td className={`py-4 px-4 text-right font-medium ${member.unpaidPenalty > 0 ? 'font-bold text-[#B94723]' : 'text-[#9AA29C]'}`}>
                        {member.unpaidPenalty > 0 ? `${member.unpaidPenalty.toLocaleString()}` : '—'}
                      </td>
                      <td className={`py-4 px-4 text-center font-medium ${member.missing > 0 ? 'font-bold text-[#B94723]' : 'text-[#9AA29C]'}`}>
                        {member.missing}
                      </td>
                      <td className="py-4 px-4 text-right font-medium text-[#5C645E]">{member.lastPayment}</td>
                      <td className="py-4 pr-6 text-center">
                        <span className={`text-[12px] font-bold px-3 py-1 rounded-full ${
                          member.status === 'Active' 
                            ? 'bg-[#E5F4ED] text-[#1E724A]' 
                            : 'bg-[#F2EDE2] text-[#7A827C]'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Members;