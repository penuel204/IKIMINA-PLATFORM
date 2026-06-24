import React, { useState } from 'react';
import { mockAdminOverview } from '../../data/mockData';
import { Search, ArrowUpRight } from 'lucide-react';
import Sidebar from './Sidebar';
import Approvals from './Approvals';
import Members from './Members';
import MemberDetail from './MemberDetail';
import AddMember from './AddMember';
import EditMember from './EditMember';
import RecordOnBehalf from './RecordOnBehalf';
import Penalties from './Penalties';
import Transactions from './Transactions';
import Withdrawals from './Withdrawals';
import Settings from './Settings';

interface TreasurerConsoleProps {
  onLogout: () => void;
}

const TreasurerConsole: React.FC<TreasurerConsoleProps> = ({ onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState<'overview' | 'approvals' | 'members' | 'add-member' | 'edit-member' | 'record-on-behalf' | 'member-detail' | 'transactions' | 'penalties' | 'withdrawals' | 'settings'>('overview');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const overview = mockAdminOverview;

  // Get member data by ID
  const getMemberData = (id: string) => {
    const allMembers: Record<string, any> = {
      '1': { name: 'Emmanuel Bizimana', phone: '+250 788 123 456', email: 'emmanuel@ikimina.com', memberId: '#001', joinedDate: 'January 2025', status: 'Active' },
      '2': { name: 'Jean-Paul Habimana', phone: '+250 788 123 457', email: 'jp@ikimina.com', memberId: '#003', joinedDate: 'January 2025', status: 'Active' },
      '3': { name: 'Thierry Hakizimana', phone: '+250 788 123 458', email: 'thierry@ikimina.com', memberId: '#004', joinedDate: 'January 2025', status: 'Active' },
      '4': { name: 'Fabrice Mutabazi', phone: '+250 788 123 459', email: 'fabrice@ikimina.com', memberId: '#005', joinedDate: 'January 2025', status: 'Active' },
      '5': { name: 'Eric Mugisha', phone: '+250 788 412 663', email: 'eric@ikimina.com', memberId: '#007', joinedDate: 'January 2025', status: 'Active' },
      '6': { name: 'Vincent Karangwa', phone: '+250 788 123 462', email: 'vincent@ikimina.com', memberId: '#008', joinedDate: 'January 2025', status: 'Active' },
      '7': { name: 'Olivier Niyonzima', phone: '+250 788 123 464', email: 'olivier@ikimina.com', memberId: '#010', joinedDate: 'January 2025', status: 'Active' },
      '8': { name: 'Gaspard Tuyishime', phone: '+250 788 123 465', email: 'gaspard@ikimina.com', memberId: '#011', joinedDate: 'January 2025', status: 'Active' },
      '9': { name: 'Claude Iradukunda', phone: '+250 788 123 466', email: 'claude@ikimina.com', memberId: '#012', joinedDate: 'January 2025', status: 'Inactive' },
    };
    return allMembers[id] || allMembers['5'];
  };

  const pendingData = [
    { initials: 'JH', name: 'Jean-Paul Habimana', amount: '44,000', period: 'Apr–May 2026', time: '2 hours ago' },
    { initials: 'ON', name: 'Olivier Niyonzima', amount: '60,000', period: 'Jul–Sep 2026', time: '5 hours ago' },
    { initials: 'PN', name: 'Patrick Nshimiyimana', amount: '20,000', period: 'Jun 2026', time: 'yesterday' },
  ];

  const navigateTo = (page: any) => {
    if (typeof page === 'string' && page.startsWith('member/')) {
      const memberId = page.split('/')[1];
      setSelectedMemberId(memberId);
      setCurrentPage('member-detail');
    } else if (typeof page === 'string' && page.startsWith('edit-member/')) {
      const memberId = page.split('/')[1];
      setSelectedMemberId(memberId);
      setCurrentPage('edit-member');
    } else if (typeof page === 'string' && page.startsWith('record-on-behalf/')) {
      const memberId = page.split('/')[1];
      setSelectedMemberId(memberId);
      setCurrentPage('record-on-behalf');
    } else {
      setSelectedMemberId(null);
      setCurrentPage(page);
    }
  };

  // Show Approvals page
  if (currentPage === 'approvals') {
    return <Approvals onBack={() => setCurrentPage('overview')} onNavigate={navigateTo} onLogout={onLogout} />;
  }

  // Show Members page
  if (currentPage === 'members') {
    return <Members onBack={() => setCurrentPage('overview')} onNavigate={navigateTo} onLogout={onLogout} />;
  }

  // Show Add Member page
  if (currentPage === 'add-member') {
    return <AddMember onBack={() => setCurrentPage('members')} onNavigate={navigateTo} onLogout={onLogout} />;
  }

  // Show Edit Member page
  if (currentPage === 'edit-member' && selectedMemberId) {
    return <EditMember 
      onBack={() => setCurrentPage('members')} 
      onNavigate={navigateTo} 
      onLogout={onLogout} 
      memberId={selectedMemberId} 
    />;
  }

  // Show Record On Behalf page
  if (currentPage === 'record-on-behalf' && selectedMemberId) {
    const member = getMemberData(selectedMemberId);
    return <RecordOnBehalf 
      onBack={() => setCurrentPage('member-detail')} 
      onNavigate={navigateTo} 
      onLogout={onLogout} 
      memberId={selectedMemberId}
      memberName={member.name}
      memberNumber={member.memberId}
    />;
  }

  // Show Member Detail page
  if (currentPage === 'member-detail' && selectedMemberId) {
    return <MemberDetail 
      onBack={() => setCurrentPage('members')} 
      onNavigate={navigateTo} 
      onLogout={onLogout} 
      memberId={selectedMemberId} 
    />;
  }

  // Show Penalties page
  if (currentPage === 'penalties') {
    return <Penalties onBack={() => setCurrentPage('overview')} onNavigate={navigateTo} onLogout={onLogout} />;
  }

  // Show Transactions page
  if (currentPage === 'transactions') {
    return <Transactions onBack={() => setCurrentPage('overview')} onNavigate={navigateTo} onLogout={onLogout} />;
  }

  // Show Withdrawals page
  if (currentPage === 'withdrawals') {
    return <Withdrawals onBack={() => setCurrentPage('overview')} onNavigate={navigateTo} onLogout={onLogout} />;
  }

  // Show Settings page
  if (currentPage === 'settings') {
    return <Settings onBack={() => setCurrentPage('overview')} onNavigate={navigateTo} onLogout={onLogout} />;
  }

  // Show other pages placeholder
  if (currentPage !== 'overview') {
    return (
      <div className="bg-[#EFECE6] min-h-screen p-4 flex">
        <div className="w-full bg-[#FAF8F5] rounded-[24px] shadow-sm flex overflow-hidden border border-[#E4DFD3]">
          <Sidebar onLogout={onLogout} currentPage={currentPage} onNavigate={navigateTo} />
          <main className="flex-1 bg-[#F5F2EA] p-8 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#112318] capitalize">{currentPage}</h2>
              <p className="text-[#7A827C] mt-2">Coming soon...</p>
              <button 
                onClick={() => setCurrentPage('overview')}
                className="mt-4 px-6 py-2 bg-[#23533C] text-white rounded-lg hover:bg-[#1a402e] transition"
              >
                Back to Overview
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Overview page
  return (
    <div className="text-[#2D312E] p-4 min-h-screen flex items-stretch bg-[#EFECE6]">
      <div className="w-full bg-[#FAF8F5] rounded-[24px] shadow-sm flex overflow-hidden border border-[#E4DFD3]">
        
        <Sidebar onLogout={onLogout} currentPage={currentPage} onNavigate={navigateTo} />

        <main className="flex-1 bg-[#F5F2EA] p-8 overflow-y-auto flex flex-col gap-6">
          
          <header className="flex justify-between items-center select-none">
            <div>
              <h1 className="text-2xl font-bold text-[#112318] tracking-tight">Group overview</h1>
              <p className="text-xs text-[#7A827C] font-medium mt-0.5">June 2026 · all figures in RWF</p>
            </div>
            <div className="relative w-72">
              <span className="absolute inset-y-0 left-3.5 flex items-center text-[#7A827C]">
                <Search className="w-4 h-4" />
              </span>
              <input 
                type="text" 
                placeholder="Search members or records..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-12 py-2.5 bg-white border border-[#E4DFD3] rounded-xl text-[13px] font-medium text-[#112318] placeholder-[#9AA29C] focus:outline-none focus:ring-1 focus:ring-[#23533C]"
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <span className="bg-[#23533C] text-white text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center">SG</span>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#23533C] text-[#FAF8F5] p-6 rounded-[20px] flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase opacity-75">TOTAL FUND VALUE</span>
                <h2 className="text-[34px] font-bold tracking-tight mt-1 leading-none">2,526,000</h2>
              </div>
              <p className="text-[12px] opacity-75 mt-5 font-medium">Contributions + penalties – withdrawals</p>
            </div>

            <div className="bg-white p-6 rounded-[20px] flex flex-col justify-between border border-[#EAE3D5]">
              <div>
                <span className="text-[11px] font-bold text-[#7A827C] tracking-wider uppercase">TOTAL CONTRIBUTIONS</span>
                <h2 className="text-[34px] font-bold text-[#112318] tracking-tight mt-1 leading-none">3,940,000</h2>
              </div>
              <p className="text-[12px] text-[#7A827C] mt-5 font-medium">
                <span className="text-[#2D312E] font-semibold">197 shares</span> across the group
              </p>
            </div>

            <div className="bg-white p-6 rounded-[20px] flex flex-col justify-between border border-[#EAE3D5]">
              <div>
                <span className="text-[11px] font-bold text-[#7A827C] tracking-wider uppercase">TOTAL WITHDRAWALS</span>
                <h2 className="text-[34px] font-bold text-[#112318] tracking-tight mt-1 leading-none">1,500,000</h2>
              </div>
              <p className="text-[12px] text-[#7A827C] mt-5 font-medium">
                <span className="text-[#2D312E] font-semibold">2 investments</span> funded
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-[20px] border border-[#EAE3D5]">
              <span className="text-[10px] font-bold text-[#7A827C] tracking-wider uppercase">MEMBERS</span>
              <h3 className="text-2xl font-bold text-[#112318] tracking-tight mt-0.5">12</h3>
              <p className="text-[12px] text-[#7A827C] font-medium mt-1">all active</p>
            </div>

            <div className="bg-[#FFF6F2] p-5 rounded-[20px] border border-[#F4E2DA]">
              <span className="text-[10px] font-bold text-[#C35331] tracking-wider uppercase">PENDING APPROVALS</span>
              <h3 className="text-2xl font-bold text-[#C35331] tracking-tight mt-0.5">4</h3>
              <p className="text-[12px] text-[#C35331]/80 font-medium mt-1">awaiting your review</p>
            </div>

            <div className="bg-white p-5 rounded-[20px] border border-[#EAE3D5]">
              <span className="text-[10px] font-bold text-[#7A827C] tracking-wider uppercase">UNPAID PENALTIES</span>
              <h3 className="text-2xl font-bold text-[#112318] tracking-tight mt-0.5">56,000</h3>
              <p className="text-[12px] text-[#7A827C] font-medium mt-1">of 142,000 generated</p>
            </div>

            <div className="bg-white p-5 rounded-[20px] border border-[#EAE3D5]">
              <span className="text-[10px] font-bold text-[#7A827C] tracking-wider uppercase">COLLECTION · JUNE</span>
              <h3 className="text-2xl font-bold text-[#112318] tracking-tight mt-0.5">75%</h3>
              <p className="text-[12px] text-[#7A827C] font-medium mt-1">9 of 12 paid on time</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-[24px] border border-[#EAE3D5] lg:col-span-2 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-6 select-none">
                <h3 className="font-bold text-[14px] text-[#112318]">Contributions vs withdrawals</h3>
                <div className="flex gap-4 text-[12px] font-semibold text-[#5C645E]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-[3px] bg-[#23533C]"></span> In
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-[3px] bg-[#C35331]"></span> Out
                  </span>
                </div>
              </div>
              
              <div className="h-44 flex items-end justify-between px-2 border-b border-[#FAF8F5]">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => {
                  const heights = [
                    { in: 82, out: 3 },
                    { in: 84, out: 3 },
                    { in: 88, out: 52 },
                    { in: 92, out: 3 },
                    { in: 86, out: 3 },
                    { in: 72, out: 66 },
                  ];
                  return (
                    <div key={i} className="flex flex-col items-center gap-2 w-12">
                      <div className="w-full flex justify-center items-end gap-1 h-32">
                        <div className="w-2.5 bg-[#23533C] rounded-t-[2px]" style={{ height: `${heights[i].in}%` }}></div>
                        <div className="w-2.5 bg-[#D2896E] rounded-t-[2px]" style={{ height: `${heights[i].out}%` }}></div>
                      </div>
                      <span className="text-[11px] text-[#9AA29C] font-medium">{month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white p-6 rounded-[24px] border border-[#EAE3D5] flex flex-col justify-between">
              <h3 className="font-bold text-[14px] text-[#112318]">On-time collection · June</h3>
              
              <div className="relative flex items-center justify-center my-2">
                <svg className="w-36 h-36 transform -rotate-90">
                  <circle cx="72" cy="72" r="52" stroke="#EFECE6" strokeWidth="14" fill="transparent" />
                  <circle cx="72" cy="72" r="52" stroke="#23533C" strokeWidth="14" fill="transparent" strokeDasharray="326.72" strokeDashoffset="81.68" strokeLinecap="round"/>
                </svg>
                <div className="absolute text-center">
                  <span className="text-[28px] font-bold text-[#112318] tracking-tight leading-none">75%</span>
                  <p className="text-[11px] text-[#7A827C] font-medium mt-1">on time</p>
                </div>
              </div>

              <div className="grid grid-cols-2 border-t border-[#F2EDE2] pt-4 text-center select-none">
                <div className="border-r border-[#F2EDE2]">
                  <span className="text-xl font-bold text-[#23533C]">9</span>
                  <p className="text-[11px] text-[#7A827C] font-semibold mt-0.5 uppercase tracking-wide">paid</p>
                </div>
                <div>
                  <span className="text-xl font-bold text-[#C35331]">3</span>
                  <p className="text-[11px] text-[#7A827C] font-semibold mt-0.5 uppercase tracking-wide">late / unpaid</p>
                </div>
              </div>
            </div>
          </div>

          <section className="bg-white rounded-[24px] border border-[#EAE3D5] p-6 mb-2">
            <div className="flex justify-between items-center mb-5 select-none">
              <h3 className="font-bold text-[15px] text-[#112318]">Pending approvals</h3>
              <button 
                onClick={() => setCurrentPage('approvals')}
                className="text-[13px] font-bold text-[#23533C] hover:opacity-80 flex items-center gap-1"
              >
                Review all <span className="text-sm">→</span>
              </button>
            </div>

            <div className="divide-y divide-[#F5F2EA]">
              {pendingData.map((item, idx) => {
                const bgColors = ['#EBE6F7', '#E5F4ED', '#FCECE5'];
                const textColors = ['#633BB3', '#1E724A', '#B94723'];
                return (
                  <div key={idx} className="flex justify-between items-center py-4 text-[14px]">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs tracking-wider font-bold`} style={{ backgroundColor: bgColors[idx], color: textColors[idx] }}>
                        {item.initials}
                      </div>
                      <span className="font-bold text-[#112318]">{item.name}</span>
                    </div>
                    <div className="flex items-center text-right font-medium text-[#5C645E]">
                      <span className="w-32 font-bold text-[#112318]">{item.amount} RWF</span>
                      <span className="w-36 text-left text-[13px] text-[#7A827C] pl-4">{item.period}</span>
                      <span className="w-32 text-right text-[13px] text-[#9AA29C]">{item.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TreasurerConsole;