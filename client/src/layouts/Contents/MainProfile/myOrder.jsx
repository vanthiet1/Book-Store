import { useContext, useState, useEffect } from "react";
import { format } from 'date-fns';
import { DataUser } from "../../../contexts/authContext/DataUserLogin";
import { GetDataUserCheckout } from "../../../services/checkout/checkoutUserService";
import Error from "~/components/notification/Error";
import Success from "~/components/notification/Success";
import ButtonConfirm from "~/components/button-ui/ButtonConfirm";
import { DeleteOrderCheckout } from "~/pages/AdminPage/service/checkoutService";
const MyOrder = () => {
    const { inforUser } = useContext(DataUser);
    const [allProducts, setAllProducts] = useState([]);4
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [errorOrderProduct, setErrorOrderProduct] = useState(false);
//   console.log(allProducts);

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
    const DeleteOrder = async (orderId) => {
        try {
            if (!orderId || orderId === undefined) {
                return setErrorOrderProduct(true)
            }
            await DeleteOrderCheckout(orderId);
            setDeleteSuccess(true);
            handleGetDataCheckout()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
          {errorOrderProduct && (<Error message={'Không tìm thấy sản phẩm để xóa'} />)}
            {deleteSuccess && (<Success message={"Hủy thành công đơn hàng"} />)}
            <div className="overflow-x-auto ">
                <table className="max-md:w-[1200px] ">
                    <thead className="bg-gray-100 h-16 ">
                        <tr>
                            <th className="text-left px-4 ">Tên </th>
                            <th className="text-left px-4 max-md:w-[30px]">Số lượng</th>
                            <th className="text-left px-4">Sách</th>
                            <th className="text-left px-4">Giá</th>
                            <th className="text-left px-4">Tổng Tiền</th>
                            <th className="text-left px-4">Trạng thái</th>
                            <th className="text-left px-4">Ngày Mua</th>
                            <th className="pr-5 py-2  text-right" colSpan="10">
                               <span>Hủy đơn</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProducts.length > 0 ? (<>
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
                                    <td className="text-left px-4 py-2 text-yellow-500 font-semibold">{product.status ?  "Đã xác nhận" : "Đang chờ xác nhận"}</td>
                                    <td className="text-left px-2 py-2 text-yellow-500 font-semibold"> <small className="text-gray-500 dark:text-slate-400"> {product.dateCheckout && format(new Date(product.dateCheckout), 'yyyy-MM-dd HH:mm:ss')}</small></td>

                                    <td className="px-4 py-2">
                                    <ButtonConfirm
                                clickDelete={()=>DeleteOrder(product._id)}
                                    onClick={"c"}
                                    content={`Hủy Đơn `}
                                    bgBtn={"bg-red-600"}
                                />
                                    </td>
                                </tr>
                            ))}
                        </>) : (<>
                            <h1 className="text-[#fff] text-[25px] max-md:text-[20px]">Tạm thời chưa có đơn đặt hàng</h1>
                        </>)}

                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MyOrder;


