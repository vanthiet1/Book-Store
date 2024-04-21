import Warning from "../../public/img/icon-warning.png";
const PolicyDelete = () => {
    return (
        <>
            <div className="pt-5">
                <h1 className="text-[#fff] text-[20px] font-semibold">Khi thực hiện lựa chọn xóa tài khoản</h1>
                <div className="pt-3">
                    <div className="flex gap-2 pb-2">
                        <img src={Warning} alt="Warning" />
                        <span className="text-[#fff] font-semibold ">Tài khoản của bạn sẽ bị xóa vĩnh viễn</span>
                    </div>
                    <p className="text-[#fff]">Tài khoản của bạn sẽ bị xóa sau 30 ngày kể từ thời điểm bạn xác nhận xóa tài khoản nếu không có bất kỳ thao tác đăng nhập lại để sử dụng tài khoản. Xoá tài khoản tại đây đồng nghĩa với việc bạn sẽ không thể truy cập, sử dụng các dịch vụ chung của VegaID gồm Waka, ClipTV, Nhac.vn ..</p>
                </div>
                <div className="pt-3">
                    <div className="flex gap-2 pb-2">
                        <img src={Warning} alt="Warning" />
                        <span className="text-[#fff] font-semibold">Tài khoản xóa sẽ mất vĩnh viễn các nội dung sở hữu</span>
                    </div>
                    <p className="text-[#fff]">Trang cá nhân, tài khoản, ảnh, bình luận, đánh giá sách, tủ sách cá nhân, sách mua lẻ, thời hạn hội viên của bạn sẽ bị mất vĩnh viễn khi tài khoản của bạn được xóa</p>
                </div>
                <div className="pt-3">
                    <div className="flex gap-2 pb-2">
                        <img src={Warning} alt="Warning" />
                        <span className="text-[#fff] font-semibold">Đảm bảo rằng trước khi xóa tài khoản các gói gia hạn Waka đã được hủy</span>
                    </div>
                    <p className="text-[#fff]">Hãy chắc chắn rằng bạn đã hủy các gói đăng ký tự động gia hạn trước thời điểm xóa tài khoản để tránh gói cước được tiếp tục gia hạn. Xem mục “Quản lý đăng ký” trên <a href="" className="text-[#15B088]">CHplay</a> và <a href="" className="text-[#15B088]"> AppStore</a> để kiểm tra thông tin gia hạn của bạn.
Bằng việc thực hiện xóa tài khoản là bạn <a href="" className="text-[#15B088]">đồng ý với Thỏa thuận sử dụng dịch vụ</a> và hoàn toàn chịu trách nhiệm với hành vi của mình</p>
                </div>
            </div>
        </>
    );
};

export default PolicyDelete;