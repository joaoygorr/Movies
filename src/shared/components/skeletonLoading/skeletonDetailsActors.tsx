import { Layout } from "../layoutComponent";
import Skeleton from "react-loading-skeleton";

export default function SkeletonDetailsActors() {
    return (
        <div>
            <Layout.Root>
                <div className="flex-none image-cast">
                    <Skeleton width={300} height={450} />
                    <ul className="info-social-media">
                        {Array(2)
                            .fill(0)
                            ?.map((_, i) => (
                                <li className={"ml-6"} key={i}>
                                    <Skeleton width={25} height={25} />
                                </li>
                            ))}
                    </ul>
                </div>

                <Layout.Details>
                    <h2 className="text-4xl mt-4 md:mt-0 font-semibold">
                        <Skeleton width={100} />
                    </h2>

                    <div className="details-peaple text-gray-400">
                        <Skeleton width={15} />
                        <span className="ml-2">
                            <Skeleton width={150} />
                        </span>
                    </div>

                    <p className="text-gray-300 mt-8">
                        <Skeleton width={800} height={100} />
                    </p>
                </Layout.Details>
            </Layout.Root>

            <div className="credits border-b border-gray-800">
                <div className="container mx-auto px-4 py-16">
                    <h2 className="text-4xl font-semibold">
                        <Skeleton width={100} />
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                        {Array(2)
                            .fill(0)
                            ?.map((_, i) => (
                                <span key={i}>
                                    <strong className="hover:underline">
                                        <Skeleton width={150} />
                                    </strong>
                                </span>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
