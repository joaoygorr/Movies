export function returnHours(runtime: number): string {
    const convertHour: string = (runtime / 60).toFixed(1);
    const cut: string[] = convertHour.split(".");

    if (cut.includes("0")) {
        const pickFirst: string = cut[0];
        return pickFirst + "h";
    }

    return cut[0] + "h " + cut[1] + "m";
}
