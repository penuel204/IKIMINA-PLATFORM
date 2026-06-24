import React from 'react';
import { 
  LayoutDashboard, CheckSquare, Users, CreditCard, 
  AlertTriangle, ArrowUpRight, Settings, LogOut
} from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
  currentPage: string;
  onNavigate: (page: 'overview' | 'approvals' | 'members' | 'transactions' | 'penalties' | 'withdrawals' | 'settings') => void;
  pendingApprovalsCount?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout, currentPage, onNavigate, pendingApprovalsCount = 0 }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', key: 'overview' },
    { icon: CheckSquare, label: 'Approvals', key: 'approvals', badge: pendingApprovalsCount > 0 ? pendingApprovalsCount.toString() : undefined },
    { icon: Users, label: 'Members', key: 'members' },
    { icon: CreditCard, label: 'Transactions', key: 'transactions' },
    { icon: AlertTriangle, label: 'Penalties', key: 'penalties' },
    { icon: ArrowUpRight, label: 'Withdrawals', key: 'withdrawals' },
    { icon: Settings, label: 'Settings', key: 'settings' },
  ];

  return (
    <aside className="w-64 bg-[#FAF8F5] flex flex-col justify-between p-6 shrink-0 select-none">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-8 pl-2">
          <div className="bg-[#23533C] text-[#FAF8F5] font-bold w-10 h-10 rounded-xl flex items-center justify-center text-sm">
            IK
          </div>
          <div>
            <h2 className="font-bold text-base tracking-tight text-[#112318] leading-none">IKIMINA</h2>
            <p className="text-[10px] uppercase tracking-wider text-[#7A827C] font-semibold mt-1">TREASURER CONSOLE</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key as any)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[14px] transition ${
                currentPage === item.key 
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
                  currentPage === item.key ? 'bg-[#23533C] text-white' : 'bg-[#C35331] text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Profile / Logout */}
      <div className="flex items-center gap-3 pt-4 border-t border-[#EAE3D5]">
        <div className="w-10 h-10 rounded-full bg-[#23533C] text-white flex items-center justify-center font-bold text-sm">
          SG
        </div>
        <div>
          <h4 className="font-bold text-[14px] text-[#112318] leading-tight">Samuel Gatera</h4>
          <p className="text-[12px] text-[#7A827C] font-medium">Treasurer · Admin</p>
        </div>
        <button 
          onClick={onLogout} 
          className="ml-auto text-[#7A827C] hover:text-[#C35331] transition flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-[#FCECE5]"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-xs font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;