import App from './app';
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import DisplayContext from '~/contexts/UiContext';
import DataUserLogin from '~/contexts/authContext/DataUserLogin';
import UiContextAdmin from '~/pages/AdminPage/contexts/UiContextAdmin';
import DataUserRegister from '~/contexts/authContext/DataUserRegister';
import DataCart from '~/contexts/CartContext';
ReactDOM.createRoot(document.getElementById('root')).render(
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

)
