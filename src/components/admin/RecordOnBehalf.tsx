import React, { useState } from 'react';
import { 
  ArrowLeft, 
  LayoutDashboard, UserCheck, Users, CreditCard, 
  AlertTriangle, ArrowUpRight, Settings, LogOut,
  Calendar, DollarSign, FileText, User, CheckCircle,
  XCircle, Clock, Info, Plus, Minus
} from 'lucide-react';

interface RecordOnBehalfProps {
  onBack: () => void;
  onNavigate: (page: 'overview' | 'approvals' | 'members' | 'add-member' | 'edit-member' | 'transactions' | 'penalties' | 'withdrawals' | 'settings' | `member/${string}` | `edit-member/${string}`) => void;
  onLogout: () => void;
  memberId: string;
  memberName: string;
  memberNumber: string;
}

const RecordOnBehalf: React.FC<RecordOnBehalfProps> = ({ 
  onBack, 
  onNavigate, 
  onLogout, 
  memberId, 
  memberName, 
  memberNumber 
}) => {
  const [hasPenalty, setHasPenalty] = useState(false);
  const [amount, setAmount] = useState(44000);
  const [months, setMonths] = useState(2);
  const [paymentDate, setPaymentDate] = useState('2026-06-20');
  const [note, setNote] = useState('Received 44,000 in cash at the June meeting — covers April & May.');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', key: 'overview' },
    { icon: UserCheck, label: 'Approvals', key: 'approvals', badge: '4' },
    { icon: Users, label: 'Members', key: 'members' },
    { icon: CreditCard, label: 'Transactions', key: 'transactions' },
    { icon: AlertTriangle, label: 'Penalties', key: 'penalties' },
    { icon: ArrowUpRight, label: 'Withdrawals', key: 'withdrawals' },
    { icon: Settings, label: 'Settings', key: 'settings' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  const handleDone = () => {
    setShowSuccessModal(false);
    onNavigate('members');
  };

  // Calculate month label
  const getMonthLabel = () => {
    if (months === 1) return 'Apr 2026 (1)';
    if (months === 2) return 'Apr–May 2026 (2)';
    return `Apr–${new Date(2026, 3 + months - 1, 1).toLocaleDateString('en-US', { month: 'short' })} 2026 (${months})`;
  };

  return (
    <div className="bg-[#f7f4eb] min-h-screen flex relative">
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-[#eaf3ed] flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-[#1d5335]" />
            </div>
            <h2 className="text-xl font-bold text-[#2b231d]">Contribution recorded</h2>
            <p className="text-sm text-[#70665f] mt-1">
              {amount.toLocaleString()} RWF recorded for {memberName}.
            </p>
            <div className="bg-[#f7f4eb] rounded-xl p-4 mt-4 text-left space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#2b231d]">
                <User className="w-4 h-4 text-[#1d5335]" />
                <span>Recorded by you (Samuel Gatera) and auto-approved.</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#2b231d]">
                <FileText className="w-4 h-4 text-[#1d5335]" />
                <span>The entry is attributed to you in the audit log.</span>
              </div>
            </div>
            <button 
              onClick={handleDone}
              className="w-full mt-6 py-3 bg-[#1d5335] hover:bg-[#164a28] text-white font-semibold rounded-xl text-sm transition"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-[260px] bg-[#fcfbfa] border-r border-[#e5dfd9] flex flex-col justify-between p-6 fixed h-screen left-0 top-0">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[#1d5335] text-white font-bold w-10 h-10 rounded-lg flex items-center justify-center text-sm">IK</div>
            <div>
              <h1 className="text-base font-bold leading-tight">IKIMINA</h1>
              <span className="text-[11px] text-[#70665f] uppercase tracking-wider font-semibold">Treasurer Console</span>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => item.key === 'members' ? null : onNavigate(item.key as any)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                  item.key === 'members'
                    ? 'bg-[#edf5ee] text-[#1d5335] font-semibold' 
                    : 'text-[#70665f] hover:bg-[#f4f1ea] hover:text-[#2b231d]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-[18px] h-[18px]" strokeWidth={2} />
                  {item.label}
                </div>
                {item.badge && (
                  <span className="bg-[#a44c24] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-[#e5dfd9]">
          <div className="w-9 h-9 rounded-full bg-[#1d5335] text-white flex items-center justify-center font-semibold text-sm">SG</div>
          <div>
            <h4 className="text-sm font-semibold">Samuel Gatera</h4>
            <p className="text-[11px] text-[#70665f]">Treasurer · Admin</p>
          </div>
          <button onClick={onLogout} className="ml-auto text-[#70665f] hover:text-[#a44c24] transition">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-[260px] flex-1 p-10 max-w-[800px]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={onBack} className="p-1 hover:bg-[#e5dfd9] rounded-lg transition">
            <ArrowLeft className="w-5 h-5 text-[#70665f]" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-[#2b231d]">Record on behalf of {memberName}</h2>
            <p className="text-sm text-[#70665f] mt-0.5">
              For a member who paid you in cash or off-app.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-[#e5dfd9] flex flex-col gap-6">
          
          {/* Penalty Toggle */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#2b231d]">Penalty included?</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setHasPenalty(true)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition flex-1 ${
                  hasPenalty
                    ? 'bg-[#1d5335] text-white'
                    : 'bg-[#f5f3ee] text-[#5C645E] hover:bg-[#e5dfd9]'
                }`}
              >
                With penalty
              </button>
              <button
                type="button"
                onClick={() => setHasPenalty(false)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition flex-1 ${
                  !hasPenalty
                    ? 'bg-[#1d5335] text-white'
                    : 'bg-[#f5f3ee] text-[#5C645E] hover:bg-[#e5dfd9]'
                }`}
              >
                Without penalty
              </button>
            </div>
          </div>

          {/* Amount, Months, Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#2b231d]">Amount</label>
              <div className="relative flex items-center">
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-3.5 border border-[#e5dfd9] rounded-xl text-[15px] text-[#2b231d] focus:outline-none focus:border-[#1d5335]"
                />
                <span className="absolute right-4 text-[#b5a89e] text-sm font-medium pointer-events-none">RWF</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#2b231d]">Months</label>
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={getMonthLabel()}
                  readOnly
                  className="w-full px-4 py-3.5 border border-[#e5dfd9] rounded-xl text-[15px] text-[#2b231d] bg-[#fcfbfa] focus:outline-none"
                />
                <div className="absolute right-2 flex gap-1">
                  <button 
                    type="button"
                    onClick={() => setMonths(Math.max(1, months - 1))}
                    className="w-8 h-8 bg-[#f5f3ee] hover:bg-[#e5dfd9] rounded-lg flex items-center justify-center transition"
                  >
                    <Minus className="w-4 h-4 text-[#5C645E]" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => setMonths(months + 1)}
                    className="w-8 h-8 bg-[#f5f3ee] hover:bg-[#e5dfd9] rounded-lg flex items-center justify-center transition"
                  >
                    <Plus className="w-4 h-4 text-[#5C645E]" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#2b231d]">Date</label>
              <div className="relative flex items-center">
                <input 
                  type="date" 
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-full px-4 py-3.5 border border-[#e5dfd9] rounded-xl text-[15px] text-[#2b231d] focus:outline-none focus:border-[#1d5335]"
                />
                <Calendar className="absolute right-4 text-[#b5a89e] w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Proof / Note */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#2b231d]">Proof / note (optional)</label>
            <textarea 
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-4 py-3.5 border border-[#e5dfd9] rounded-xl text-[15px] text-[#2b231d] placeholder-[#b5a89e] focus:outline-none focus:border-[#1d5335] resize-none min-h-[80px]"
              placeholder="Add proof or note..."
            />
          </div>

          {/* Info Box */}
          <div className="bg-[#f7f4eb] rounded-xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-[#1d5335] flex-shrink-0 mt-0.5" />
            <div className="text-sm text-[#70665f] leading-relaxed">
              <p>Recorded by you (Samuel Gatera) and <strong>auto-approved</strong>.</p>
              <p className="mt-1">The entry is attributed to you in the audit log.</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={onBack}
              className="flex-1 py-3.5 bg-[#f5f3ee] hover:bg-[#e5dfd9] text-[#5C645E] font-semibold rounded-xl text-sm transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3.5 bg-[#1d5335] hover:bg-[#164a28] text-white font-semibold rounded-xl text-sm transition flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" /> Record & approve
            </button>
          </div>

        </form>
      </main>
    </div>
  );
};

export default RecordOnBehalf;