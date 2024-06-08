import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { LoginAuth } from '~/services/auth/LoginAuth';
import { Uicontext } from '~/contexts/UiContext';

const LoginGoogle = () => {
    const [data, setData] = useState({});
    const {handleHideLogin} = useContext(Uicontext);
    useEffect(() => {
        const loginUser = async () => {
            try {
                if (Object.keys(data).length > 0) {
                await LoginAuth.loginGoogle(data?data:null);
                handleHideLogin()
                }
            } catch (error) {
                console.log(error);
            }
        }

        loginUser();
    }, [data]);

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                localStorage.setItem('token', JSON.stringify(response.access_token));
                const token = localStorage.getItem('token');
                const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                const dataLoginGoogle = {
                    email: res.data.email,
                    sub: res.data.sub,
                    email_verified:res.data.email_verified,
                }
                setData(dataLoginGoogle);
                window.location.href='/'
            } catch (error) {
                console.log(error);
            }
        },
        onError: (error) => {
            console.log('Login Failed', error);
        },
    });

    return (
        <button className="w-[150px] text-white" onClick={login}>Google</button>
    );
};

export default LoginGoogle;
