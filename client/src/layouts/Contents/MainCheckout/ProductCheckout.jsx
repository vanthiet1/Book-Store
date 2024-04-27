
const ProductCheckout = (props) => {
    const { productCheckout, nameMethodPayment, totalPriceCheckout, handleCheckUserCheckout, activeCheckout } = props;
    return (
        <>

            <h1 className="text-[#fff] font-medium text-[20px]">Thông tin thanh toán</h1>

            {productCheckout ? (
                productCheckout.map((product, index) => (
                    <div key={index}>
                        <div className="flex gap-2 py-2 ">
                            <span className="text-[#B3B3B3] w-[200px]">Sản phẩm {index + 1}</span>
                            <h1 className="text-[#fff]">{product.name ? product.name : "Sớm có tên"}</h1>
                        </div>
                        <div className="flex py-2 items-center gap-2 ">
                            <span className="text-[#B3B3B3] w-[200px]">Số lượng sản phẩm {index + 1}</span>
                            <span className="text-[#fff]">{product.quantity ? product.quantity : "Số lượng đang cập nhật"}</span>
                        </div>
                        <div className="flex py-2 gap-2">
                            <span className="text-[#B3B3B3] w-[200px]">Tạm tính</span>
                            <span className="text-[#fff]">{(product.price * product.quantity).toLocaleString() + " VND"}</span>
                        </div>
                    </div>
                ))

            ) : (
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ51tXSU5w1aYlxTuaY
xSPc9gaQwSK8x6Equqjaksf60B9pywAfV9IblnwysZMdiUFs0Ww&usqp=CAU" alt="" />
            )}

            <div className="flex py-2 gap-2">
                <span className="text-[#B3B3B3] w-[200px]">Hình thức thanh toán</span>
                <span className="text-[#fff]">{nameMethodPayment}</span>
            </div>
            <div className="flex py-2 gap-2">
                <span className="text-[#B3B3B3] w-[200px]">Giảm giá</span>
                <span className="text-[#fff]">0%</span>
            </div>
            <div className="flex py-2 gap-2 ">
                <span className="text-[#fff] w-[200px]">TỔNG</span>
                <span className="text-green-600">{totalPriceCheckout && totalPriceCheckout.toLocaleString() + " VND"}</span>
            </div>
            <div className="mt-2">

                <button onClick={handleCheckUserCheckout} className={`  ${activeCheckout ? activeCheckout : ""} text-white p-1 rounded-full w-full py-3 text-[15px] 
                                ease-in duration-200 flex gap-2 items-center justify-center " `}>
                    <span>Thanh toán</span>
                </button>

            </div>
        </>
    );
};

export default ProductCheckout;