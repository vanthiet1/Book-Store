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
    <GoogleOAuthProvider clientId="715759153913-nr2accnelta7pkv0rbgu8g6299eprq6q.apps.googleusercontent.com">
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
