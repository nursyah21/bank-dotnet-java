import type {
    AuthLoginResponse,
    AuthRegisterResponse,
    UserResponse,
    AdminTopUpResponse,
    AdminCustomerResponse,
    AdminAllTransactionsResponse,
    CustomerSendMoneyResponse,
    CustomerWithdrawalResponse,
    CustomerTransactionsResponse,
    CustomerQueryParams,
    TransactionQueryParams,
} from '../types/apiService';

const BASE_URL = '/api/v1';

async function _fetcher<T>(url: string, options: RequestInit = {}): Promise<T> {
    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `API error: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return (await response.json()) as T;
        }
        return {} as T;
    } catch (error) {
        console.error('Fetcher error:', error);
        throw error;
    }
}

const apiService = {
    auth: {
        login: (username: string, password: string) => {
            return _fetcher<AuthLoginResponse>('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
            });
        },
        register: (username: string, email: string, password: string, birthdate: string) => {
            return _fetcher<AuthRegisterResponse>('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ username, email, password, birthdate }),
            });
        },
        logout: () => _fetcher<void>('/auth/logout'),
        getMe: () => _fetcher<UserResponse>('/auth/me'),
        requestPasswordReset: (email: string) => {
            return _fetcher<void>('/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify({ email }),
            });
        },
        validateResetToken: (token: string) => {
            return _fetcher<void>(`/auth/reset-password?token_reset_password=${token}`);
        },
        changePassword: (tokenReset: string, password: string) => {
            return _fetcher<void>('/auth/reset-password', {
                method: 'PUT',
                body: JSON.stringify({ tokenReset, password }),
            });
        },
    },

    admin: {
        topUp: (customerId: string, amount: number) => {
            return _fetcher<AdminTopUpResponse>('/admin/top-up', {
                method: 'POST',
                body: JSON.stringify({ customer_id: customerId, amount }),
            });
        },
        getCustomers: (params: CustomerQueryParams = {}) => {
            const urlParams = new URLSearchParams(params as any).toString();
            return _fetcher<AdminCustomerResponse>(`/admin/customer?${urlParams}`);
        },
        getAllTransactions: (params: TransactionQueryParams = {}) => {
            const urlParams = new URLSearchParams(params as any).toString();
            return _fetcher<AdminAllTransactionsResponse>(`/admin/transaction?${urlParams}`);
        },
    },

    customer: {
        sendMoney: (receiverId: string, amount: number) => {
            return _fetcher<CustomerSendMoneyResponse>('/customer/send', {
                method: 'POST',
                body: JSON.stringify({ receiver_id: receiverId, amount }),
            });
        },
        withdraw: (amount: number) => {
            return _fetcher<CustomerWithdrawalResponse>('/customer/withdrawal', {
                method: 'POST',
                body: JSON.stringify({ amount }),
            });
        },
        getTransactions: (params: TransactionQueryParams = {}) => {
            const urlParams = new URLSearchParams(params as any).toString();
            return _fetcher<CustomerTransactionsResponse>(`/customer/transaction?${urlParams}`);
        },
    },
};

export default apiService;