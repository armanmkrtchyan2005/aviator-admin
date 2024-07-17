import { Currency } from "@/entities/user/api/types";

type CurrencyRecord = Record<Currency, number>;

export interface Withdrawal {
    _id: string;
    uid: number;
    user: string;
    amount: CurrencyRecord;
    status: string;
    statusMessage: string;
    userRequisite: string;
    requisite: Requisite;
    createdAt: string;
    completedDate: string;
    active: string;
}

export interface Requisite {
    _id: string;
    requisite: string;
    name: string;
    currency: Currency;
    img: string;
    commission: number;
    active: boolean;
    balance: number;
}

export interface FetchAllWithdrawalsRequest {
    skip?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
}
