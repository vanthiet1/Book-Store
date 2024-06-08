import { useEffect, useState, useContext } from "react";
import CheckButton from "../components/button/CheckButton";
import DeleteButton_square from "../components/button/DeleteButton_square";
import { GetDataUserCheckout, GetAnDataUserCheckout, DeleteOrderCheckout,UpdateOrderCheckout , CancelOrderCheckout } from "../service/checkoutService";
import { GetNameUser } from "../service/userService";
import DetailProduct from "../components/detailProductCheckout/DetailProduct";
import { DisplayPopup } from "../contexts/UiContextAdmin";
import Error from "~/components/notification/Error";
import Close from "~/components/icons/Close";
import Success from "~/components/notification/Success";
import ConfirmButton from "../components/button/ConfirmButton";


const Checkout = () => {
    const { showDetailProductCheckout, handleDisplayProductCheckout,
        handleHideProductCheckout } = useContext(DisplayPopup)
    const [dataCheckout, setDataCheckout] = useState([]);
    const [userNames, setUserNames] = useState({});
    const [detailProductCheckout, setDetailProductCheckout] = useState([]);
    const [errorOrderProduct, setErrorOrderProduct] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [cancelProduct, setCancelProduct] = useState(false);
    const [confirmSuccess, setConfirmSuccess] = useState(false);



    const getDataCheckout = async () => {
        try {
            const response = await GetDataUserCheckout();
            setDataCheckout(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDataCheckout();
    }, []);

    const getNameUser = async (id) => {
        try {
            const name = await GetNameUser(id);
            setUserNames(prevState => ({
                ...prevState,
                [id]: name
            }));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        dataCheckout.forEach(checkout => {
            if (!userNames[checkout.userId]) {
                getNameUser(checkout.userId);
            }
        });
    }, [dataCheckout]);

    const DataCheckout = async (userId) => {
        try {
            const response = await GetAnDataUserCheckout(userId);
            setDetailProductCheckout(response);
            handleDisplayProductCheckout();
        } catch (error) {
            console.log(error);
        }
    }

    const DeleteOrder = async (orderId) => {
        try {
            if (!orderId || orderId === undefined) {
                return setErrorOrderProduct(true)
            }
            await DeleteOrderCheckout(orderId);
            setDeleteSuccess(true);
            getDataCheckout()
        } catch (error) {
            console.log(error);
        }
    }

    const vertifyOrderCheckout = async (orderId)=>{
           try {
             if(!orderId || orderId === undefined) {
                return console.log('lỗi');
             }
              await UpdateOrderCheckout(orderId);
              getDataCheckout()
              setConfirmSuccess(true)
           } catch (error) {
              console.log(error);
           }
    }
    const cancelOrderCheckout = async (orderId)=>{
        try {
          if(!orderId || orderId === undefined) {
             return console.log('lỗi');
          }
           await CancelOrderCheckout(orderId);
           getDataCheckout()
           setCancelProduct(true)
        } catch (error) {
           console.log(error);
        }
 }

    return (
        <>

            {errorOrderProduct && (<Error message={'Không tìm thấy sản phẩm để xóa'} />)}
            {deleteSuccess && (<Success message={"Xóa thành công đơn hàng"} />)}
            {confirmSuccess && (<Success message={"Đơn hàng đã xác nhận thành công"} />)}
            {cancelProduct && (<Success message={"Hủy đơn hàng thành công"} />)}


            {showDetailProductCheckout && (
                <>
                <div className="fixed">
                <thead className="bg-gray-200 h-16 ">
                        <tr>
                            <th className="text-left px-20">Tên</th>
                            <th className="text-left px-[100px]">Số Lượng</th>
                            <th className="text-left px-0">Giá Tiền</th>
                            <th className="text-left px-[130px]">Ảnh</th>
                            <th className="text-left px-20">Thời Gian</th>
                            <th className="text-left px-[80px] cursor-pointer" >
                                <Close
                                    onClick={() => handleHideProductCheckout()}
                                />
                            </th>
                        </tr>
                    </thead>
                    <div className="overflow-y-auto h-[600px] bg-white w-full ">
                        <table className="w-[1250px]" >
                            {detailProductCheckout.map((checkout, index) => (
                                <div key={index}>
                                    {checkout.products && checkout.products.map((product, idx) => (
                                        <DetailProduct
                                            key={idx}
                                            nameProduct={product.name}
                                            quantityProduct={product.quantity}
                                            priceProduct={product.price}
                                            imgProduct={product.imgBook}
                                            dateCheckoutProduct={product.dateCheckout}
                                        />
                                    ))}
                                </div>
                            ))}
                        </table>
                    </div>
                </div>
                </>
            )}

            <div className="overflow-y-auto h-[640px] ">
                <table className="w-full"  >
                    <thead className="bg-gray-100 h-16">
                        <tr>
                            <th className="text-left px-4">Tên</th>
                            <th className="text-left px-4">Số Điện Thoại</th>
                            <th className="text-left px-4">Địa Chỉ</th>
                            <th className="text-left px-4"> Thanh Toán</th>
                            <th className="text-left px-4">Tổng Tiền</th>
                            <th className="text-left px-4">Trạng thái</th>

                            <th className="pr-5 py-2  text-right" colSpan="10">
                                <span>Xem Chi Tiết</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody >
                        {dataCheckout && dataCheckout.map((checkout, index) => (
                            <tr className="border-b border-gray-200" key={index}>
                                <td className="text-left px-4 py-2">{userNames[checkout.userId] || "Đang tải..."}</td>
                                <td className="text-left px-4 py-2">{checkout.phoneNumber}</td>
                                <td className="text-left px-4 py-2 max-w-[250px] overflow-x-y"> {checkout.address} </td>
                                <td className="text-left px-4 py-2">{checkout.methodPayment}</td>
                                <td className="text-left px-4 py-2">{checkout.totalPrice.toLocaleString() + " VND"} </td>
                                <td className="text-left px-4 py-2 font-semibold">{checkout.status ?   <span className="text-green-600">Thành công</span> : <span className="text-yellow-500 ">Đang chờ</span>}</td>
                                <td className="text-left px-4 py-2"></td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center justify-center">
                                        <CheckButton clickCheck={() => {
                                            DataCheckout(checkout.userId)
                                        }} />
                                        <DeleteButton_square titleDelete="Xóa Đơn Hàng" clickDelete={() => { DeleteOrder(checkout._id) }} />
                                        <ConfirmButton clickConfirm={()=>{vertifyOrderCheckout(checkout._id)}} />
                                         
                                        <span className="cursor-pointer" onClick={()=>{cancelOrderCheckout(checkout._id)}} > Hủy </span>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );
};

export default Checkout;
