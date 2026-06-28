"use client";
import { IResponse } from "@/types";
import { useTranslation } from "@/hooks/useTranslation";

type Props = {
    dataPage?: IResponse<unknown[]>;
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
    const { t } = useTranslation('common');

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
                {t('showing')} {totalItemShow} {t('of')} {dataPage?.results.length} {t('items')}
            </span>

            <div className="pagination-body">
                <div className="select-items">
                    <span>{t('itemsPerPage')}</span>

                    <select onChange={(e) => onSet(Number(e.target.value))}>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>

                <span className="hidden lg:block">
                    {t('pageOf', { current: dataPage?.page, total: lastPage })}
                </span>

                <div className="arrows space-x-1.5">
                    <button
                        disabled={dataPage?.page - 1 <= 0}
                        onClick={goToFirsPage}
                    >
                        <i className="pi pi-angle-double-left" />
                        <span className="sr-only">{t('page')} 1</span>
                    </button>

                    <button
                        disabled={dataPage?.page - 1 <= 0}
                        onClick={goToPreviousPage}
                    >
                        <i className="pi pi-angle-left" />
                        <span className="sr-only">{t('previous')}</span>
                    </button>

                    <span className="lg:hidden">
                        {dataPage?.page} {t('of')} {lastPage}
                    </span>

                    <button
                        disabled={dataPage?.page + 1 >= lastPage}
                        onClick={goToNextPage}
                    >
                        <i className="pi pi-angle-right" />
                        <span className="sr-only">{t('next')}</span>
                    </button>

                    <button
                        disabled={dataPage?.page + 1 >= lastPage}
                        onClick={goToLastPage}
                    >
                        <i className="pi pi-angle-double-right" />
                        <span className="sr-only">{t('page')} {lastPage}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
