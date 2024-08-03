import { Layout } from "@/app/shared/components/layoutComponent";
import { IParams } from "@/app/shared/interfaces";

export default function CastDetails(cast: IParams) {
    return (
        <div>
            <Layout.Root>
                <Layout.Image src={"https://image.tmdb.org/t/p/w500" + data?.details?.poster_path} alt="poster cast" className="w-76"/>
            </Layout.Root>
        </div>
    )
}