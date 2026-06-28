import SkeletonBanner from "@/components/skeletonLoading/skeletonBanner";

export default function Loading() {
    return (
        <div className="container box">
            <section className="content-list">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8" style={{ paddingTop: '4rem' }}>
                    {Array(10)
                        .fill(0)
                        .map((_, i) => (
                            <SkeletonBanner key={i} />
                        ))}
                </div>
            </section>
        </div>
    );
}
