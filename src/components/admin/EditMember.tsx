import React, { useState } from 'react';
import { 
  ArrowLeft, 
  LayoutDashboard, UserCheck, Users, CreditCard, 
  AlertTriangle, ArrowUpRight, Settings, LogOut,
  Mail, Phone, User, Save,
  CheckCircle
} from 'lucide-react';

interface EditMemberProps {
  onBack: () => void;
  onNavigate: (page: 'overview' | 'approvals' | 'members' | 'add-member' | 'edit-member' | 'transactions' | 'penalties' | 'withdrawals' | 'settings' | `member/${string}` | `edit-member/${string}`) => void;
  onLogout: () => void;
  memberId: string;
}

const EditMember: React.FC<EditMemberProps> = ({ onBack, onNavigate, onLogout, memberId }) => {
  // Get member data based on ID
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

  const memberData = getMemberData(memberId);
  
  const [formData, setFormData] = useState({
    fullName: memberData.name,
    phone: memberData.phone,
    email: memberData.email,
    status: memberData.status,
    memberId: memberData.memberId,
    joinedDate: memberData.joinedDate,
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

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
            <div className="w-16 h-16 rounded-full bg-[#eaf3ed] flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-[#1d5335]" />
            </div>
            <h2 className="text-xl font-bold text-[#2b231d]">Member updated</h2>
            <p className="text-sm text-[#70665f] mt-1">
              {formData.fullName}'s information has been saved.
            </p>
            <button 
              onClick={handleDone}
              className="w-full mt-6 py-3 bg-[#1d5335] hover:bg-[#164a28] text-white font-semibold rounded-xl text-sm transition"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Deactivate Confirmation Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#FCECE5] flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-[#C35331]" />
              </div>
              
              <h2 className="text-xl font-bold text-[#2b231d]">Deactivate {formData.fullName}?</h2>
              <p className="text-sm text-[#70665f] mt-2 leading-relaxed">
                They will no longer be able to log in or submit transactions.<br />
                Their shares, contributions and penalties are kept — you can reactivate them anytime.
              </p>

              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setShowDeactivateModal(false)}
                  className="flex-1 py-3 bg-[#f5f3ee] hover:bg-[#e5dfd9] text-[#5C645E] font-semibold rounded-xl text-sm transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setFormData({ ...formData, status: 'Inactive' });
                    setShowDeactivateModal(false);
                    setShowSuccessModal(true);
                  }}
                  className="flex-1 py-3 bg-[#C35331] hover:bg-[#a84426] text-white font-semibold rounded-xl text-sm transition"
                >
                  Deactivate
                </button>
              </div>
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-[#e5dfd9] rounded-lg transition">
              <ArrowLeft className="w-5 h-5 text-[#70665f]" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-[#2b231d]">Edit member</h2>
              <p className="text-sm text-[#70665f] mt-0.5">
                Member {formData.memberId} · joined {formData.joinedDate}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-[#e5dfd9] flex flex-col gap-6">
          
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#2b231d]">Full name</label>
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3.5 pl-11 border border-[#e5dfd9] rounded-xl text-[15px] text-[#2b231d] focus:outline-none focus:border-[#1d5335]"
              />
              <User className="absolute left-4 text-[#b5a89e] w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#2b231d]">Phone</label>
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3.5 pl-11 border border-[#e5dfd9] rounded-xl text-[15px] text-[#2b231d] focus:outline-none focus:border-[#1d5335]"
              />
              <Phone className="absolute left-4 text-[#b5a89e] w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#2b231d]">Email</label>
            <div className="relative flex items-center">
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3.5 pl-11 border border-[#e5dfd9] rounded-xl text-[15px] text-[#2b231d] focus:outline-none focus:border-[#1d5335]"
              />
              <Mail className="absolute left-4 text-[#b5a89e] w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Account Status */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#2b231d]">Account status</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: 'Active' })}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition flex-1 ${
                  formData.status === 'Active'
                    ? 'bg-[#1d5335] text-white'
                    : 'bg-[#f5f3ee] text-[#5C645E] hover:bg-[#e5dfd9]'
                }`}
              >
                Active
              </button>
              <button
                type="button"
                onClick={() => {
                  if (formData.status === 'Active') {
                    setShowDeactivateModal(true);
                  } else {
                    setFormData({ ...formData, status: 'Active' });
                  }
                }}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition flex-1 ${
                  formData.status === 'Inactive'
                    ? 'bg-[#c95231] text-white'
                    : 'bg-[#f5f3ee] text-[#5C645E] hover:bg-[#e5dfd9]'
                }`}
              >
                Inactive
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-[#f0ede8]">
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
              <Save className="w-4 h-4" /> Save changes
            </button>
          </div>

        </form>
      </main>
    </div>
  );
};

export default EditMember;