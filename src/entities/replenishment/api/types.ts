import { Requisite, CurrencyRecord } from "@/entities/requisite/api";

export interface Replenishment {
    _id: string;
    uid: number;
    user: string;
    amount: CurrencyRecord;
    currency: string;
    deduction: CurrencyRecord;
    commission: CurrencyRecord;
    bonusAmount: CurrencyRecord;
    accrualAmount: CurrencyRecord;
    status: string;
    statusMessage: string;
    isPayConfirmed: boolean;
    requisite: Requisite;
    createdAt: string;
    completedDate: string;
    card: string;
    receipt: string;
}

export interface SuccessResponse {
    message: string;
}

export interface FetchAllReplenishmentsRequest {
    skip?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
}

export interface CancelReplenishmentByIdRequest {
    id: string;
    statusMessage: string;
}

export interface ConfirmReplenishmentByIdRequest {
    id: string;
}
