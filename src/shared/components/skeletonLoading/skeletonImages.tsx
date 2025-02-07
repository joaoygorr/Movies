import Skeleton from "react-loading-skeleton";

export default function SkeletonImages() {
    return (
        <div className="movie-image">
            <div className="container image-box">
                <h2>
                    <Skeleton width={150} />
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {Array(3)
                        .fill(0)
                        ?.map((_, key) => (
                            <div className="image" key={key}>
                                <Skeleton width={380} height={300} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
