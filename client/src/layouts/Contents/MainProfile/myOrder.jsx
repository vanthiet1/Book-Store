import { useContext, useState, useEffect } from "react";
import { format } from 'date-fns';
import { DataUser } from "../../../contexts/authContext/DataUserLogin";
import { GetDataUserCheckout } from "../../../services/checkout/checkoutUserService";
import DeleteButton_square from "../../../pages/AdminPage/components/button/DeleteButton_square";
// import { CancelOrder } from "../../../services/checkout/cancelOrderService";
const MyOrder = () => {
    const { inforUser } = useContext(DataUser);
    const [allProducts, setAllProducts] = useState([]);

    const handleGetDataCheckout = async () => {
        try {
            const userID = inforUser && inforUser._id ? inforUser._id : null;
            const response = await GetDataUserCheckout(userID);
            const products = response.reduce((allProducts, checkout) => {
                checkout.products.forEach(product => {
                    allProducts.push({ ...product, status: checkout.status });
                });
                return allProducts;
            }, []);
            setAllProducts(products);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleGetDataCheckout();
    }, []);
    // const handleCancelOrder = async (id) => { 
    //     try {
    //          console.log(id);
    //         await CancelOrder(id);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <>
            <div className="overflow-y-auto h-[640px] ">
                <table className="w-full">
                    <thead className="bg-gray-100 h-16">
                        <tr>
                            <th className="text-left px-4">Tên </th>
                            <th className="text-left px-4">Số lượng</th>
                            <th className="text-left px-4">Sách</th>
                            <th className="text-left px-4">Giá</th>
                            <th className="text-left px-4">Tổng Tiền</th>
                            <th className="text-left px-4">Trạng thái</th>
                            <th className="text-left px-4">Ngày Mua</th>
                            <th className="pr-5 py-2  text-right" colSpan="10">
                                <span>Xác Nhận Hủy</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {allProducts.length  > 0 ? (<>
                        {allProducts.map((product, index) => (
                            <tr className="border-b border-gray-200" key={index}>
                                <td className="text-left px-4 py-2 text-[#fff] w-[150px]">{product.name}</td>
                                <td className="text-left px-4 py-2 text-[#fff] ">{product.quantity}</td>
                                <td className="text-left px-4 py-2 text-[#fff]">
                                    <img src={product.imgBook} className="w-[100px]" alt={product.name} />
                                </td>
                                <td className="text-left px-4 py-2 max-w-[250px] overflow-x-y text-[#fff] ">
                                    {product.price.toLocaleString()} VND
                                </td>
                                <td className="text-left px-4 py-2 text-yellow-500 font-semibold">{(product.price * product.quantity).toLocaleString()} VND</td>
                                <td className="text-left px-4 py-2 text-yellow-500 font-semibold">{product.status}</td>
                                <td className="text-left px-2 py-2 text-yellow-500 font-semibold"> <small className="text-gray-500 dark:text-slate-400"> {product.dateCheckout && format(new Date(product.dateCheckout), 'yyyy-MM-dd HH:mm:ss')}</small></td>
                                
                                <td className="px-4 py-2">
                                    <div className="flex items-center justify-center">
                                        <DeleteButton_square titleDelete="Hủy Đơn Hàng" clickDelete={""} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </>):(<>
                         <h1 className="text-[#fff] text-[25px]">Tạm thời chưa có đơn đặt hàng</h1>
                    </>)}
                  
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MyOrder;


