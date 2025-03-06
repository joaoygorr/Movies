type Props = {
    page?: number;
    totalPages?: number;
    totalItemsPage?: number;
    totalItemShow?: number;
    onSet: (item: number) => void;
};

export default function Pagination({
    page,
    totalPages,
    totalItemsPage,
    onSet,
    totalItemShow
}: Props) {
    return (
        <div className="pagination text-zinc-500">
            <span>
                Exibindo {totalItemShow} de {totalItemsPage} itens
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
                    Página {page} de {totalPages}
                </span>

                <div className="arrows space-x-1.5">
                    <button disabled={page! - 1 <= 0}>
                        <i className="pi pi-angle-double-left" />
                        <span className="sr-only">First page</span>
                    </button>

                    <button disabled={page! - 1 <= 0}>
                        <i className="pi pi-angle-left" />
                        <span className="sr-only">Previous page</span>
                    </button>

                    <button disabled={page! + 1 >= totalPages!}>
                        <i className="pi pi-angle-right" />
                        <span className="sr-only">Next page</span>
                    </button>

                    <button disabled={page! + 1 >= totalPages!}>
                        <i className="pi pi-angle-double-right" />
                        <span className="sr-only">Last page</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
