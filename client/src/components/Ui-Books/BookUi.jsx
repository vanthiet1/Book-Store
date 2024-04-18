
const BookUi = (props) => {
    const { imgBook, labelBook, nameBook , width ,bgLabel } = props;
    const containerBookUi = `relative mx-2 ${width} `
    return (
        <div>
            <div className={`${containerBookUi}`}>
                <img loading="lazy"  className="rounded-[10px] group-hover:blur-[10px] " src={imgBook} alt="....." />
                <div >
                    <div className="absolute right-[26px] top-0 flex group-hover:blur-[10px]">
             
                        <span className={`text-white ${bgLabel} font-bold uppercase p-[0.5px] px-3 rounded-bl-[10px] rounded-br-[5px]`}>{labelBook}</span>

                        <div className="absolute right-[-25px]">
                            <img src="https://waka.vn/svgs/icon-free.svg" alt="" />
                        </div>
                    </div>
                    <div className="py-3">
                        <h1 className="text-white font-bold cursor-pointer hover:text-[#15B088]">{nameBook}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookUi;