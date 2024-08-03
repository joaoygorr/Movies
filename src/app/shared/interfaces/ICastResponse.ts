import { ICast } from "./ICast";
import { ICrew } from "./ICrew";

export interface ICastResponse {
    id: string;
    cast: ICast[];
    crew: ICrew[];
}
