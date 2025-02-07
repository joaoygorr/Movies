import Skeleton from "react-loading-skeleton";
import { Layout } from "../layoutComponent";
import SkeletonSlider from "./skeletonSlider";
import SkeletonImages from "./skeletonImages";

export default function SkeletonDetails() {
    return (
        <div>
            <Layout.Root>
                <div className="flex-none image-tv">
                    <Skeleton width={260} height={400} />
                </div>
                <Layout.Details>
                    <h2 className="title md:mt-0">
                        <Skeleton width={150} />
                    </h2>
                    <div className="detail-genre-date">
                        <Skeleton width={10} />
                        <span className="ml-1">
                            <Skeleton width={20} />
                        </span>
                        <span className="mx-2">
                            <Skeleton width={5} />
                        </span>
                        <span>
                            <Skeleton width={50} />
                        </span>
                        <span className="mx-2">
                            <Skeleton width={5} />
                        </span>
                        <span>
                            <Skeleton width={40} />
                        </span>
                    </div>
                    <p>
                        <Skeleton width={1050} height={150} />
                    </p>
                    <div className="box-button">
                        <div>
                            <Skeleton width={145} height={50} />
                        </div>
                    </div>
                </Layout.Details>
            </Layout.Root>
            <SkeletonSlider />
            <SkeletonImages />
        </div>
    );
}
