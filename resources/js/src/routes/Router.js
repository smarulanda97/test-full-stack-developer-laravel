import { Routes, Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import Login from './../pages/Login';
import Quotation from './../pages/Quotation';

const AuthRoute = ({ component }) => {
    const { userIsLoggedIn } = useAuth();
    if (!userIsLoggedIn) {
        return <Navigate to={'/user/login'} replace={true} />
    }

    return component();
}

const LoginRoute = ({ component }) => {
    const { userIsLoggedIn } = useAuth();
    if (userIsLoggedIn) {
        return <Navigate to={'/'} replace={true} />
    }

    return component();
}

function Router() {
    return (
        <Routes>
            <Route exact path={'/'} element={<AuthRoute component={() => <Quotation />} />}/>
            <Route exact path={'/user/login'} element={<LoginRoute component={() => <Login />} /> }/>
        </Routes>
    )
}

export default Router;
