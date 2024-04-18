
const ReadBookUi = (props) => {
    const { content, icon, bgStatus ,addToCart } = props
    return (
        <>
            <button onClick={addToCart} className={` ${bgStatus} text-white p-1 rounded-full w-[160px] py-1 text-[15px] hover:bg-[#1f6f5b]
                                ease-in duration-200 flex gap-2 items-center justify-center h-[50px]`}>
                {icon}
                <span>{content}</span>
            </button>
        </>
    );
};

export default ReadBookUi;