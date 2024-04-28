import { createContext, useState ,useContext } from "react"; 
import { DataUser } from "./authContext/DataUserLogin";
export const Uicontext = createContext();
const DisplayContext = ({ children }) => {
    const {inforUser} = useContext(DataUser)
    const [displayLogin, setDisplayLogin] = useState(false);
    const [displayForgotPassword, setDisplayForgotPassword] = useState(false);
    const [displayRegister, setDisplayRegister] = useState(false);
    const [displayComment, setDisplayComment] = useState(false);
    const [displayVertify, setDisplayVertify] = useState(false);
    const [displayCart, setDisplayCart] = useState("translate-x-[500px]");
    const [displayUserSidebar, setDisplayUserSidebar] = useState("translate-x-[-500px]");


 
    const [filter, setFilter] = useState(null);
  
    // Ui login 
    const handleDisplayLogin =  () => {
        setTimeout(() => {
            setDisplayLogin((prevLogin) => !prevLogin);
            setDisplayForgotPassword(false)
        }, 200)
        setDisplayRegister(false);
        setFilter('filter')
    }
    const handleHideLogin = () => {
        setDisplayLogin(!displayLogin)
        setFilter('')
    }

    // Ui register
    const handleDisplayRegister = () => {
        setTimeout(() => {
            setDisplayRegister((prveRegister) => !prveRegister);
        }, 200)

        setDisplayLogin(false);
        setFilter('filter')

    }
    const handleHideRegister = () => {
        setDisplayRegister(!displayRegister)
        setFilter('')
    }
    // Ui comment
    const handleDisplayComment = () => {
        setTimeout(() => {
            setDisplayComment((prveComment) => !prveComment);
        }, 100)

        setDisplayComment(false);
        setFilter('filter')
    }
    const handleHideComment = () => {
        setDisplayComment(false);
        setFilter('')
    }
    // Ui cart
    const handleDisplayCart = () => {
        setDisplayCart("translate-x-[0px]");
    }
    const handleHideCart = () => {
        setDisplayCart("translate-x-[500px] duration-300 ease");
    }
    // Ui Vertify Account
    const handleHideVertify = () => {
        setDisplayVertify(false)
        setFilter('')
        if(inforUser){
            return;
        }
        setTimeout(() => {
            setDisplayLogin(true)
            setFilter('filter')
        }, 200);
    }

    const handleDisplayVertify = () => {
        setTimeout(() => {
            setDisplayVertify((prveComment) => !prveComment);
        }, 200)
        setDisplayVertify(false);
        setFilter('filter')
    }
   
    const handleDisplayVertifyInlogin = ()=>{
        setDisplayVertify(true);
        setDisplayLogin(false)
    }

    const handleDisplayForgot =  () => {
        setTimeout(() => {
            setDisplayForgotPassword((prevLogin) => !prevLogin);
        }, 200)
        setDisplayLogin(false);
        setFilter('filter')
    }
    const handleHideForgot = () => {
        setDisplayForgotPassword(!displayForgotPassword);
        setFilter('')
    }
 
    const handleDisplayUserSidebar = ()=>{
        setDisplayUserSidebar("translate-x-[0px]")
    }
    const handleHideUserSidebar = ()=> {
        setDisplayUserSidebar("translate-x-[-500px]")
    }
    const dataDisplay = {
        displayCart,
        displayRegister,
        displayLogin,
        displayComment,
        displayVertify,
        displayForgotPassword,
        scroll,
        filter,
        setFilter,

        handleHideCart,
        handleDisplayCart,

        handleDisplayRegister,
        handleHideRegister,

        handleDisplayLogin,
        handleHideLogin,

        handleHideComment,
        handleDisplayComment,

        handleHideVertify,
        handleDisplayVertify,
        handleDisplayVertifyInlogin,

        handleDisplayForgot,
        handleHideForgot,

        handleDisplayUserSidebar,
        handleHideUserSidebar,
        displayUserSidebar
    }
    return (
        <div>
            <Uicontext.Provider value={dataDisplay}>
                {children}
            </Uicontext.Provider>
        </div>
    );
};

export default DisplayContext;