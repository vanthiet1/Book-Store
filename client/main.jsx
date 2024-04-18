import ReactDOM from 'react-dom/client'
import App from './app';
import './index.css';
import DisplayContext from './src/contexts/UiContext';
import DataUserLogin from './src/contexts/authContext/DataUserLogin';
import UiContextAdmin from './src/pages/AdminPage/contexts/UiContextAdmin';
import DataUserRegister from './src/contexts/authContext/DataUserRegister';
import DataCart from './src/contexts/CartContext';
import { BrowserRouter as Router } from 'react-router-dom';
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
