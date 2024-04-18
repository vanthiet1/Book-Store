
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <>
            <div className="grid grid-cols-6 bg-black p-[25px] items-center">
                <div className="px-5">
                    <img src="https://waka.vn/images/logo.png" alt="" />
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
                        <Link to={'https://www.facebook.com/profile.php?id=100045168130398'}>
                            <img className='w-[100px]' src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://www.facebook.com/profile.php?id=100045168130398" alt="" />
                        </Link>
                    </div>
                    <div>
                        <img src="https://waka.vn/images/app-store.png" alt="" />
                        <img src="https://waka.vn/images/google-play.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;