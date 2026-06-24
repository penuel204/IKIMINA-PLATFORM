import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Filter, 
  LayoutDashboard, UserCheck, Users, CreditCard, 
  AlertTriangle, ArrowUpRight, Settings, LogOut,
  Download, Eye, ChevronDown, Plus, 
  TrendingUp, TrendingDown, Clock, Calendar,
  Upload, FileText, XCircle, CheckCircle, 
  AlertCircle
} from 'lucide-react';

interface WithdrawalsProps {
  onBack: () => void;
  onNavigate: (page: 'overview' | 'approvals' | 'members' | 'transactions' | 'penalties' | 'withdrawals' | 'settings') => void;
  onLogout: () => void;
}

const Withdrawals: React.FC<WithdrawalsProps> = ({ onBack, onNavigate, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [formData, setFormData] = useState({
    amount: '1,000,000',
    date: '15 June 2026',
    category: 'Investment',
    reference: 'Land plot — Kicukiro',
    justification: '',
    proofFile: null as File | null,
    notes: 'Approved by group vote on 12 Jun 2026. Deposit toward land purchase.'
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const withdrawalsData = [
    { id: '1', date: '15 Jun 2026', member: 'Samuel Gatera', initials: 'SG', amount: 1000000, category: 'Investment', reference: 'Land plot — Kicukiro', status: 'Approved' },
    { id: '2', date: '20 Mar 2026', member: 'Samuel Gatera', initials: 'SG', amount: 500000, category: 'Investment', reference: 'Poultry farm', status: 'Approved' },
    { id: '3', date: '10 Jan 2026', member: 'Jean-Paul Habimana', initials: 'JH', amount: 200000, category: 'Emergency', reference: 'Medical expenses', status: 'Pending' },
    { id: '4', date: '05 Dec 2025', member: 'Eric Mugisha', initials: 'EM', amount: 150000, category: 'Education', reference: 'School fees', status: 'Rejected' },
  ];

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', key: 'overview' },
    { icon: UserCheck, label: 'Approvals', key: 'approvals', badge: '4' },
    { icon: Users, label: 'Members', key: 'members' },
    { icon: CreditCard, label: 'Transactions', key: 'transactions' },
    { icon: AlertTriangle, label: 'Penalties', key: 'penalties' },
    { icon: ArrowUpRight, label: 'Withdrawals', key: 'withdrawals', active: true },
    { icon: Settings, label: 'Settings', key: 'settings' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, proofFile: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };

  const filteredData = withdrawalsData.filter(item => {
    const matchesSearch = item.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
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
    <div className="bg-[#f7f4eb] min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#fcfbfa] border-r border-[#e5dfd9] flex flex-col justify-between p-6 fixed h-screen left-0 top-0">
        <div>
          {/* Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[#1d5335] text-white font-bold w-10 h-10 rounded-lg flex items-center justify-center text-sm">IK</div>
            <div>
              <h1 className="text-base font-bold leading-tight">IKIMINA</h1>
              <span className="text-[11px] text-[#70665f] uppercase tracking-wider font-semibold">Treasurer Console</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => item.key === 'withdrawals' ? null : onNavigate(item.key as any)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                  item.active 
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

        {/* User Profile */}
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
      <main className="ml-[260px] flex-1 p-10 max-w-[1200px]">
        <header className="mb-7">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-[#e5dfd9] rounded-lg transition">
              <ArrowLeft className="w-5 h-5 text-[#70665f]" />
            </button>
            <h2 className="text-2xl font-bold text-[#2b231d]">Record a withdrawal</h2>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
          
          {/* Form Section */}
          <section className="bg-white rounded-2xl p-8 border border-[#e5dfd9] flex flex-col gap-6">
            
            {/* Transaction Type */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#2b231d]">Transaction type</label>
              <div className="bg-[#fff6f3] border border-[#f9ded3] rounded-xl p-4 flex justify-between items-center">
                <div className="flex items-center gap-2 font-semibold text-[#a44c24] text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#a44c24]"></span>
                  Withdrawal — money out
                </div>
                <span className="text-sm text-[#b57a5c] font-medium">Reduces the group fund</span>
              </div>
            </div>

            {/* Amount & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#2b231d]">Amount</label>
                <div className="relative flex items-center">
                  <input 
                    type="text" 
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-4 py-3.5 border border-[#e5dfd9] rounded-xl text-[15px] text-[#2b231d] focus:outline-none focus:border-[#b5a89e]"
                  />
                  <span className="absolute right-4 text-[#b5a89e] text-sm font-medium pointer-events-none">RWF</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#2b231d]">Date</label>
                <div className="relative flex items-center">
                  <input 
                    type="text" 
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3.5 border border-[#e5dfd9] rounded-xl text-[15px] text-[#2b231d] focus:outline-none focus:border-[#b5a89e]"
                  />
                  <Calendar className="absolute right-4 text-[#70665f] w-5 h-5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Category & Reference */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#2b231d]">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3.5 border border-[#e5dfd9] rounded-xl text-[15px] text-[#2b231d] focus:outline-none focus:border-[#b5a89e] appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2370665f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    backgroundSize: '16px',
                    paddingRight: '40px'
                  }}
                >
                  <option value="Investment">Investment</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Education">Education</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#2b231d]">Reference</label>
                <input 
                  type="text" 
                  value={formData.reference}
                  onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                  className="w-full px-4 py-3.5 border border-[#e5dfd9] rounded-xl text-[15px] text-[#2b231d] focus:outline-none focus:border-[#b5a89e]"
                />
              </div>
            </div>

            {/* Justification / Proof */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#2b231d]">Justification / proof</label>
              <div className="border-2 border-dashed border-[#e3ded6] bg-[#faf9f6] rounded-xl p-8 text-center cursor-pointer hover:bg-[#f5f3ee] transition flex flex-col items-center gap-3">
                <input
                  type="file"
                  id="proofUpload"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="proofUpload" className="cursor-pointer flex flex-col items-center gap-3">
                  <div className="w-9 h-9 bg-white border border-[#e5dfd9] rounded-lg flex items-center justify-center shadow-sm">
                    <Upload className="w-4 h-4 text-[#4a3f35]" />
                  </div>
                  <div className="text-sm font-medium text-[#4a3f35]">
                    {formData.proofFile ? formData.proofFile.name : 'Receipt or group resolution document'}
                  </div>
                  <div className="text-[11px] text-[#a49a91] uppercase tracking-wide font-medium">
                    PDF · JPG · PNG — max 5 MB
                  </div>
                  {formData.proofFile && (
                    <span className="text-xs text-[#1d5335] bg-[#edf5ee] px-3 py-1 rounded-full">
                      ✓ File uploaded
                    </span>
                  )}
                </label>
              </div>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#2b231d]">Notes</label>
              <textarea 
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3.5 border border-[#e5dfd9] rounded-xl text-[15px] text-[#2b231d] focus:outline-none focus:border-[#b5a89e] resize-y min-h-[70px]"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              onClick={handleSubmit}
              className="w-full py-4 bg-[#a44c24] hover:bg-[#8a3d1c] text-white font-semibold rounded-xl text-[15px] transition mt-2"
            >
              Record withdrawal
            </button>

          </section>

          {/* Side Panel - Fund Impact */}
          <section className="bg-white rounded-2xl p-6 border border-[#e5dfd9] flex flex-col gap-5">
            <h3 className="text-[15px] font-bold text-[#2b231d]">Fund impact</h3>
            
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#70665f]">Current fund value</span>
                <span className="font-semibold text-[#2b231d]">3,526,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#70665f]">This withdrawal</span>
                <span className="font-semibold text-[#a44c24]">- 1,000,000</span>
              </div>
              
              <div className="border-t border-[#e5dfd9] my-1"></div>
              
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-[#70665f]">Balance after</span>
                <span className="text-2xl font-bold text-[#2b231d] tracking-tight">2,526,000</span>
              </div>
            </div>

            <div className="bg-[#fff0ea] rounded-xl p-3.5 flex gap-2.5 items-start">
              <AlertCircle className="w-4 h-4 text-[#a44c24] mt-0.5 flex-shrink-0" />
              <div className="text-xs text-[#8c4220] leading-relaxed">
                Withdrawals reduce the group fund and are permanently logged in the audit trail with your name attached.
              </div>
            </div>
          </section>

        </div>

        {/* Withdrawals History Table */}
        <div className="bg-white rounded-2xl border border-[#e5dfd9] overflow-hidden mt-8">
          <div className="px-6 py-4 border-b border-[#f0ede8] flex justify-between items-center">
            <h3 className="font-semibold text-[#2b231d]">Withdrawal history</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#70665f]" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-[#f5f3ee] border border-[#e5dfd9] rounded-xl text-sm text-[#2b231d] placeholder-[#a49a91] focus:outline-none focus:border-[#b5a89e] w-40" 
                />
              </div>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="py-2 px-3 bg-[#f5f3ee] border border-[#e5dfd9] rounded-xl text-sm text-[#2b231d] focus:outline-none focus:border-[#b5a89e]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#f5f3ee] border-b border-[#e5dfd9]">
                  <th className="px-6 py-3 text-[10px] font-bold text-[#70665f] uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-[#70665f] uppercase tracking-wider">Member</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-[#70665f] uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-[#70665f] uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-[#70665f] uppercase tracking-wider">Reference</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-[#70665f] uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0ede8]">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-[#70665f]">No withdrawals found</td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-[#faf9f6] transition">
                      <td className="px-6 py-3.5 text-sm text-[#70665f]">{item.date}</td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#edf5ee] text-[#1d5335] flex items-center justify-center text-xs font-bold">
                            {item.initials}
                          </div>
                          <span className="font-medium text-[#2b231d]">{item.member}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 font-bold text-[#a44c24]">-{item.amount.toLocaleString()} RWF</td>
                      <td className="px-6 py-3.5 text-sm text-[#70665f]">{item.category}</td>
                      <td className="px-6 py-3.5 text-sm text-[#70665f]">{item.reference}</td>
                      <td className="px-6 py-3.5">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadge(item.status)}`}>
                          {item.status}
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
  );
};

export default Withdrawals;