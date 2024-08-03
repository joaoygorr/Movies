export interface IResponse<t> {
    page: number;
    results: t;
    total_pages: number;
    total_results: number;
}
