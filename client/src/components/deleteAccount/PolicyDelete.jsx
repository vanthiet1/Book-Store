import { IconWarning } from "~/public/icon-page/icon";
const PolicyDelete = () => {
    return (
        <>
            <div className="pt-5">
                <h1 className="text-[#fff] text-[20px] font-semibold">Khi thực hiện lựa chọn xóa tài khoản</h1>
                <div className="pt-3">
                    <div className="flex gap-2 pb-2 items-center">
                        <div className="w-[30px]">
                            <img className="max-md:w-full max-md:object-cover" src={IconWarning} alt="Warning" />
                        </div>
                        <span className="text-red-600 font-semibold ">Tài khoản của bạn sẽ bị xóa vĩnh viễn</span>
                    </div>
                    <p className="text-[#fff] max-md:text-[14px]">Tài khoản của bạn sẽ bị xóa sau 30 ngày kể từ thời điểm bạn xác nhận xóa tài khoản nếu không có bất kỳ thao tác đăng nhập lại để sử dụng tài khoản. Xoá tài khoản tại đây đồng nghĩa với việc bạn sẽ không thể truy cập, sử dụng các dịch vụ chung của VegaID gồm Waka, ClipTV, Nhac.vn ..</p>
                </div>
                <div className="pt-3">
                    <div className="flex gap-2 pb-2 items-center">
                        <div className="w-[40px]">
                            <img className="max-md:w-full max-md:object-cover" src={IconWarning} alt="Warning" />
                        </div>
                        <span className="font-semibold text-red-600">Tài khoản xóa sẽ mất vĩnh viễn các nội dung sở hữu</span>
                    </div>
                    <p className="text-[#fff] max-md:text-[14px]">Trang cá nhân, tài khoản, ảnh, bình luận, đánh giá sách, tủ sách cá nhân, sách mua lẻ, thời hạn hội viên của bạn sẽ bị mất vĩnh viễn khi tài khoản của bạn được xóa</p>
                </div>
                <div className="pt-3">
                    <div className="flex gap-2 pb-2 items-center">
                    <div className="w-[55px]">
                         <img className="max-md:w-full max-md:object-cover" src={IconWarning} alt="Warning" />
                         </div>
                        <span className="text-red-600 font-semibold">Đảm bảo rằng trước khi xóa tài khoản các gói gia hạn Waka đã được hủy</span>
                    </div>
                    <p className="text-[#fff] max-md:text-[14px]">Hãy chắc chắn rằng bạn đã hủy các gói đăng ký tự động gia hạn trước thời điểm xóa tài khoản để tránh gói cước được tiếp tục gia hạn. Xem mục “Quản lý đăng ký” trên <a href="" className="text-[#15B088]">CHplay</a> và <a href="" className="text-[#15B088]"> AppStore</a> để kiểm tra thông tin gia hạn của bạn.
                        Bằng việc thực hiện xóa tài khoản là bạn <a href="" className="text-[#15B088]">đồng ý với Thỏa thuận sử dụng dịch vụ</a> và hoàn toàn chịu trách nhiệm với hành vi của mình</p>
                </div>
            </div>
        </>
    );
};

export default PolicyDelete;