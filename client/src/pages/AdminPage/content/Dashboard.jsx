import { useEffect, useState } from "react";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import CardOverview from "../components/cards/CardOverview";
import IconOverview from '../components/icon/IconOverview';
import { GetDataUserCheckout } from "../service/checkoutService";
import { FormatCurrency } from "../Utils/formatCurrency";
import { GetDataBook } from "../service/productService";
const Dashboard = () => {
    const [quantityUserCheckout, setQuantityUserCheckout] = useState([])
    const [isTotal, setIsTotal] = useState(0);
    const [quantityProducts, setQuantityProducts] = useState(0);


    useEffect(() => {
        const getUserCheckout = async () => {
            try {
                const quantityCheckout = await GetDataUserCheckout();
                setQuantityUserCheckout(quantityCheckout)
            } catch (error) {
                console.log(error);
            }
        }
        getUserCheckout()
    }, []);

    useEffect(() => {
        const total = quantityUserCheckout.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
        setIsTotal(total)
    }, [quantityUserCheckout]);
      useEffect(()=>{
         const getQuantityProduct = async ()=>{
            try {
                const totalQuantityProduct = await GetDataBook()
                setQuantityProducts(totalQuantityProduct?.length)
               } catch (error) {
                   console.log(error);
               }
         }
         getQuantityProduct()
      },[quantityProducts])
    return (
        <>
            <div>
                <div className="flex items-center gap-4">
                    <IconOverview />
                    <h1 className="text-[30px] font-medium ">Overview</h1>
                </div>
                <div className="grid grid-cols-4 gap-5 pt-5">
                    <CardOverview
                        titleCard={"Order"}
                        quantity={quantityUserCheckout?.length}
                        iconCard={<TfiShoppingCartFull className="text-[40px] text-[#10b981]" />}
                    />
                    <CardOverview
                        titleCard={"Tổng Doanh Thu"}
                        quantity={FormatCurrency(isTotal) + " VND"}
                        iconCard={<FaMoneyBillTrendUp className="text-[40px] text-[#10b981]" />}
                    />
                         <CardOverview
                        titleCard={"Số Lượng Sản Phẩm"}
                        quantity={quantityProducts}
                        iconCard={<FaMoneyBillTrendUp className="text-[40px] text-[#10b981]" />}
                    />
                </div>
            </div>
        </>
    );
};

export default Dashboard;