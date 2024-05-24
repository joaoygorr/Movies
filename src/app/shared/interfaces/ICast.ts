export interface ICast {
    id: string,
    cast: Cast[],
    crew: Crew[]
}

type Cast = {
    adult: boolean,
    gender: number,
    id: string,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    cast_id: number,
    character: string,
    credit_id: string,
    order: number
}

type Crew = {
    adult: boolean,
    gender: number,
    id: string,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    credit_id: string,
    department: string,
    job: string
}