import {Payout} from "./Payout.ts";

export interface Campaign {
    id?: number;
    title: string;
    landingPageUrl: string;
    isRunning: boolean;
    payouts: Payout[];
}