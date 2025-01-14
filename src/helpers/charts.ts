import { PledgerCount } from "../interface/Pledger";

export const groupPledgerCountsByGranularity = (
  pledgerCounts: PledgerCount[],
  granularity: "daily" | "weekly" | "monthly",
): PledgerCount[] => {
  const groupedCounts: Record<string, { count: number; updatedAt: string }> =
    {};

  pledgerCounts.forEach((count) => {
    const date = count.updatedAt;
    let groupKey: string;

    switch (granularity) {
      case "weekly":
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        groupKey = weekStart.toISOString().split("T")[0];
        break;
      case "monthly":
        groupKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
        break;
      case "daily":
      default:
        groupKey = date.toISOString().split("T")[0];
        break;
    }

    if (!groupedCounts[groupKey]) {
      groupedCounts[groupKey] = { count: 0, updatedAt: groupKey };
    }

    groupedCounts[groupKey].count = Math.max(
      parseInt(count.count),
      groupedCounts[groupKey].count,
    );
  });

  return Object.values(groupedCounts).map((group) => ({
    id: group.updatedAt,
    count: group.count.toString(),
    updatedAt: new Date(group.updatedAt),
  }));
};
