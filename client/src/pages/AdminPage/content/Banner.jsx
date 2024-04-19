import { useState, useEffect } from "react";
import AddButton from "../components/button/AddButton";
import UpdateButton from "../components/button/UpdateButton";
import DeleteButton_square from "../components/button/DeleteButton_square";
import AddForm from "../components/form/AddForm";
import Success from "~/components/notification/Success";
import Error from "~/components/notification/Error";
import { AddBanner, GetDataBanner, DeleteBanner } from "../service/bannerService";
const Banner = () => {
    const [imageBanner, setImageBanner] = useState("");
    const [banner, setBanner] = useState([]);
    const [showFormAddBannerAdmin, setShowFormAddAdmin] = useState(false);
    const [showErrorValidateForm, setShowErrorValidateForm] = useState(false);
    const [showSucessAddBanner, setShowSucessAddBanner] = useState(false);
    const [showSuccessDelete, setShowSuccessDelete] = useState(false)

    const getBanner = async () => {
        try {
            const response = await GetDataBanner();
            setBanner(response);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getBanner();
    }, []);
    const handleAddBanner = async () => {
        try {
            const data = {
                image: imageBanner
            }
            if (imageBanner === "") {
                return setShowErrorValidateForm(true)
            }
            await AddBanner(data);
            setImageBanner("");
            setShowSucessAddBanner(true);
            getBanner()
            setTimeout(() => { setShowFormAddAdmin(false), 500 })
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteBanner = async (id) => {
        try {
            await DeleteBanner(id);
            setShowSuccessDelete(true);
            getBanner()
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            {showErrorValidateForm && <Error message="Vui lòng nhập đầy đủ" />}
            {showSucessAddBanner && <Success message={'Thêm Banner thành công'} />}
            {showSuccessDelete && <Success message={'Xóa Banner thành công'} />}
            {showFormAddBannerAdmin && (
                <div className="w-[300px] h-auto fixed shadow left-[45%] p-5 z-[10] bg-white rounded-md">
                    <AddForm
                        placeholder="Nhập link ảnh"
                        titleForm="Thêm ảnh banner"
                        onSubmit={handleAddBanner}
                        value={imageBanner}
                        onChange={(e) => setImageBanner(e.target.value)}
                        nameClick="Thêm "
                    />
                </div>
            )}
            <table className="w-full">
                <thead className="bg-gray-100 h-16">
                    <tr>
                        <th className="text-left px-4">Ảnh Banner</th>
                        <th className="px-4 py-2 w-[300px]" colSpan="4">
                            <AddButton
                                nameButton="Thêm Banner"
                                click={() => { setShowFormAddAdmin(true) }}
                            />
                        </th>
                    </tr>
                </thead>
              
                <tbody>
                <div className="overflow-y-auto h-[600px]">
                    {banner && banner.map((banner, index) => (
                        <tr className="border-b border-gray-200" key={index}>
                            <td className="text-left  py-2">
                                <img className="w-full h-full" src={banner.image ? banner.image : " Sớm cập nhật  "} alt="Banner" />
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex items-center justify-center">
                                    <UpdateButton
                                        clickUpdate={() => {
                                            // setEditingCategoryId("");
                                            // handleDisplayUpdateCategory()
                                        }}
                                    />
                                    <DeleteButton_square titleDelete="Xóa banner" clickDelete={() => handleDeleteBanner(banner._id)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                    </div>
                </tbody>
                
            </table>
        </>
    );
};

export default Banner;