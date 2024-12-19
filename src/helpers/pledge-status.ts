export const STATUS_ACTIVE = "active";
export const STATUS_BROKEN = "broke";

export const isPledgeActive = (status: string) => status === STATUS_ACTIVE;
export const isPledgeBroken = (status: string) => status === STATUS_BROKEN;
