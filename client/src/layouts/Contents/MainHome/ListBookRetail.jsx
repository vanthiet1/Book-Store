
import BookRetailUi from "../BookRetailUi";
const ListBookRetail = () => {
    return (
        <div className="bg-black w-full h-auto px-10 py-5">
            <h1 className="text-white text-[27px] font-bold py-3 w-1/2 pl-[15px]">Sách mua lẻ</h1>
            <div className="relative w-full overflow-hidden ">
                <BookRetailUi />
            </div>
        </div>
    );
};

export default ListBookRetail;
