export interface User {
  name: string;
  role: string;
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
