type ReturnDateProps = {
    year: string,
    month: string,
    day: string,
    completed: string
};

export function ReturnDate(date: string): ReturnDateProps {
    const cutDate: string[] = date.split("-");
    const objDate: ReturnDateProps = { year: cutDate[0], month: cutDate[1], day: cutDate[2], completed: `${cutDate[2]}/${cutDate[1]}/${cutDate[0]}` };

    return objDate;
}