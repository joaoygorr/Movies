import { IListMovie, IResponse } from "@/shared/interfaces";

type Props = {
    moviePage?: IResponse<IListMovie[]>;
    totalItemShow?: number;
    onSet: (item: number) => void;
    onPageChange: (value: number) => void;
};

export default function Pagination({
    onSet,
    totalItemShow,
    moviePage,
    onPageChange
}: Props) {
    if (!moviePage) return;

    const goToFirsPage = () => {
        onPageChange(1);
    };

    const goToPreviousPage = () => {
        if (moviePage?.page - 1 <= 0) return;

        onPageChange(moviePage?.page - 1);
    };

    const goToNextPage = () => {
        if (moviePage?.page + 1 >= moviePage?.total_pages) return;

        onPageChange(moviePage?.page + 1);
    };

    const goToLastPage = () => {
        onPageChange(moviePage?.total_pages);
    };

    return (
        <div className="pagination text-zinc-500">
            <span>
                Exibindo {totalItemShow} de {moviePage?.results.length} itens
            </span>

            <div className="pagination-body">
                <div className="select-items">
                    <span>Rows per page</span>

                    <select onChange={(e) => onSet(Number(e.target.value))}>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>

                <span>
                    Página {moviePage?.page} de {moviePage?.total_pages}
                </span>

                <div className="arrows space-x-1.5">
                    <button
                        disabled={moviePage?.page - 1 <= 0}
                        onClick={goToFirsPage}
                    >
                        <i className="pi pi-angle-double-left" />
                        <span className="sr-only">First page</span>
                    </button>

                    <button
                        disabled={moviePage?.page - 1 <= 0}
                        onClick={goToPreviousPage}
                    >
                        <i className="pi pi-angle-left" />
                        <span className="sr-only">Previous page</span>
                    </button>

                    <button
                        disabled={moviePage?.page + 1 >= moviePage?.total_pages}
                        onClick={goToNextPage}
                    >
                        <i className="pi pi-angle-right" />
                        <span className="sr-only">Next page</span>
                    </button>

                    <button
                        disabled={moviePage?.page + 1 >= moviePage?.total_pages}
                        onClick={goToLastPage}
                    >
                        <i className="pi pi-angle-double-right" />
                        <span className="sr-only">Last page</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
