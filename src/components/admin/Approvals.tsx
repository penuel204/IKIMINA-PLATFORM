import React, { useState } from 'react';
import { 
  ArrowLeft, Check, X, Eye, ChevronDown, ChevronUp,
  FileText, AlertCircle, CheckCircle, Search, Filter,
  LayoutDashboard, UserCheck, Users, CreditCard, 
  AlertTriangle, ArrowUpRight, Settings, LogOut,
  Download, Flag, XCircle, Info
} from 'lucide-react';

interface ApprovalsProps {
  onBack: () => void;
  onNavigate: (page: 'overview' | 'approvals' | 'members' | 'transactions' | 'penalties' | 'withdrawals' | 'settings') => void;
  onLogout: () => void;
}

const Approvals: React.FC<ApprovalsProps> = ({ onBack, onNavigate, onLogout }) => {
  const [expandedId, setExpandedId] = useState<string | null>('1');
  const [selectedTab, setSelectedTab] = useState<'pending' | 'all'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [showApproveModal, setShowApproveModal] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<{ id: string; name: string; amount: number; shares: number; penalties: number } | null>(null);
  const [showFlagModal, setShowFlagModal] = useState<string | null>(null);
  const [flagMessage, setFlagMessage] = useState('');
  const [flagReason, setFlagReason] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const approvalsData = [
    {
      id: '1',
      initials: 'JH',
      name: 'Jean-Paul Habimana',
      memberId: '#003',
      submitted: '2 hours ago',
      type: 'Contribution + penalty',
      amount: 44000,
      paymentDate: '20 Jun 2026',
      monthsCovered: 'Apr–May 2026 (2)',
      penaltyDeclared: '4,000 RWF',
      method: 'MoMo transfer',
      status: 'pending',
      systemOwed: 44000,
      declared: 44000,
      matches: true,
      proof: 'SMS_screenshot.jpg',
      overdueMonths: 2,
      penalties: 2,
      short: 0,
      bgColor: 'bg-[#6554A2]/10',
      textColor: 'text-[#6554A2]'
    },
    {
      id: '2',
      initials: 'PN',
      name: 'Patrick Nshimiyimana',
      memberId: '#009',
      submitted: 'yesterday',
      type: 'Contribution, no penalty',
      amount: 20000,
      paymentDate: '18 Jun 2026',
      monthsCovered: 'May 2026 (1)',
      penaltyDeclared: 'None',
      method: 'Bank transfer',
      status: 'pending',
      systemOwed: 22000,
      declared: 20000,
      matches: false,
      proof: 'bank_slip.pdf',
      overdueMonths: 1,
      penalties: 1,
      short: 2000,
      bgColor: 'bg-[#B94723]/10',
      textColor: 'text-[#B94723]'
    },
    {
      id: '3',
      initials: 'ON',
      name: 'Olivier Niyonzima',
      memberId: '#005',
      submitted: '5 hours ago',
      type: 'Advance contribution',
      amount: 60000,
      paymentDate: '22 Jun 2026',
      monthsCovered: 'Jul–Sep 2026 (3)',
      penaltyDeclared: 'None',
      method: 'Bank transfer',
      status: 'pending',
      systemOwed: 60000,
      declared: 60000,
      matches: true,
      proof: 'bank_slip_on.pdf',
      overdueMonths: 0,
      penalties: 0,
      short: 0,
      bgColor: 'bg-[#1E724A]/10',
      textColor: 'text-[#1E724A]'
    },
  ];

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', key: 'overview' },
    { icon: UserCheck, label: 'Approvals', key: 'approvals', badge: '4', active: true },
    { icon: Users, label: 'Members', key: 'members' },
    { icon: CreditCard, label: 'Transactions', key: 'transactions' },
    { icon: AlertTriangle, label: 'Penalties', key: 'penalties' },
    { icon: ArrowUpRight, label: 'Withdrawals', key: 'withdrawals' },
    { icon: Settings, label: 'Settings', key: 'settings' },
  ];

  const handleApprove = (id: string, name: string, amount: number) => {
    const item = approvalsData.find(a => a.id === id);
    const sharesMatch = item?.monthsCovered.match(/\d+/);
    const shares = sharesMatch ? parseInt(sharesMatch[0]) : 0;
    const penalties = item?.penalties || 0;
    
    setShowSuccessModal({
      id,
      name,
      amount,
      shares: shares,
      penalties: penalties
    });
  };

  const handleReject = (id: string, name: string) => {
    setToast({ message: `❌ ${name} rejected.`, type: 'error' });
    setTimeout(() => setToast(null), 3000);
  };

  const handleViewProof = (proof: string) => {
    alert(`Viewing proof: ${proof}`);
  };

  const handleFlagSubmit = (id: string) => {
    if (flagReason && flagMessage.trim()) {
      const item = approvalsData.find(a => a.id === id);
      setToast({ 
        message: `🚩 Flag sent to ${item?.name} with reason: "${flagReason}"`, 
        type: 'success' 
      });
      setShowFlagModal(null);
      setFlagMessage('');
      setFlagReason('');
      setTimeout(() => setToast(null), 4000);
    }
  };

  const filteredData = approvalsData.filter(item => {
    if (selectedTab === 'pending' && item.status !== 'pending') return false;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.memberId.includes(searchTerm);
    return matchesSearch;
  });

  const pendingCount = approvalsData.filter(a => a.status === 'pending').length;

  return (
    <div className="bg-[#EFECE6] min-h-screen p-4 flex relative">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-xl shadow-lg text-white font-medium ${
          toast.type === 'success' ? 'bg-[#1d5335]' : 'bg-[#C35331]'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Approve Confirmation Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#112318]">Approves this contribution?</h2>
                <p className="text-sm text-[#7A827C] mt-1">
                  {approvalsData.find(a => a.id === showApproveModal)?.name} - {approvalsData.find(a => a.id === showApproveModal)?.amount.toLocaleString()} RWF
                </p>
              </div>
              <button onClick={() => setShowApproveModal(null)} className="text-[#7A827C] hover:text-[#C35331] transition">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-xs font-bold text-[#7A827C] uppercase tracking-wider mb-3">WILL BE ALLOCATED TO</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-[#F5F2EA] rounded-lg px-4 py-2.5">
                  <span className="font-medium text-[#112318]">April 2026</span>
                  <span className="font-bold text-[#112318]">20,000 + 2,000</span>
                </div>
                <div className="flex items-center justify-between bg-[#F5F2EA] rounded-lg px-4 py-2.5">
                  <span className="font-medium text-[#112318]">May 2026</span>
                  <span className="font-bold text-[#112318]">20,000 + 2,000</span>
                </div>
              </div>
            </div>

            <div className="bg-[#E6EFEA] rounded-xl p-4 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1d5335] text-white flex items-center justify-center text-sm font-bold">✓</div>
              <div>
                <p className="text-sm font-semibold text-[#1E724A]">+2 shares · 2 penalties cleared</p>
                <p className="text-xs text-[#7A827C] mt-0.5">
                  This updates the member's balance and the group fund, and is recorded in the audit log. It can't be undone — corrections need an adjusting entry.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowApproveModal(null)}
                className="flex-1 py-3 bg-[#F5F2EA] hover:bg-[#EAE3D5] text-[#5C645E] font-semibold rounded-xl text-sm transition"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  const item = approvalsData.find(a => a.id === showApproveModal);
                  if (item) {
                    handleApprove(showApproveModal, item.name, item.amount);
                    setShowApproveModal(null);
                  }
                }}
                className="flex-1 py-3 bg-[#1d5335] hover:bg-[#164a28] text-white font-semibold rounded-xl text-sm transition flex items-center justify-center gap-2"
              >
                ✓ Approve transaction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-[#E6EFEA] flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-[#1d5335]" />
            </div>
            
            <h2 className="text-xl font-bold text-[#112318]">Transaction approved</h2>
            <p className="text-sm text-[#7A827C] mt-1">
              {showSuccessModal.name}'s contribution of {showSuccessModal.amount.toLocaleString()} RWF has been recorded.
            </p>

            <div className="grid grid-cols-3 gap-3 mt-6 bg-[#F5F2EA] rounded-xl p-4">
              <div>
                <p className="text-2xl font-bold text-[#1d5335]">+{showSuccessModal.shares}</p>
                <p className="text-[10px] text-[#7A827C] font-medium">shares</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1d5335]">{showSuccessModal.penalties}</p>
                <p className="text-[10px] text-[#7A827C] font-medium">penalties cleared</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1d5335]">+{showSuccessModal.amount.toLocaleString()}</p>
                <p className="text-[10px] text-[#7A827C] font-medium">Fund</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => {
                  const member = approvalsData.find(a => a.id === showSuccessModal.id);
                  if (member) {
                    const memberId = member.memberId.replace('#', '');
                    onNavigate(`member/${memberId}` as any);
                  }
                  setShowSuccessModal(null);
                }}
                className="flex-1 py-3 bg-[#F5F2EA] hover:bg-[#EAE3D5] text-[#5C645E] font-semibold rounded-xl text-sm transition flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" /> View member
              </button>
              <button 
                onClick={() => setShowSuccessModal(null)}
                className="flex-1 py-3 bg-[#1d5335] hover:bg-[#164a28] text-white font-semibold rounded-xl text-sm transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flag & Message Modal */}
      {showFlagModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#112318]">Flag & message member</h2>
                <p className="text-sm text-[#7A827C] mt-1">
                  {approvalsData.find(a => a.id === showFlagModal)?.name} - {approvalsData.find(a => a.id === showFlagModal)?.amount.toLocaleString()} RWF
                </p>
              </div>
              <button 
                onClick={() => { setShowFlagModal(null); setFlagMessage(''); setFlagReason(''); }}
                className="text-[#7A827C] hover:text-[#C35331] transition"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Reason */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-[#2b231d] mb-2">Reason for flag</label>
              <select 
                value={flagReason}
                onChange={(e) => setFlagReason(e.target.value)}
                className="w-full px-4 py-3 border border-[#e5dfd9] rounded-xl text-sm text-[#2b231d] focus:outline-none focus:ring-1 focus:ring-[#1d5335] appearance-none bg-white"
                style={{
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2370665f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                  backgroundSize: '16px',
                  paddingRight: '40px'
                }}
              >
                <option value="">Select a reason...</option>
                <option value="Amount mismatch - penalty missing">Amount mismatch - penalty missing</option>
                <option value="Invalid proof of payment">Invalid proof of payment</option>
                <option value="Member not verified">Member not verified</option>
                <option value="Duplicate submission">Duplicate submission</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-[#2b231d] mb-2">Message to member</label>
              <textarea 
                value={flagMessage}
                onChange={(e) => setFlagMessage(e.target.value)}
                placeholder="Hi Patrick - your May payment is 2,000 short. May was overdue, so it needs the 2,000 penalty added. Please top up and resubmit and I'll approve it. Thank you."
                className="w-full px-4 py-3 border border-[#e5dfd9] rounded-xl text-sm text-[#2b231d] placeholder-[#a49a91] focus:outline-none focus:ring-1 focus:ring-[#1d5335] resize-none min-h-[120px]"
              />
            </div>

            {/* Info */}
            <div className="bg-[#f7f4eb] rounded-xl p-4 mb-6 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#70665f] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#70665f] leading-relaxed">
                The transaction stays <strong>Pending</strong> and the member is notified. This neither approves nor rejects it.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button 
                onClick={() => { setShowFlagModal(null); setFlagMessage(''); setFlagReason(''); }}
                className="flex-1 py-3 bg-[#f5f3ee] hover:bg-[#e5dfd9] text-[#5C645E] font-semibold rounded-xl text-sm transition"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (flagReason && flagMessage.trim()) {
                    handleFlagSubmit(showFlagModal);
                  } else {
                    alert('Please select a reason and enter a message.');
                  }
                }}
                className="flex-1 py-3 bg-[#1d5335] hover:bg-[#164a28] text-white font-semibold rounded-xl text-sm transition"
              >
                Flag & send message
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full bg-[#FAF8F5] rounded-[24px] shadow-sm flex overflow-hidden border border-[#E4DFD3]">
        
        {/* Sidebar */}
        <aside className="w-64 bg-[#FAF8F5] flex flex-col justify-between p-6 shrink-0 select-none">
          <div>
            <div className="flex items-center gap-3 mb-8 pl-2">
              <button onClick={() => onNavigate('overview')} className="bg-[#1d5335] text-[#FAF8F5] font-bold w-10 h-10 rounded-xl flex items-center justify-center text-sm hover:opacity-90 transition">
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
                  onClick={() => item.key === 'approvals' ? null : onNavigate(item.key as any)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[14px] transition ${
                    item.active 
                      ? 'bg-[#E6EFEA] text-[#1d5335] font-semibold' 
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
            <div className="w-10 h-10 rounded-full bg-[#1d5335] text-white flex items-center justify-center font-bold text-sm">SG</div>
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
              <h1 className="text-2xl font-bold text-[#112318] tracking-tight">Approvals</h1>
              <span className="bg-[#F6EBE6] text-[#C35331] text-[12px] font-bold px-2.5 py-1 rounded-full mt-0.5">
                {pendingCount} pending
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A827C]" />
                <input 
                  type="text" 
                  placeholder="Search approvals..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white border border-[#E4DFD3] rounded-xl text-sm text-[#112318] placeholder-[#9AA29C] focus:outline-none focus:ring-1 focus:ring-[#1d5335] w-48" 
                />
              </div>
              <div className="bg-white p-1 rounded-xl border border-[#E4DFD3] flex items-center text-sm font-semibold shadow-xs">
                <button 
                  onClick={() => setSelectedTab('pending')}
                  className={`px-4 py-1.5 rounded-lg text-[13px] transition ${
                    selectedTab === 'pending' ? 'bg-[#1F1F1F] text-white' : 'text-[#5C645E] hover:text-[#112318]'
                  }`}
                >
                  Pending
                </button>
                <button 
                  onClick={() => setSelectedTab('all')}
                  className={`px-4 py-1.5 rounded-lg text-[13px] transition ${
                    selectedTab === 'all' ? 'bg-[#1F1F1F] text-white' : 'text-[#5C645E] hover:text-[#112318]'
                  }`}
                >
                  All
                </button>
              </div>
            </div>
          </header>

          {/* Approval Cards */}
          <div className="space-y-4">
            {filteredData.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-[20px] border border-[#EAE3D5]">
                <CheckCircle className="w-12 h-12 text-[#1d5335] mx-auto mb-3 opacity-30" />
                <h3 className="text-lg font-bold text-[#112318]">No approvals</h3>
                <p className="text-sm text-[#7A827C] mt-1">All caught up!</p>
              </div>
            ) : (
              filteredData.map((item) => (
                <div key={item.id} className="bg-white rounded-[20px] p-6 border border-[#EAE3D5] flex flex-col gap-6">
                  {/* Card Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${item.bgColor} ${item.textColor} font-bold flex items-center justify-center text-sm`}>
                        {item.initials}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#112318] text-[15px] leading-tight">{item.name}</h3>
                        <p className="text-xs text-[#7A827C] mt-0.5 font-medium">Member {item.memberId} · submitted {item.submitted}</p>
                      </div>
                    </div>
                    <span className="bg-[#FEF9E6] text-[#B18817] text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wide uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B18817] inline-block"></span> Pending
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-y-4 gap-x-2 text-[13px]">
                    <div>
                      <span className="text-[10px] font-bold text-[#9AA29C] tracking-wider uppercase block mb-1">Type</span>
                      <span className="font-bold text-[#112318]">{item.type}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#9AA29C] tracking-wider uppercase block mb-1">Amount</span>
                      <span className="font-bold text-[#112318]">{item.amount.toLocaleString()} RWF</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#9AA29C] tracking-wider uppercase block mb-1">Payment Date</span>
                      <span className="font-semibold text-[#2D312E]">{item.paymentDate}</span>
                    </div>
                    <div className="md:row-span-2 flex flex-col items-center justify-center bg-[#F5F2EA] border border-dashed border-[#D5CFC1] rounded-xl p-3 text-center min-h-[96px] w-full max-w-[180px] justify-self-end">
                      <span className="text-[11px] text-[#7A827C] font-mono break-all px-1 bg-white/60 rounded border border-[#E4DFD3] py-0.5">{item.proof}</span>
                      <button 
                        onClick={() => handleViewProof(item.proof)}
                        className="text-xs font-bold text-[#1d5335] mt-2 hover:underline"
                      >
                        View proof
                      </button>
                    </div>
                    
                    <div>
                      <span className="text-[10px] font-bold text-[#9AA29C] tracking-wider uppercase block mb-1">Months Covered</span>
                      <span className="font-semibold text-[#2D312E]">{item.monthsCovered}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#9AA29C] tracking-wider uppercase block mb-1">Penalty Declared</span>
                      <span className="font-semibold text-[#2D312E]">{item.penaltyDeclared}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#9AA29C] tracking-wider uppercase block mb-1">Method</span>
                      <span className="font-semibold text-[#2D312E]">{item.method}</span>
                    </div>
                  </div>

                  {/* Status Banner */}
                  {item.matches ? (
                    <div className="bg-[#EDF6F1] border border-[#D5EADF] text-[#1E724A] rounded-xl px-4 py-3 flex justify-between items-center text-xs font-semibold">
                      <div className="flex items-center gap-2">
                        <span className="text-base">✓</span>
                        <span>System owed {item.systemOwed.toLocaleString()} · declared {item.declared.toLocaleString()} — matches</span>
                      </div>
                      {item.overdueMonths > 0 && (
                        <span className="text-[#7A827C] font-medium">{item.overdueMonths} overdue months · {item.penalties} penalties</span>
                      )}
                    </div>
                  ) : (
                    <div className="bg-[#FFF3EE] border border-[#FADCD0] text-[#B94723] rounded-xl px-4 py-3 flex justify-between items-center text-xs font-semibold">
                      <div className="flex items-center gap-2">
                        <span className="text-base">⚠</span>
                        <span>May is overdue — system owes {item.systemOwed.toLocaleString()} (incl. 2,000 penalty), member declared {item.declared.toLocaleString()}</span>
                      </div>
                      <span className="text-[#B94723] bg-[#FCECE5] px-2 py-0.5 rounded font-bold">{item.short.toLocaleString()} short</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 pt-1">
                    <button 
                      onClick={() => handleReject(item.id, item.name)}
                      className="px-5 py-2.5 border border-[#E4DFD3] text-[#C35331] font-bold rounded-xl text-[13px] hover:bg-[#FFF6F2] transition"
                    >
                      ✕ Reject
                    </button>
                    {!item.matches && (
                      <button 
                        onClick={() => setShowFlagModal(item.id)}
                        className="px-5 py-2.5 border border-[#E4DFD3] text-[#5C645E] font-bold rounded-xl text-[13px] hover:bg-gray-50 transition flex items-center gap-1.5"
                      >
                        <Flag className="w-4 h-4" /> Flag & message
                      </button>
                    )}
                    <button 
                      onClick={() => setShowApproveModal(item.id)}
                      className="px-6 py-2.5 bg-[#1d5335] hover:bg-[#164a28] text-white font-bold rounded-xl text-[13px] hover:opacity-90 transition flex items-center gap-1.5"
                    >
                      ✓ Approve
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Approvals;