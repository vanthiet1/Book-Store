
// import axios from "axios"
// import { URL_API , API_USER_CART} from "../../util/url-api";

// const GetApiCart = async (userCart) => {
//     try {
//         const response = await axios.get(`${URL_API}/${API_USER_CART}/${userCart}`);
//         if (response.status === 200) {
//             return response.data;
//         } else {
//             throw new Error("Failed to fetch cart data");
//         }        
//     } catch (error) {
//         console.error("Error fetching cart data:", error.message);
//         return null;
//     }
// }
// const AddToCart = async (productCart)=>{
//      try {
//         const response = await axios.post(`${URL_API}/${API_USER_CART}`,productCart);
//         return response.data;
//      } catch (error) {
//         console.log(error);
//      }
// }

// export { GetApiCart , AddToCart };
