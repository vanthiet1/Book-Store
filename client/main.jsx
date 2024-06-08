import App from './app';
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import DisplayContext from '~/contexts/UiContext';
import DataUserLogin from '~/contexts/authContext/DataUserLogin';
import UiContextAdmin from '~/pages/AdminPage/contexts/UiContextAdmin';
import DataUserRegister from '~/contexts/authContext/DataUserRegister';
import DataCart from '~/contexts/CartContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId="975833058360-hdha90rrt77a6as6p4d30bqplja6ihpc.apps.googleusercontent.com">
    <DataCart>
        <DataUserLogin>
            <DataUserRegister>
                <DisplayContext>   
                    <UiContextAdmin>
                        <Router>
                            <App />
                        </Router>
                    </UiContextAdmin>
                </DisplayContext>
            </DataUserRegister>
        </DataUserLogin>
    </DataCart>
    </GoogleOAuthProvider>
)
