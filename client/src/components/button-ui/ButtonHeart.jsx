import { IoHeartOutline } from '../icons/Heart';

const ButtonHeart = () => {

    return (
        <>
            <div className='bg-[#2D3D3A] flex items-center justify-center rounded-full w-[50px] border opacity-[0.9] cursor-pointer max-md:hidden'>
                <IoHeartOutline className='text-white text-[25px]'/>
            </div>
        </>
    );
};

export default ButtonHeart;