import { Member, Contribution, Penalty, Withdrawal, MemberDashboard, AdminOverview } from '../types';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 12 Members
export const mockMembers: Member[] = [
  { id: '1', name: 'Eric Mugisha', email: 'eric@ikimina.com', phone: '+250788123456', joinedDate: '2025-01-01', active: true },
  { id: '2', name: 'Jean-Paul Habimana', email: 'jp@ikimina.com', phone: '+250788123457', joinedDate: '2025-01-01', active: true },
  { id: '3', name: 'Olivier Niyonzima', email: 'olivier@ikimina.com', phone: '+250788123458', joinedDate: '2025-01-01', active: true },
  { id: '4', name: 'Patrick Nshimiyimana', email: 'patrick@ikimina.com', phone: '+250788123459', joinedDate: '2025-01-01', active: true },
  { id: '5', name: 'Samuel Gatera', email: 'samuel@ikimina.com', phone: '+250788123460', joinedDate: '2025-01-01', active: true },
  { id: '6', name: 'Emmanuel Rukundo', email: 'emmanuel@ikimina.com', phone: '+250788123461', joinedDate: '2025-01-01', active: true },
  { id: '7', name: 'David Mugisha', email: 'david@ikimina.com', phone: '+250788123462', joinedDate: '2025-01-01', active: true },
  { id: '8', name: 'Joseph Nsengimana', email: 'joseph@ikimina.com', phone: '+250788123463', joinedDate: '2025-01-01', active: true },
  { id: '9', name: 'Jean de Dieu Uwimana', email: 'jeandedieu@ikimina.com', phone: '+250788123464', joinedDate: '2025-01-01', active: true },
  { id: '10', name: 'Claude Niyitegeka', email: 'claude@ikimina.com', phone: '+250788123465', joinedDate: '2025-01-01', active: true },
  { id: '11', name: 'Vincent Kanyamibwa', email: 'vincent@ikimina.com', phone: '+250788123466', joinedDate: '2025-01-01', active: true },
  { id: '12', name: 'Pascal Niyonzima', email: 'pascal@ikimina.com', phone: '+250788123467', joinedDate: '2025-01-01', active: true },
];

// Generate contributions and penalties
export const mockContributions: Contribution[] = [];
export const mockPenalties: Penalty[] = [];

mockMembers.forEach(member => {
  for (let year = 2025; year <= 2026; year++) {
    const endMonth = year === 2025 ? 11 : 5;
    for (let m = 0; m <= endMonth; m++) {
      const month = months[m];
      
      let paid = true;
      const isEric = member.id === '1';
      
      // Eric: Apr 2026 and May 2026 are missed
      if (isEric && year === 2026 && (m === 3 || m === 4)) {
        paid = false;
      } 
      // Eric: all other months paid
      else if (isEric) {
        paid = true;
      } 
      // Other members: random
      else {
        paid = Math.random() > 0.08;
      }
      
      mockContributions.push({
        id: `contrib-${member.id}-${year}-${m}`,
        memberId: member.id,
        month,
        year,
        amount: 20000,
        paid,
        paidDate: paid ? `2026-06-${Math.floor(Math.random() * 7) + 1}` : undefined,
        verifiedBy: paid ? 'samuel@ikimina.com' : undefined,
      });
      
      if (!paid) {
        mockPenalties.push({
          id: `penalty-${member.id}-${year}-${m}`,
          memberId: member.id,
          month,
          year,
          amount: 2000,
          generated: true,
          paid: false,
          paidDate: undefined,
        });
      }
    }
  }
});

// Add some paid penalties for Eric (so Generated: 6,000, Paid: 2,000, Unpaid: 4,000)
mockPenalties.push({
  id: 'penalty-eric-paid-1',
  memberId: '1',
  month: 'Mar',
  year: 2025,
  amount: 2000,
  generated: true,
  paid: true,
  paidDate: '2025-03-15',
});

// Withdrawals
export const mockWithdrawals: Withdrawal[] = [
  {
    id: 'w1',
    memberId: '2',
    amount: 44000,
    purpose: 'Apr–May 2026 investment',
    status: 'pending',
    requestedDate: '2026-06-23T08:00:00',
  },
  {
    id: 'w2',
    memberId: '3',
    amount: 60000,
    purpose: 'Jul–Sep 2026 investment',
    status: 'pending',
    requestedDate: '2026-06-23T05:00:00',
  },
  {
    id: 'w3',
    memberId: '4',
    amount: 20000,
    purpose: 'Jun 2026 investment',
    status: 'pending',
    requestedDate: '2026-06-22T14:00:00',
  },
];

// Get member dashboard data by ID (for static use)
export const mockMemberDashboard = (memberId: string): MemberDashboard => {
  const member = mockMembers.find(m => m.id === memberId)!;
  const contributions = mockContributions.filter(c => c.memberId === memberId);
  const penalties = mockPenalties.filter(p => p.memberId === memberId);
  
  const totalShares = contributions.filter(c => c.paid).length;
  const totalMonths = contributions.length;
  const totalContributed = totalShares * 20000;
  const unpaidPenalty = penalties.filter(p => !p.paid).reduce((sum, p) => sum + p.amount, 0);
  const missingMonths = contributions
    .filter(c => !c.paid)
    .map(c => ({ month: c.month, year: c.year }));
  
  return { 
    member, 
    totalShares, 
    totalMonths, 
    totalContributed, 
    unpaidPenalty, 
    missingMonths, 
    contributions: contributions.slice(-12), 
    penalties 
  };
};

// Get member dashboard data by EMAIL (for dynamic user login)
export const mockMemberDashboardByEmail = (email: string): MemberDashboard => {
  const member = mockMembers.find(m => m.email === email);
  
  if (!member) {
    return {
      member: { id: '', name: 'Unknown', email: '', joinedDate: '', active: false },
      totalShares: 0,
      totalMonths: 0,
      totalContributed: 0,
      unpaidPenalty: 0,
      missingMonths: [],
      contributions: [],
      penalties: [],
    };
  }
  
  const contributions = mockContributions.filter(c => c.memberId === member.id);
  const penalties = mockPenalties.filter(p => p.memberId === member.id);
  
  const totalShares = contributions.filter(c => c.paid).length;
  const totalMonths = contributions.length;
  const totalContributed = totalShares * 20000;
  const unpaidPenalty = penalties.filter(p => !p.paid).reduce((sum, p) => sum + p.amount, 0);
  const missingMonths = contributions
    .filter(c => !c.paid)
    .map(c => ({ month: c.month, year: c.year }));
  
  return { 
    member, 
    totalShares, 
    totalMonths, 
    totalContributed, 
    unpaidPenalty, 
    missingMonths, 
    contributions: contributions.slice(-12), 
    penalties 
  };
};

// Admin overview
export const mockAdminOverview: AdminOverview = {
  totalFundValue: 2526000,
  totalContributions: 3940000,
  totalWithdrawals: 1500000,
  totalMembers: 12,
  pendingApprovals: 4,
  unpaidPenalties: 56000,
  collectionRate: 75,
  monthlyData: months.slice(0, 6).map((month) => ({
    month,
    in: Math.floor(Math.random() * 300000) + 150000,
    out: Math.floor(Math.random() * 100000) + 50000,
  })),
  pendingWithdrawals: mockWithdrawals.filter(w => w.status === 'pending'),
};