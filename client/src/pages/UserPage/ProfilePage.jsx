import Header from "~/layouts/Header";
import Footer from "~/layouts/Footer";
import UserSidebar from "~/layouts/Contents/MainProfile/UserSidebar";
import SettingProfile from "~/layouts/Contents/MainProfile/SettingProfile";
const ProfilePage = () => {
  return (
    <>
      <div>
        <Header />
        <div className="flex h-auto pt-[100px] bg-black p-5">
        <UserSidebar/>
         <SettingProfile/>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProfilePage;