
const CardOverview = (props) => {
    const { statistics, icon, quantity, iconCard, titleCard } = props
    return (
        <>
                <div className="bg-[#fff] p-5 rounded-[8px] w-[100%] ">
                    <div className="flex justify-between items-center py-3">
                        <div className="bg-[#10B981] py-[7px] rounded-[50px] w-[70px] flex justify-center ">
                            <span className="text-[#fff] text-[12px]">{statistics}</span>
                        </div>
                        <div className="w-[30px] h-[30px] bg-[#F3F4F6] rounded-[5px] flex justify-center items-center">
                            {icon}
                        </div>
                    </div>
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