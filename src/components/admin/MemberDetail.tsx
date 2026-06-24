import React, { useState } from 'react';
import { 
  ArrowLeft, Mail, Phone, Calendar, Edit2, UserPlus,
  LayoutDashboard, UserCheck, Users, CreditCard, 
  AlertTriangle, ArrowUpRight, Settings, LogOut,
  CheckCircle, XCircle, Clock, Eye
} from 'lucide-react';

interface MemberDetailProps {
  onBack: () => void;
  onNavigate: (page: 'overview' | 'approvals' | 'members' | 'add-member' | 'edit-member' | 'record-on-behalf' | 'transactions' | 'penalties' | 'withdrawals' | 'settings' | `member/${string}` | `edit-member/${string}` | `record-on-behalf/${string}`) => void;
  onLogout: () => void;
  memberId: string;
}

const MemberDetail: React.FC<MemberDetailProps> = ({ onBack, onNavigate, onLogout, memberId }) => {
  const [activeTab, setActiveTab] = useState<'transactions' | 'penalties'>('transactions');

  // All members data
  const allMembersData: Record<string, any> = {
    '1': {
      name: 'Emmanuel Bizimana',
      initials: 'EB',
      memberId: '#001',
      phone: '+250 788 123 456',
      email: 'emmanuel@ikimina.com',
      joinedDate: 'January 2025',
      monthsInGroup: 18,
      totalShares: 18,
      totalMonths: 18,
      totalContributed: 360000,
      unpaidPenalty: 0,
      missingMonths: 0,
      missingMonthsList: [],
      penalties: [],
      transactions: [
        { date: '05 Jun 2026', type: 'Contribution', amount: 20000, months: 'Jun 2026', status: 'Approved' },
        { date: '06 Mar 2026', type: 'Contribution', amount: 20000, months: 'Mar 2026', status: 'Approved' },
      ]
    },
    '2': {
      name: 'Jean-Paul Habimana',
      initials: 'JH',
      memberId: '#003',
      phone: '+250 788 123 457',
      email: 'jp@ikimina.com',
      joinedDate: 'January 2025',
      monthsInGroup: 18,
      totalShares: 15,
      totalMonths: 18,
      totalContributed: 300000,
      unpaidPenalty: 2000,
      missingMonths: 1,
      missingMonthsList: ['Mar'],
      penalties: [
        { month: 'March 2026', generated: '08 Mar', amount: 2000, status: 'Unpaid' },
      ],
      transactions: [
        { date: '20 Jun 2026', type: 'Contribution', amount: 44000, months: 'Apr–May 2026', status: 'Pending' },
        { date: '05 Jun 2026', type: 'Contribution', amount: 20000, months: 'Jun 2026', status: 'Approved' },
        { date: '06 Mar 2026', type: 'Contribution', amount: 20000, months: 'Mar 2026', status: 'Approved' },
      ]
    },
    '3': {
      name: 'Thierry Hakizimana',
      initials: 'TH',
      memberId: '#004',
      phone: '+250 788 123 458',
      email: 'thierry@ikimina.com',
      joinedDate: 'January 2025',
      monthsInGroup: 18,
      totalShares: 18,
      totalMonths: 18,
      totalContributed: 360000,
      unpaidPenalty: 0,
      missingMonths: 0,
      missingMonthsList: [],
      penalties: [],
      transactions: [
        { date: '02 Jun 2026', type: 'Contribution', amount: 20000, months: 'Jun 2026', status: 'Approved' },
        { date: '06 Mar 2026', type: 'Contribution', amount: 20000, months: 'Mar 2026', status: 'Approved' },
      ]
    },
    '4': {
      name: 'Fabrice Mutabazi',
      initials: 'FM',
      memberId: '#005',
      phone: '+250 788 123 459',
      email: 'fabrice@ikimina.com',
      joinedDate: 'January 2025',
      monthsInGroup: 18,
      totalShares: 16,
      totalMonths: 18,
      totalContributed: 320000,
      unpaidPenalty: 4000,
      missingMonths: 2,
      missingMonthsList: ['Apr', 'May'],
      penalties: [
        { month: 'April 2026', generated: '08 Apr', amount: 2000, status: 'Unpaid' },
        { month: 'May 2026', generated: '08 May', amount: 2000, status: 'Unpaid' },
      ],
      transactions: [
        { date: '11 May 2026', type: 'Contribution', amount: 20000, months: 'May 2026', status: 'Pending' },
        { date: '05 Jun 2026', type: 'Contribution', amount: 20000, months: 'Jun 2026', status: 'Approved' },
      ]
    },
    '5': {
      name: 'Eric Mugisha',
      initials: 'EM',
      memberId: '#007',
      phone: '+250 788 412 663',
      email: 'eric@ikimina.com',
      joinedDate: 'January 2025',
      monthsInGroup: 18,
      totalShares: 16,
      totalMonths: 18,
      totalContributed: 320000,
      unpaidPenalty: 4000,
      missingMonths: 2,
      missingMonthsList: ['Apr', 'May'],
      penalties: [
        { month: 'April 2026', generated: '08 Apr', amount: 2000, status: 'Unpaid' },
        { month: 'May 2026', generated: '08 May', amount: 2000, status: 'Unpaid' },
        { month: 'February 2026', generated: '08 Feb', amount: 2000, status: 'Paid' },
      ],
      transactions: [
        { date: '20 Jun 2026', type: 'Contribution', amount: 44000, months: 'Apr–May 2026', status: 'Pending' },
        { date: '05 Jun 2026', type: 'Contribution', amount: 20000, months: 'Jun 2026', status: 'Approved' },
        { date: '06 Mar 2026', type: 'Contribution', amount: 20000, months: 'Mar 2026', status: 'Approved' },
        { date: '05 Jan 2026', type: 'Contribution', amount: 40000, months: 'Nov–Dec 2025', status: 'Approved' },
      ]
    },
    '6': {
      name: 'Vincent Karangwa',
      initials: 'VK',
      memberId: '#008',
      phone: '+250 788 123 462',
      email: 'vincent@ikimina.com',
      joinedDate: 'January 2025',
      monthsInGroup: 18,
      totalShares: 14,
      totalMonths: 18,
      totalContributed: 280000,
      unpaidPenalty: 8000,
      missingMonths: 3,
      missingMonthsList: ['Feb', 'Mar', 'Apr'],
      penalties: [
        { month: 'February 2026', generated: '08 Feb', amount: 2000, status: 'Unpaid' },
        { month: 'March 2026', generated: '08 Mar', amount: 2000, status: 'Unpaid' },
        { month: 'April 2026', generated: '08 Apr', amount: 2000, status: 'Unpaid' },
      ],
      transactions: [
        { date: '09 Apr 2026', type: 'Contribution', amount: 20000, months: 'Apr 2026', status: 'Pending' },
        { date: '05 Jun 2026', type: 'Contribution', amount: 20000, months: 'Jun 2026', status: 'Approved' },
      ]
    },
    '7': {
      name: 'Olivier Niyonzima',
      initials: 'ON',
      memberId: '#010',
      phone: '+250 788 123 464',
      email: 'olivier@ikimina.com',
      joinedDate: 'January 2025',
      monthsInGroup: 18,
      totalShares: 18,
      totalMonths: 18,
      totalContributed: 360000,
      unpaidPenalty: 0,
      missingMonths: 0,
      missingMonthsList: [],
      penalties: [],
      transactions: [
        { date: '19 Jun 2026', type: 'Contribution', amount: 60000, months: 'Jul–Sep 2026', status: 'Pending' },
        { date: '05 Jun 2026', type: 'Contribution', amount: 20000, months: 'Jun 2026', status: 'Approved' },
      ]
    },
    '8': {
      name: 'Gaspard Tuyishime',
      initials: 'GT',
      memberId: '#011',
      phone: '+250 788 123 465',
      email: 'gaspard@ikimina.com',
      joinedDate: 'January 2025',
      monthsInGroup: 18,
      totalShares: 17,
      totalMonths: 18,
      totalContributed: 340000,
      unpaidPenalty: 0,
      missingMonths: 1,
      missingMonthsList: ['Jan'],
      penalties: [],
      transactions: [
        { date: '03 Jun 2026', type: 'Contribution', amount: 20000, months: 'Jun 2026', status: 'Approved' },
        { date: '06 Mar 2026', type: 'Contribution', amount: 20000, months: 'Mar 2026', status: 'Approved' },
      ]
    },
    '9': {
      name: 'Claude Iradukunda',
      initials: 'CI',
      memberId: '#012',
      phone: '+250 788 123 466',
      email: 'claude@ikimina.com',
      joinedDate: 'January 2025',
      monthsInGroup: 18,
      totalShares: 13,
      totalMonths: 18,
      totalContributed: 260000,
      unpaidPenalty: 6000,
      missingMonths: 4,
      missingMonthsList: ['Jan', 'Feb', 'Mar', 'Apr'],
      penalties: [
        { month: 'January 2026', generated: '08 Jan', amount: 2000, status: 'Unpaid' },
        { month: 'February 2026', generated: '08 Feb', amount: 2000, status: 'Unpaid' },
        { month: 'March 2026', generated: '08 Mar', amount: 2000, status: 'Unpaid' },
      ],
      transactions: [
        { date: '28 Mar 2026', type: 'Contribution', amount: 20000, months: 'Mar 2026', status: 'Pending' },
        { date: '05 Jun 2026', type: 'Contribution', amount: 20000, months: 'Jun 2026', status: 'Approved' },
      ]
    },
  };

  const member = allMembersData[memberId] || allMembersData['5'];

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', key: 'overview' },
    { icon: UserCheck, label: 'Approvals', key: 'approvals', badge: '4' },
    { icon: Users, label: 'Members', key: 'members' },
    { icon: CreditCard, label: 'Transactions', key: 'transactions' },
    { icon: AlertTriangle, label: 'Penalties', key: 'penalties' },
    { icon: ArrowUpRight, label: 'Withdrawals', key: 'withdrawals' },
    { icon: Settings, label: 'Settings', key: 'settings' },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      'Pending': 'bg-[#FEF9E6] text-[#B18817]',
      'Approved': 'bg-[#E5F4ED] text-[#1E724A]',
      'Rejected': 'bg-[#FCECE5] text-[#B94723]',
      'Paid': 'bg-[#E5F4ED] text-[#1E724A]',
      'Unpaid': 'bg-[#FCECE5] text-[#B94723]',
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
                  onClick={() => item.key === 'members' ? null : onNavigate(item.key as any)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[14px] transition ${
                    item.key === 'members'
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
        <main className="flex-1 bg-[#F5F2EA] p-8 overflow-y-auto">
          
          {/* Header with Back Button */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-2 hover:bg-[#EAE3D5] rounded-lg transition">
                <ArrowLeft className="w-5 h-5 text-[#5C645E]" />
              </button>
              <h1 className="text-2xl font-bold text-[#112318] tracking-tight">Back to members</h1>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onNavigate(`record-on-behalf/${memberId}` as any)}
                className="px-4 py-2 bg-[#1d5335] hover:bg-[#164a28] text-white rounded-xl text-sm font-semibold transition flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" /> Record on behalf
              </button>
              <button 
                onClick={() => onNavigate(`edit-member/${memberId}` as any)}
                className="px-4 py-2 bg-[#1d5335] hover:bg-[#164a28] text-white rounded-xl text-sm font-semibold transition flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" /> Edit member
              </button>
            </div>
          </div>

          {/* Member Profile Card */}
          <div className="bg-white rounded-[24px] p-6 border border-[#EAE3D5] mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-full font-bold flex items-center justify-center text-2xl ${
                member.initials === 'EM' ? 'bg-[#B35A3B]/10 text-[#B35A3B]' :
                member.initials === 'EB' ? 'bg-[#23533C]/10 text-[#23533C]' :
                member.initials === 'JH' ? 'bg-[#6554A2]/10 text-[#6554A2]' :
                member.initials === 'TH' ? 'bg-[#B18817]/10 text-[#B18817]' :
                member.initials === 'FM' ? 'bg-[#3B7BB3]/10 text-[#3B7BB3]' :
                member.initials === 'VK' ? 'bg-[#1E724A]/10 text-[#1E724A]' :
                member.initials === 'ON' ? 'bg-[#1E724A]/10 text-[#1E724A]' :
                member.initials === 'GT' ? 'bg-[#6554A2]/10 text-[#6554A2]' :
                'bg-[#9AA29C]/20 text-[#7A827C]'
              }`}>
                {member.initials}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#112318]">{member.name}</h2>
                <div className="flex flex-wrap items-center gap-4 mt-1">
                  <span className="text-sm text-[#7A827C] font-medium">Member {member.memberId}</span>
                  <span className="w-px h-4 bg-[#EAE3D5]"></span>
                  <span className="text-sm text-[#7A827C] flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> {member.phone}
                  </span>
                  <span className="w-px h-4 bg-[#EAE3D5]"></span>
                  <span className="text-sm text-[#7A827C] flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" /> {member.email}
                  </span>
                  <span className="w-px h-4 bg-[#EAE3D5]"></span>
                  <span className="text-sm text-[#7A827C] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Joined {member.joinedDate} · {member.monthsInGroup} months in the group
                  </span>
                </div>
              </div>
              <span className={`text-[12px] font-bold px-3 py-1 rounded-full ${
                member.unpaidPenalty > 0 ? 'bg-[#FCECE5] text-[#B94723]' : 'bg-[#E5F4ED] text-[#1E724A]'
              }`}>
                {member.unpaidPenalty > 0 ? 'Active' : 'Active'}
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-[16px] p-5 border border-[#EAE3D5]">
              <p className="text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">TOTAL SHARES</p>
              <p className="text-3xl font-bold text-[#112318] mt-1">{member.totalShares}</p>
              <p className="text-xs text-[#7A827C] mt-0.5">of {member.totalMonths} months</p>
            </div>
            <div className="bg-white rounded-[16px] p-5 border border-[#EAE3D5]">
              <p className="text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">TOTAL CONTRIBUTED</p>
              <p className="text-3xl font-bold text-[#112318] mt-1">{member.totalContributed.toLocaleString()}</p>
              <p className="text-xs text-[#7A827C] mt-0.5">RWF</p>
            </div>
            <div className="bg-white rounded-[16px] p-5 border border-[#EAE3D5]">
              <p className="text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">UNPAID PENALTY</p>
              <p className={`text-3xl font-bold mt-1 ${member.unpaidPenalty > 0 ? 'text-[#B94723]' : 'text-[#112318]'}`}>
                {member.unpaidPenalty > 0 ? member.unpaidPenalty.toLocaleString() : '0'}
              </p>
              <p className="text-xs text-[#7A827C] mt-0.5">RWF · {member.penalties.filter((p: any) => p.status === 'Unpaid').length} penalties</p>
            </div>
            <div className="bg-white rounded-[16px] p-5 border border-[#EAE3D5]">
              <p className="text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">MISSING MONTHS</p>
              <p className="text-3xl font-bold text-[#112318] mt-1">{member.missingMonths}</p>
              <p className="text-xs text-[#7A827C] mt-0.5">{member.missingMonthsList.length > 0 ? member.missingMonthsList.join(' · ') : 'None'}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white rounded-xl p-1 border border-[#EAE3D5] mb-6 w-fit">
            <button 
              onClick={() => setActiveTab('transactions')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === 'transactions' 
                  ? 'bg-[#23533C] text-white' 
                  : 'text-[#5C645E] hover:text-[#112318]'
              }`}
            >
              Transaction history
            </button>
            <button 
              onClick={() => setActiveTab('penalties')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === 'penalties' 
                  ? 'bg-[#23533C] text-white' 
                  : 'text-[#5C645E] hover:text-[#112318]'
              }`}
            >
              Penalties {member.penalties.length > 0 && `(${member.penalties.length})`}
            </button>
          </div>

          {/* Transaction History */}
          {activeTab === 'transactions' && (
            <div className="bg-white rounded-[20px] border border-[#EAE3D5] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#F5F2EA] border-b border-[#EAE3D5]">
                      <th className="px-6 py-3 text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">Months</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-[#7A827C] uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F5F2EA]">
                    {member.transactions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-[#7A827C]">No transactions found</td>
                      </tr>
                    ) : (
                      member.transactions.map((tx: any, idx: number) => (
                        <tr key={idx} className="hover:bg-[#FAF8F5] transition">
                          <td className="px-6 py-3.5 text-sm text-[#5C645E]">{tx.date}</td>
                          <td className="px-6 py-3.5 font-semibold text-[#112318]">{tx.type}</td>
                          <td className="px-6 py-3.5 font-bold text-[#112318]">{tx.amount.toLocaleString()} RWF</td>
                          <td className="px-6 py-3.5 text-sm text-[#5C645E]">{tx.months}</td>
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
          )}

          {/* Penalties */}
          {activeTab === 'penalties' && (
            <div className="bg-white rounded-[20px] border border-[#EAE3D5] overflow-hidden">
              {member.penalties.length === 0 ? (
                <div className="px-6 py-8 text-center text-[#7A827C]">No penalties found</div>
              ) : (
                <div className="divide-y divide-[#F5F2EA]">
                  {member.penalties.map((penalty: any, idx: number) => (
                    <div key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-[#FAF8F5] transition">
                      <div>
                        <p className="font-semibold text-[#112318]">{penalty.month}</p>
                        <p className="text-xs text-[#7A827C]">Generated {penalty.generated}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-bold text-[#112318]">{penalty.amount.toLocaleString()} RWF</span>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadge(penalty.status)}`}>
                          {penalty.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default MemberDetail;