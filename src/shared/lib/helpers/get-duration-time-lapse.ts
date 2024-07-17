export const getDurationTimeLapse = (
    startDate?: string | number | undefined,
    endDate?: string | number | undefined
): { startDate: Date; endDate: Date } => {
    const endTimeLapse = endDate ? new Date(endDate) : new Date();
    let startTimeLapse = startDate
        ? new Date(startDate)
        : new Date(
              endTimeLapse.getFullYear(),
              endTimeLapse.getMonth() - 3,
              endTimeLapse.getDate()
          );

    if (startTimeLapse > endTimeLapse) {
        startTimeLapse = new Date(
            endTimeLapse.getFullYear(),
            endTimeLapse.getMonth() - 3,
            endTimeLapse.getDate()
        );

        startTimeLapse.setHours(0, 0, 0, 0);
        endTimeLapse.setHours(23, 59, 59, 999);

        return { startDate: startTimeLapse, endDate: endTimeLapse };
    }

    startTimeLapse.setHours(0, 0, 0, 0);
    endTimeLapse.setHours(23, 59, 59, 999);

    return { startDate: startTimeLapse, endDate: endTimeLapse };
};
