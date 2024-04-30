import { lazy, Suspense } from 'react';
import Header from "~/layouts/Header";
import Footer from "~/layouts/Footer";
const LazyUserSidebar = lazy(() => import("~/layouts/Contents/MainProfile/UserSidebar"));
const LazySettingProfile = lazy(() => import("~/layouts/Contents/MainProfile/SettingProfile"));

const ProfilePage = () => {
  return (
    <>
      <div>
        <Header />
        <div className="flex h-auto pt-[100px] bg-black p-5">
          <Suspense>
            <LazyUserSidebar />
            <LazySettingProfile />
          </Suspense>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProfilePage;