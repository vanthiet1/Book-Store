import Warning from "../../../public/img/icon-warning.png"
const PolicyDelete = () => {
    return (
        <>
            <div>
                <h1 className="text-[#fff]">Khi thực hiện lựa chọn xóa tài khoản</h1>
                <div className="flex">
                    <img src={Warning} alt="Warning" />
                    <span>Tài khoản của bạn sẽ bị xóa vĩnh viễn</span>
                </div>
                <div className="flex">
                    <img src={Warning} alt="Warning" />
                    <span>Tài khoản của bạn sẽ bị xóa vĩnh viễn</span>
                </div>
            </div>
        </>
    );
};

export default PolicyDelete;