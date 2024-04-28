
const DetailProduct = (props) => {
    const { nameProduct, quantityProduct, priceProduct, imgProduct, dateCheckoutProduct } = props;
    return (
        <>
            <div className="overflow-y-auto h-auto bg-white w-full">
                <table className="w-[1250px]" >
                    <tbody  >
                        <tr className="border-b border-gray-200" >
                            <td className="text-left px-4 py-2 w-[300px]">{nameProduct}</td>
                            <td className="text-left px-4 py-2">{quantityProduct}</td>
                            <td className="text-left pl-[100px] "> {priceProduct.toLocaleString() + " VND" } 
                        </td>
                            <td className="text-left px-4 py-2">
                                <img src={imgProduct} alt="Product Image" className="w-[100px]" />
                            </td>
                            <td className="text-left px-4 py-2">{dateCheckoutProduct}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </>
    );
};

export default DetailProduct;