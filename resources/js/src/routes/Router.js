import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Quotation from './../pages/Quotation';
import Login from './../pages/Login';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path={'/'} element={<Quotation />}/>
                <Route exact path={'/user/login'} element={<Login />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
