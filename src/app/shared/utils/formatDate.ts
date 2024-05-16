type ReturnDateProps = {
    standard: string,
    modelOne: string
};

export function formatDate(date: Date): ReturnDateProps {
    const objDate = {
        standard: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        modelOne: `${getMonthName(date.getMonth())} ${date.getDay()}, ${date.getFullYear()}`
    };

    return objDate;
}

function getMonthName(monthIndex: number): string {
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    return months[monthIndex];
}