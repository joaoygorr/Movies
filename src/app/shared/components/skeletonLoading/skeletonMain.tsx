import Skeleton from "react-loading-skeleton";
import SkeletonBanner from "./skeletonBanner";

export default function SkeletonMain() {
    return (
        <div className="container box">
            <section className="popular">
                <h2 className="tracking-wider">
                    <Skeleton width={180} />
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {Array(10)
                        .fill(0)
                        .map((_, e) => (
                            <SkeletonBanner key={e} />
                        ))}
                </div>
            </section>
        </div>
    );
}
