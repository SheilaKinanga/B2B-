export type UserRole = "admin" | "procurement" |"sales_manager" | "viewer";
export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface KPICard {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
}

export type MenuItem = {
  id: string;
  label: string;
  icon: string;
};

export type ProcurementStatus = "pending" | "approved" | "rejected";
export interface ProcurementItem {
  id: string;
  item: string;
  quantity: number;
  cost: number;
  status: ProcurementStatus;
}


