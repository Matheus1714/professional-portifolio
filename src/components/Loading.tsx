export function Loading() {
    return (
        <div className="absolute">
            <div className="animate-spin cursor-wait">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M8 .5V5H7V.5zM5.146 5.854l-3-3l.708-.708l3 3zm4-.708l3-3l.708.708l-3 3zm.855 1.849L14.5 7l-.002 1l-4.5-.006zm-9.501 0H5v1H.5zm5.354 2.859l-3 3l-.708-.708l3-3zm6.292 3l-3-3l.708-.708l3 3zM8 10v4.5H7V10z" clip-rule="evenodd" /></svg>
            </div>
        </div>
    )
}