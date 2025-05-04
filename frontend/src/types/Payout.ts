import {Country} from "./Country.ts";

export interface Payout {
    id: number;
    amount: number;
    country: Country;
}