export type Currency = "USD" | "RUB" | "UZS" | "KZT" | "USDT" | "UAN";

export type CurrencyRecord = Record<Currency, number>;

export interface Requisite {
    _id: string;
    requisite: string;
    active: boolean;
    currency: Currency;
    turnover: Turnover;
    createdAt: string;
    updatedAt: string;
    isCardFileRequired: boolean;
    isReceiptFileRequired: boolean;
}

export interface Turnover {
    confirmedCount: number;
    confirmed: number;
    inProcess: number;
}

export interface AddRequisiteRequest {
    requisite: string;
}

export interface ToggleRequisiteStatusRequest {
    id: string;
}
