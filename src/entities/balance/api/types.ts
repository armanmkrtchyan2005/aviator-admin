export interface Deposit {
    createdAt: string;
    balance: number;
}

export interface FetchDepositHistoryResponse {
    address: string;
    history: Deposit[];
}
