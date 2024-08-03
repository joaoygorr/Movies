// Interface para um gênero individual
interface IGenre {
    id: number;
    name: string;
}

// Interface para o objeto interno com a lista de gêneros
interface IGenresInnerResponse {
    genres: IGenre[];
}

// Interface para a resposta da API que contém o objeto interno
interface IGenresResponse {
    genres: IGenresInnerResponse;
}