import { Requisite } from "@/entities/requisite";

export interface User {
    _id: string;
    login: string;
    replenishmentBonus: number;
    withdrawalBonus: number;
    balance: number;
    requisite: Requisite;
    requisites: string[];
}
