import { useEffect, useState ,useContext} from "react";
import CheckButton from "../components/button/CheckButton.jsx";
import DeleteButton_square from "../components/button/DeleteButton_square.jsx";
import { GetDataUserCheckout, GetAnDataUserCheckout } from "../service/checkoutService.jsx";
import { GetNameUser } from "../service/userService.jsx";
import DetailProduct from "../components/DetailProductCheckout/DetailProduct.jsx";
import { DisplayPopup } from "../contexts/UiContextAdmin.jsx";
const Checkout = () => {
    const {showDetailProductCheckout , handleDisplayProductCheckout,
        handleHideProductCheckout  } = useContext(DisplayPopup)
    const [dataCheckout, setDataCheckout] = useState([]);
    const [userNames, setUserNames] = useState({});
    const [detailProductCheckout, setDetailProductCheckout] = useState([]);

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
            console.log(response);
            setDetailProductCheckout(response);
            handleDisplayProductCheckout();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
{showDetailProductCheckout && (
    <div className="fixed z-10">
            <thead className="bg-gray-200 h-16 ">
                <tr>
                    <th className="text-left px-20">Tên</th>
                    <th className="text-left px-[100px]">Số Lượng</th>
                    <th className="text-left px-0">Giá Tiền</th>
                    <th className="text-left px-[130px]">Ảnh</th>
                    <th className="text-left px-20">Thời Gian</th>
                    <th className="text-left px-[80px]" onClick={() => handleHideProductCheckout()}>Ẩn</th>
                </tr>
            </thead>
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
      
    </div>
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
                                <td className="text-left px-4 py-2 text-yellow-500 font-semibold">{checkout.status}</td>
                                <td className="text-left px-4 py-2"></td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center justify-center">
                                        <CheckButton clickCheck={() => { DataCheckout(checkout.userId) }} />
                                        <DeleteButton_square titleDelete="Xóa Đơn Hàng" clickDelete={"c"} />
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
