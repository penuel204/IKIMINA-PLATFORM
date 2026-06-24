import React, { useState } from 'react';
import { 
  ArrowLeft, 
  LayoutDashboard, UserCheck, Users, CreditCard, 
  AlertTriangle, ArrowUpRight, Settings as SettingsIcon, LogOut,
  Info, ChevronDown
} from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
  onNavigate: (page: 'overview' | 'approvals' | 'members' | 'transactions' | 'penalties' | 'withdrawals' | 'settings') => void;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack, onNavigate, onLogout }) => {
  const [formData, setFormData] = useState({
    monthlyShare: '20,000',
    dueDay: 7,
    penaltyRate: 10,
    penaltyAmount: '2,000',
    compoundMonthly: false,
    allocateOldestFirst: true,
    groupName: 'Gents IKIMINA for Investment',
    currency: 'RWF',
    cycleStart: 'January 2025',
    secondApprover: false,
    membersSelfRegister: false,
    paymentReminders: true,
  });

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', key: 'overview' },
    { icon: UserCheck, label: 'Approvals', key: 'approvals', badge: '4' },
    { icon: Users, label: 'Members', key: 'members' },
    { icon: CreditCard, label: 'Transactions', key: 'transactions' },
    { icon: AlertTriangle, label: 'Penalties', key: 'penalties' },
    { icon: ArrowUpRight, label: 'Withdrawals', key: 'withdrawals' },
    { icon: SettingsIcon, label: 'Settings', key: 'settings', active: true },
  ];

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const updateDueDay = (delta: number) => {
    const newDay = Math.max(1, Math.min(31, formData.dueDay + delta));
    setFormData({ ...formData, dueDay: newDay });
  };

  const toggleSwitch = (key: keyof typeof formData) => {
    setFormData({ ...formData, [key]: !formData[key] });
  };

  return (
    <div className="bg-[#eae6db] min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#f7f5ee] border-r border-[#e2e0d9] flex flex-col justify-between p-6 fixed h-screen left-0 top-0">
        <div>
          <div className="flex items-center gap-3 mb-8 pl-2">
            <div className="bg-[#236141] text-white font-bold w-10 h-10 rounded-lg flex items-center justify-center text-sm">IK</div>
            <div>
              <h1 className="text-[15px] font-bold tracking-wide">IKIMINA</h1>
              <p className="text-[10px] text-[#747875] font-semibold tracking-wider">TREASURER CONSOLE</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => item.key === 'settings' ? null : onNavigate(item.key as any)}
                className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition ${
                  item.active 
                    ? 'bg-[#eaf3ed] text-[#236141] font-semibold' 
                    : 'text-[#747875] hover:text-[#2d312e] hover:bg-[rgba(0,0,0,0.02)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-[18px] h-[18px]" strokeWidth={2} />
                  {item.label}
                </div>
                {item.badge && (
                  <span className="bg-[#c95231] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-[#e2e0d9]">
          <div className="w-9 h-9 rounded-full bg-[#2e614a] text-white flex items-center justify-center font-semibold text-sm">SG</div>
          <div>
            <h4 className="text-sm font-semibold">Samuel Gatera</h4>
            <p className="text-[11px] text-[#747875]">Treasurer · Admin</p>
          </div>
          <button onClick={onLogout} className="ml-auto text-[#747875] hover:text-[#c95231] transition">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-[260px] flex-1 bg-[#faf9f5] flex flex-col">
        {/* Header Bar */}
        <div className="flex justify-between items-center px-10 py-6">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-[#e2e0d9] rounded-lg transition">
              <ArrowLeft className="w-5 h-5 text-[#747875]" />
            </button>
            <h1 className="text-[22px] font-bold text-[#2d312e]">Group settings</h1>
          </div>
          <button 
            onClick={handleSave}
            className="bg-[#236141] hover:bg-[#1b4b32] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
          >
            Save changes
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="px-10 pb-10 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-120px)]">
          
          {/* Alert Banner */}
          <div className="bg-[#fdf5ea] border border-[#f5e3cc] rounded-xl px-4 py-4 flex gap-3 text-[13px] text-[#614624] leading-relaxed">
            <span className="text-[#b37322] font-bold text-base">ⓘ</span>
            <span>
              Changes to the share or penalty rate apply to <strong className="text-[#b37322]">future cycles only</strong> — past months keep the values they were calculated with. Major changes should follow a group vote.
            </span>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Contribution Rules */}
            <div className="bg-white rounded-xl border border-[#e2e0d9] p-6 flex flex-col gap-4">
              <div>
                <h3 className="text-[15px] font-bold text-[#2d312e]">Contribution rules</h3>
                <p className="text-xs text-[#747875]">What every member owes each month.</p>
              </div>
              
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[13px] font-semibold text-[#2d312e] block mb-2">Monthly share</label>
                  <div className="relative flex items-center">
                    <input 
                      type="text" 
                      value={formData.monthlyShare}
                      onChange={(e) => setFormData({ ...formData, monthlyShare: e.target.value })}
                      className="w-full px-4 py-3 border border-[#e2e0d9] rounded-lg text-[15px] font-semibold text-[#2d312e] bg-white focus:outline-none focus:border-[#236141]"
                    />
                    <span className="absolute right-4 text-[#b2b5b3] text-[13px] font-medium pointer-events-none">RWF</span>
                  </div>
                </div>

                <div>
                  <label className="text-[13px] font-semibold text-[#2d312e] block mb-2">Due day of month</label>
                  <div className="flex items-center border border-[#e2e0d9] rounded-lg overflow-hidden bg-white">
                    <button 
                      onClick={() => updateDueDay(-1)}
                      className="bg-[#f4f3ef] hover:bg-[#eae8e1] border-none w-11 h-11 text-lg cursor-pointer text-[#747875] flex items-center justify-center transition"
                    >
                      −
                    </button>
                    <div className="flex-1 text-center text-sm font-semibold text-[#2d312e]">{formData.dueDay}th</div>
                    <button 
                      onClick={() => updateDueDay(1)}
                      className="bg-[#f4f3ef] hover:bg-[#eae8e1] border-none w-11 h-11 text-lg cursor-pointer text-[#747875] flex items-center justify-center transition"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[11px] text-[#747875] mt-1 block">Penalties generate the day after.</span>
                </div>
              </div>
            </div>

            {/* Penalties */}
            <div className="bg-white rounded-xl border border-[#e2e0d9] p-6 flex flex-col gap-4">
              <div>
                <h3 className="text-[15px] font-bold text-[#2d312e]">Penalties</h3>
                <p className="text-xs text-[#747875]">Late fee for a missed month.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] font-semibold text-[#2d312e] block mb-2">Penalty rate</label>
                  <div className="relative flex items-center">
                    <input 
                      type="text" 
                      value={formData.penaltyRate}
                      onChange={(e) => setFormData({ ...formData, penaltyRate: Number(e.target.value) })}
                      className="w-full px-4 py-3 border border-[#e2e0d9] rounded-lg text-[15px] font-semibold text-[#2d312e] bg-white focus:outline-none focus:border-[#236141]"
                    />
                    <span className="absolute right-4 text-[#b2b5b3] text-[13px] font-medium pointer-events-none">%</span>
                  </div>
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#2d312e] block mb-2">= Penalty amount</label>
                  <div className="relative flex items-center">
                    <input 
                      type="text" 
                      value={formData.penaltyAmount}
                      disabled
                      className="w-full px-4 py-3 border border-[#e2e0d9] rounded-lg text-[15px] font-semibold text-[#2d312e] bg-[#fcfbfa] border-dashed focus:outline-none"
                    />
                    <span className="absolute right-4 text-[#b2b5b3] text-[13px] font-medium pointer-events-none">RWF</span>
                  </div>
                </div>
              </div>

              {/* Compound monthly toggle */}
              <div className="flex justify-between items-start gap-6 py-1">
                <div>
                  <h4 className="text-[13px] font-semibold text-[#2d312e]">Compound monthly</h4>
                  <p className="text-[11px] text-[#747875] leading-relaxed">Penalty grows each month unpaid</p>
                </div>
                <button 
                  onClick={() => toggleSwitch('compoundMonthly')}
                  className={`relative w-11 h-6 rounded-full transition flex-shrink-0 ${
                    formData.compoundMonthly ? 'bg-[#236141]' : 'bg-[#dcdad4]'
                  }`}
                >
                  <div className={`absolute top-0.5 w-[18px] h-[18px] bg-white rounded-full shadow-sm transition ${
                    formData.compoundMonthly ? 'right-0.5' : 'left-0.5'
                  }`} />
                </button>
              </div>

              {/* Allocate oldest unpaid first toggle */}
              <div className="flex justify-between items-start gap-6 py-1">
                <div>
                  <h4 className="text-[13px] font-semibold text-[#2d312e]">Allocate oldest unpaid first</h4>
                  <p className="text-[11px] text-[#747875] leading-relaxed">Auto-apply payments to oldest months</p>
                </div>
                <button 
                  onClick={() => toggleSwitch('allocateOldestFirst')}
                  className={`relative w-11 h-6 rounded-full transition flex-shrink-0 ${
                    formData.allocateOldestFirst ? 'bg-[#236141]' : 'bg-[#dcdad4]'
                  }`}
                >
                  <div className={`absolute top-0.5 w-[18px] h-[18px] bg-white rounded-full shadow-sm transition ${
                    formData.allocateOldestFirst ? 'right-0.5' : 'left-0.5'
                  }`} />
                </button>
              </div>
            </div>

            {/* Group Profile */}
            <div className="bg-white rounded-xl border border-[#e2e0d9] p-6 flex flex-col gap-4">
              <div>
                <h3 className="text-[15px] font-bold text-[#2d312e]">Group profile</h3>
                <p className="text-xs text-[#747875]">Identity & locale.</p>
              </div>

              <div>
                <label className="text-[13px] font-semibold text-[#2d312e] block mb-2">Group name</label>
                <input 
                  type="text" 
                  value={formData.groupName}
                  onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                  className="w-full px-4 py-3 border border-[#e2e0d9] rounded-lg text-[15px] font-semibold text-[#2d312e] bg-white focus:outline-none focus:border-[#236141]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] font-semibold text-[#2d312e] block mb-2">Currency</label>
                  <select 
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full px-4 py-3 border border-[#e2e0d9] rounded-lg text-[15px] font-semibold text-[#2d312e] bg-white focus:outline-none focus:border-[#236141] appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23747875' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                      backgroundSize: '16px',
                      paddingRight: '40px'
                    }}
                  >
                    <option value="RWF">RWF</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#2d312e] block mb-2">Cycle start</label>
                  <input 
                    type="text" 
                    value={formData.cycleStart}
                    disabled
                    className="w-full px-4 py-3 border border-[#e2e0d9] rounded-lg text-[15px] font-semibold text-[#2d312e] bg-[#fcfbfa] border-dashed focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Governance */}
            <div className="bg-white rounded-xl border border-[#e2e0d9] p-6 flex flex-col gap-4">
              <div>
                <h3 className="text-[15px] font-bold text-[#2d312e]">Governance</h3>
                <p className="text-xs text-[#747875]">Approvals & access.</p>
              </div>

              {/* Second approver toggle */}
              <div className="flex justify-between items-start gap-6 py-1">
                <div>
                  <h4 className="text-[13px] font-semibold text-[#2d312e]">Second approver for withdrawals</h4>
                  <p className="text-[11px] text-[#747875] leading-relaxed">A second admin must co-sign</p>
                </div>
                <button 
                  onClick={() => toggleSwitch('secondApprover')}
                  className={`relative w-11 h-6 rounded-full transition flex-shrink-0 ${
                    formData.secondApprover ? 'bg-[#236141]' : 'bg-[#dcdad4]'
                  }`}
                >
                  <div className={`absolute top-0.5 w-[18px] h-[18px] bg-white rounded-full shadow-sm transition ${
                    formData.secondApprover ? 'right-0.5' : 'left-0.5'
                  }`} />
                </button>
              </div>

              {/* Members self-register toggle */}
              <div className="flex justify-between items-start gap-6 py-1">
                <div>
                  <h4 className="text-[13px] font-semibold text-[#2d312e]">Members self-register</h4>
                  <p className="text-[11px] text-[#747875] leading-relaxed">Admin approves new sign-ups</p>
                </div>
                <button 
                  onClick={() => toggleSwitch('membersSelfRegister')}
                  className={`relative w-11 h-6 rounded-full transition flex-shrink-0 ${
                    formData.membersSelfRegister ? 'bg-[#236141]' : 'bg-[#dcdad4]'
                  }`}
                >
                  <div className={`absolute top-0.5 w-[18px] h-[18px] bg-white rounded-full shadow-sm transition ${
                    formData.membersSelfRegister ? 'right-0.5' : 'left-0.5'
                  }`} />
                </button>
              </div>

              {/* Payment reminders toggle */}
              <div className="flex justify-between items-start gap-6 py-1">
                <div>
                  <h4 className="text-[13px] font-semibold text-[#2d312e]">Payment reminders</h4>
                  <p className="text-[11px] text-[#747875] leading-relaxed">Notify members before the 7th</p>
                </div>
                <button 
                  onClick={() => toggleSwitch('paymentReminders')}
                  className={`relative w-11 h-6 rounded-full transition flex-shrink-0 ${
                    formData.paymentReminders ? 'bg-[#236141]' : 'bg-[#dcdad4]'
                  }`}
                >
                  <div className={`absolute top-0.5 w-[18px] h-[18px] bg-white rounded-full shadow-sm transition ${
                    formData.paymentReminders ? 'right-0.5' : 'left-0.5'
                  }`} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;