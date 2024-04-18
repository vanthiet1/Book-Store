import { FaUserFriends } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { RiBook3Fill } from "react-icons/ri";
import { RiHomeOfficeFill } from "react-icons/ri";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { AiFillBook } from "react-icons/ai";
import { FaClipboardCheck } from "react-icons/fa6";
import { FaChalkboardUser } from "react-icons/fa6";
const ListNavigation = [
    {
        name: "Dashboarh",
        icon: <RiHomeOfficeFill />,
        path: '/Dashboard'
    },
    {
        name: "Products",
        icon: <RiBook3Fill />,
        path: '/Dashboard/Product'

    },
    {
        name: "Categories",
        icon: <BiSolidCategory />,
        path: '/Dashboard/Category'

    },
    {
        name: "Genres",
        icon: <AiFillBook />,
        path: '/Dashboard/Genres'

    },
    {
        name: "Author",
        icon: <FaChalkboardUser />,
        path: '/Dashboard/Author'
    },
    {
        name: "Users",
        icon: <FaUserFriends />,
        path: '/Dashboard/User'
    },
    {
        name: "Comments",
        icon: <IoChatboxEllipsesSharp />,
        path: '/Dashboard/Comment'
    },
    {
        name: "Checkout",
        icon: <FaClipboardCheck />,
        path: '/Dashboard/Checkout'
    }
  

]
export default ListNavigation;