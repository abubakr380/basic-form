export interface SearchResultModel {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
}

export interface SearchMovieResponseModel {
    Response: "True" | "False";
    Search: SearchResultModel[];
    totalResults: string;
}