import Skeleton from "react-loading-skeleton";

export default function SkeletonBanner() {
    return (
        <div className="movie">
            <Skeleton width={175} height={260} />
            <div className="detail-movie">
                <Skeleton width={100} />
                <div className="specification">
                    <Skeleton width={15} />
                    <span className="ml-1">
                        <Skeleton width={20} />
                    </span>
                    <span className="mx-2">
                        <Skeleton width={1} />
                    </span>
                    <span>
                        <Skeleton width={70} />
                    </span>
                </div>
                <span className="genre">
                    <Skeleton width={100} />
                </span>
            </div>
        </div>
    );
}
