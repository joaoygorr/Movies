import { IVideos } from "@/shared/Interfaces";

export const useVideo = (data: IVideos | undefined) => {
    if (data !== undefined) {
        const { results } = data;

        const { key, name } = results.find((i) => {
            const nameMovie: string = i.name.toLocaleLowerCase();
            return nameMovie.includes("dublado");
        }) || { key: undefined, name: undefined };
        
        return { key, name };
    }
    return null;
}
