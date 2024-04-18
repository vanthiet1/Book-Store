import { FaUserGroup } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import CardOverview from "../components/cards/CardOverview";
import IconOverview from '../components/icon/IconOverview';
const Dashboard = () => {
    return (
        <>
            <div>
                <div className="flex items-center gap-4">
                    <IconOverview />
                    <h1 className="text-[30px] font-medium ">Overview</h1>
                </div>
                <div className="grid grid-cols-3 gap-5 pt-5">
               {Array.from({length:3}).map((_,index)=>(
                <>
                     <CardOverview
                         key={index}
                        statistics={"12%"}
                        icon={<IoMdSettings />}
                        titleCard={"Clients"}
                        quantity={"512"}
                        iconCard={<FaUserGroup className="text-[40px] text-[#10b981]" />}
                    />
                     </>
               ))}      
                </div>
            </div>
        </>
    );
};

export default Dashboard;