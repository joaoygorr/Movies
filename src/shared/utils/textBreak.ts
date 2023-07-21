export function TextBreak(text: string): string {
    if (text.length >= 320) {
        const midPoint: number = Math.ceil(text.length / 2);
        const cutText: string = text.slice(0, midPoint);
        const newText: string = cutText + "...";
        return newText;
    }
    return text;
}