const suffixes = new Map([
    [0, "ок"],
    [1, "ка"],
    [2, "ки"],
    [3, "ки"],
    [4, "ки"],
    [5, "ок"],
    [6, "ок"],
    [7, "ок"],
    [8, "ок"],
    [9, "ок"]
]);

export const formatOrdinals = (n: number, base: string) => {
    const remainder = n % 10;
    const suffix = suffixes.get(remainder);

    return `${n} ${base}${suffix}`;
};
