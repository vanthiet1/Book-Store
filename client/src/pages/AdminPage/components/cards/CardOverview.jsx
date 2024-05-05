
const CardOverview = (props) => {
    const {  quantity, iconCard, titleCard } = props
    return (
        <>
                <div className="bg-[#fff] p-5 rounded-[8px] w-[100%] ">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-[18px] block text-[#6b7280]">{titleCard}</span>
                            <span className="font-[550] block text-[30px]">{quantity}</span>
                        </div>
                        <div>
                            {iconCard}
                        </div>
                    </div>
                </div>
        </>
    );
};

export default CardOverview;