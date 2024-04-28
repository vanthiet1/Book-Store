
const InformationUser = (props) => {
    const {phoneNumberUser, adressUser } = props;
    return (
        <>
            <div className="h-auto bg-red-50 w-full">
                <table >
                    <tbody  >
                        <tr className="border-b border-gray-200" >
                            <td className="text-left px-4 py-2 w-[300px]">{phoneNumberUser}</td>
                            <td className="text-left px-4 py-2">{adressUser}</td>
                            <td className="text-left px-4 py-2"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default InformationUser;