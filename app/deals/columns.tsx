export type DealStage = "Opportunity" | "Proposal Sent" | "In Negotiation" | "Won" | "Lost" | "Delayed";

export type Deal = {
    id: string;
    title: string;
    value: number;
    stage: DealStage;
    projectType: string;
    dateDeCreation: string;
};

export const STAGES: DealStage[] = [
    "Opportunity",
    "Proposal Sent",
    "In Negotiation",
    "Won",
    "Lost",
    "Delayed"
];
