export type SortOrder = 'asc' | 'desc';
export type TransactionType = 'received' | 'send' | 'withdrawal';
export type UserRole = 'admin' | 'user' | 'customer';

export interface AuthLoginResponse {
  message: string;
}

export interface AuthRegisterResponse {
  message: string;
}

export interface UserResponse {
  id: string;
  no_id: string;
  username: string;
  email: string;
  birth_date: string;
  role: UserRole;
  balance: number;
}

export interface AdminTopUpResponse {
  message: string;
}

export interface AdminCustomerResponse {
  customers: UserResponse[];
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  date: string;
  sender_id?: string;
  receiver_id?: string;
}

export interface AdminAllTransactionsResponse {
  transactions: Transaction[];
}

export interface CustomerSendMoneyResponse {
  message: string;
}

export interface CustomerWithdrawalResponse {
  message: string;
}

export interface CustomerTransactionsResponse {
  transactions: Transaction[];
}

export interface ErrorResponse {
  message: string;
}

export interface PaginationParams {
  page?: number;
  sort?: SortOrder;
}

export interface CustomerQueryParams extends PaginationParams {
  search?: string;
}

export interface TransactionQueryParams extends PaginationParams {
  search?: string;
  type?: TransactionType;
}