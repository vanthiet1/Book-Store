
const Footer = () => {
    return (
        <>
            <div className="grid grid-cols-6 bg-black p-[25px] items-center max-lg:grid-cols-3 max-lg:pb-[100px] max-lg:gap-4">
                <div className="px-5 max-lg:p-0">
                    <img className="w-[300px]" src="https://res.cloudinary.com/dz93cdipw/image/upload/v1713860650/Book-Store/logo/wjmbwk6ugkhy4qvajszm.png" alt="Logo" />
                    <span className="text-[#999999]">
                        Công ty cổ phần sách điện tử</span>
                    <div className="">
                        <div className="flex gap-1">
                            <span className="text-[#999999] block">0349850070</span>
                        </div>
                        <div className="flex gap-1">
                            <span className="text-[#999999] block">vanthietfrontend@gmail.com</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="text-[#fff]">Về chúng tôi</h1>
                    <span className="block text-[#999999] ">Giới thiệu</span>
                    <span className="block text-[#999999]">Cơ cấu tổ chức</span>
                    <span className="block text-[#999999]">Lĩnh vực hoạt động</span>
                </div>
                <div>
                    <h1 className="text-[#fff]">Tuyển dụng</h1>
                    <span className="block text-[#999999] ">Cơ hội đầu tư</span>
                    <span className="block text-[#999999]">Tuyển dụng</span>
                    <span className="block text-[#999999]">Liên hệ</span>
                </div>
                <div>
                    <h1 className="text-[#fff]">Thông tin hữu ích</h1>
                    <span className="block text-[#999999] ">Thỏa thuận sử dụng dịch vụ</span>
                    <span className="block text-[#999999]">Quyền lợi</span>
                    <span className="block text-[#999999]">Quy định riêng tư</span>
                    <span className="block text-[#999999]">Câu hỏi thường gặp</span>
                </div>
                <div>
                    <h1 className="text-[#fff]">Tin tức</h1>
                    <span className="block text-[#999999] ">Tin dịch vụ</span>
                    <span className="block text-[#999999]">Rivew sách</span>
                    <span className="block text-[#999999]">Lịch phát hành</span>
                </div>
                <div className="flex gap-2">
                    <div>
                    
                            <img className='w-[150px]' src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://www.facebook.com/profile.php?id=100045168130398" alt="Qr Code Information" />
            
                    </div>
                    <div>
                        <img className="w-[200px] pb-2" src="https://waka.vn/images/app-store.png" alt="App Store" />
                        <img className="w-[200px] " src="https://waka.vn/images/google-play.png" alt="Google play" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;