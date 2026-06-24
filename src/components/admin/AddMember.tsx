import React, { useState } from 'react';
import { 
  ArrowLeft, 
  LayoutDashboard, UserCheck, Users, CreditCard, 
  AlertTriangle, ArrowUpRight, Settings, LogOut,
  UserPlus, Mail, Phone, Calendar, Info, X,
  CheckCircle, Send
} from 'lucide-react';

interface AddMemberProps {
  onBack: () => void;
  onNavigate: (page: 'overview' | 'approvals' | 'members' | 'add-member' | 'transactions' | 'penalties' | 'withdrawals' | 'settings' | `member/${string}`) => void;
  onLogout: () => void;
}

const AddMember: React.FC<AddMemberProps> = ({ onBack, onNavigate, onLogout }) => {
  const [formData, setFormData] = useState({
    fullName: 'Didier Uwase',
    phone: '+250 788 305 219',
    email: 'didier@ikimina.com',
    memberNumber: '#013',
    startMonth: '2026-07',
  });
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

  return (
    <div className="bg-[#f7f4eb] min-h-screen flex relative">
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-[#eaf3ed] flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-[#1d5335]" />
            </div>
            
            <h2 className="text-xl font-bold text-[#2b231d]">Member added</h2>
            <p className="text-sm text-[#70665f] mt-1">
              {formData.fullName} ({formData.memberNumber}) is now in the group.
            </p>

            {/* Details */}
            <div className="bg-[#f7f4eb] rounded-xl p-4 mt-4 text-left space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#2b231d]">
                <Send className="w-4 h-4 text-[#1d5335]" />
                <span>An invite was sent to {formData.phone}.</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#2b231d]">
                <Calendar className="w-4 h-4 text-[#1d5335]" />
                <span>Starts {new Date(formData.startMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => {
                  setShowSuccessModal(false);
                  // Reset form or stay on add page
                }}
                className="flex-1 py-3 bg-[#f5f3ee] hover:bg-[#e5dfd9] text-[#5C645E] font-semibold rounded-xl text-sm transition"
              >
                Add another
              </button>
              <button 
                onClick={handleDone}
                className="flex-1 py-3 bg-[#1d5335] hover:bg-[#164a28] text-white font-semibold rounded-xl text-sm transition"
              >
                Done
              </button>
            </div>
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
            <h2 className="text-2xl font-bold text-[#2b231d]">Add a member</h2>
            <p className="text-sm text-[#70665f] mt-0.5">They'll get an invite to set a password.</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-[#e5dfd9] flex flex-col gap-6">
          
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#2b231d]">Full name</label>
            <input 
              type="text" 
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3.5 border border-[#e5dfd9] rounded-xl text-[15px] text-[#2b231d] focus:outline-none focus:border-[#1d5335]"
            />
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#2b231d]">Phone</label>
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3.5 border border-[#e5dfd9] rounded-xl text-[15px] text-[#2b231d] focus:outline-none focus:border-[#1d5335]"
                />
                <Phone className="absolute right-4 text-[#b5a89e] w-5 h-5 pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#2b231d]">Email</label>
              <div className="relative flex items-center">
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 border border-[#e5dfd9] rounded-xl text-[15px] text-[#2b231d] focus:outline-none focus:border-[#1d5335]"
                />
                <Mail className="absolute right-4 text-[#b5a89e] w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Member Number & Start Month */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#2b231d]">Member number</label>
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={formData.memberNumber}
                  onChange={(e) => setFormData({ ...formData, memberNumber: e.target.value })}
                  className="w-full px-4 py-3.5 border border-[#e5dfd9] rounded-xl text-[15px] text-[#2b231d] focus:outline-none focus:border-[#1d5335]"
                />
                <span className="absolute right-4 text-[#b5a89e] text-sm font-medium pointer-events-none">auto</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#2b231d]">Start month</label>
              <div className="relative flex items-center">
                <input 
                  type="month" 
                  value={formData.startMonth}
                  onChange={(e) => setFormData({ ...formData, startMonth: e.target.value })}
                  className="w-full px-4 py-3.5 border border-[#e5dfd9] rounded-xl text-[15px] text-[#2b231d] focus:outline-none focus:border-[#1d5335]"
                />
                <Calendar className="absolute right-4 text-[#b5a89e] w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-[#f7f4eb] rounded-xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-[#70665f] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[#70665f] leading-relaxed">
              Shares and penalties begin from the start month you choose — earlier months won't count against them.
            </p>
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
              <UserPlus className="w-4 h-4" /> Create member
            </button>
          </div>

        </form>
      </main>
    </div>
  );
};

export default AddMember;