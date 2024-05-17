import "./loading.style.scss";

export const Loading = () => {
    return (
        <div className="container flex justify-center items-center mx-auto">
            <div className="loading">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}