// Member - person in the group
export interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  joinedDate: string;
  active: boolean;
}

// Contribution - monthly payment of 20,000 RWF
export interface Contribution {
  id: string;
  memberId: string;
  month: string;     // e.g., "January"
  year: number;
  amount: number;    // 20,000 RWF
  paid: boolean;
  paidDate?: string;
  verifiedBy?: string;
}

// Penalty - 10% (2,000 RWF) for missed contribution
export interface Penalty {
  id: string;
  memberId: string;
  month: string;
  year: number;
  amount: number;    // 2,000 RWF
  generated: boolean;
  paid: boolean;
  paidDate?: string;
}

// Withdrawal - member requests funds
export interface Withdrawal {
  id: string;
  memberId: string;
  amount: number;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedDate: string;
  approvedDate?: string;
}

// Member Dashboard - data shown to member
export interface MemberDashboard {
  member: Member;
  totalShares: number;
  totalMonths: number;
  totalContributed: number;
  unpaidPenalty: number;
  missingMonths: { month: string; year: number }[];
  contributions: Contribution[];
  penalties: Penalty[];
}

// Admin Overview - data shown to treasurer
export interface AdminOverview {
  totalFundValue: number;
  totalContributions: number;
  totalWithdrawals: number;
  totalMembers: number;
  pendingApprovals: number;
  unpaidPenalties: number;
  collectionRate: number;
  monthlyData: {
    month: string;
    in: number;
    out: number;
  }[];
  pendingWithdrawals: Withdrawal[];
}