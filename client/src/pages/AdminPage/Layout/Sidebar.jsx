import ListNavigation from "../Utils/ListNavigation";
import { Link, useLocation } from 'react-router-dom';
const Sidebar = () => {
    const location = useLocation();
    return (
        <>
            <div >
                {ListNavigation.map((itemMenu, index) => (
                    <Link to={itemMenu.path} key={index}>
                        <div className={`flex gap-3 items-center cursor-pointer py-2 rounded-md px-3 my-2 ${location.pathname === itemMenu.path ? 'bg-blue-500' : ''}`}>
                            <span className="text-[#fff]">{itemMenu.icon}</span>
                            <span className="text-[#fff]">{itemMenu.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Sidebar;