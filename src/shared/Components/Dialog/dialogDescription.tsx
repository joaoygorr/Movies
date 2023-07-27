import { TextBreak } from "@/shared/utils"

type DialogDescriptionProps = {
    description: string | undefined,
    image: string | undefined,
}

export const DialogDescription = ({ description, image }: DialogDescriptionProps) => {
    const hasDescription = description && description.trim() !== "";

    return (
        <div>
            {hasDescription}
            <div className="flex justify-center items-center">
                <img src={"https://image.tmdb.org/t/p/w500" + image} />
            </div>
            {hasDescription && (
                <div className="mt-2">
                    <h3 className="font-bold text-lg font-sans border-b-2 capitalize">sinopse</h3>
                    <p className="text-justify p-3">{TextBreak(description)}</p>
                </div>
            )}
        </div>
    )
}
