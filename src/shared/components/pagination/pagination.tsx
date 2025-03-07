import { IListMovie, IListTvShows, IResponse } from "@/shared/interfaces";

type Props = {
    dataPage?: IResponse<IListMovie[] | IListTvShows[]>;
    totalItemShow?: number;
    onSet: (item: number) => void;
    onPageChange: (value: number) => void;
};

export default function Pagination({
    onSet,
    totalItemShow,
    dataPage,
    onPageChange
}: Props) {
    if (!dataPage) return;

    const lastPage = Math.min(dataPage?.total_pages ?? 1, 500);

    const goToFirsPage = () => {
        onPageChange(1);
    };

    const goToPreviousPage = () => {
        if (dataPage?.page - 1 <= 0) return;

        onPageChange(dataPage?.page - 1);
    };

    const goToNextPage = () => {
        if (dataPage?.page + 1 >= dataPage?.total_pages) return;

        onPageChange(dataPage?.page + 1);
    };

    const goToLastPage = () => {
        onPageChange(lastPage);
    };

    return (
        <div className="pagination text-zinc-500">
            <span>
                Exibindo {totalItemShow} de {dataPage?.results.length} itens
            </span>

            <div className="pagination-body">
                <div className="select-items">
                    <span>Itens</span>

                    <select onChange={(e) => onSet(Number(e.target.value))}>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>

                <span className="hidden lg:block">
                    Página {dataPage?.page} de {lastPage}
                </span>

                <div className="arrows space-x-1.5">
                    <button
                        disabled={dataPage?.page - 1 <= 0}
                        onClick={goToFirsPage}
                    >
                        <i className="pi pi-angle-double-left" />
                        <span className="sr-only">First page</span>
                    </button>

                    <button
                        disabled={dataPage?.page - 1 <= 0}
                        onClick={goToPreviousPage}
                    >
                        <i className="pi pi-angle-left" />
                        <span className="sr-only">Previous page</span>
                    </button>

                    <span className="lg:hidden">
                        {dataPage?.page} de {lastPage}
                    </span>

                    <button
                        disabled={dataPage?.page + 1 >= lastPage}
                        onClick={goToNextPage}
                    >
                        <i className="pi pi-angle-right" />
                        <span className="sr-only">Next page</span>
                    </button>

                    <button
                        disabled={dataPage?.page + 1 >= lastPage}
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
