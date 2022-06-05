import { Link    } from 'react-router-dom';
import {useAuth} from "../hooks/useAuth";

function Layout({ children }) {
    const { userIsLoggedIn, handleLogout } = useAuth();

     return (
        <>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="https://airosoftware.com/" target="_blank" rel="noreferrer">
                        <img
                            alt=""
                            width="30"
                            height="24"
                            className="d-inline-block align-text-top"
                            src="https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg"
                        />
                        &nbsp; Airo Software Test
                    </a>
                    <button
                        type="button"
                        data-bs-toggle="collapse"
                        className="navbar-toggler"
                        aria-controls="navbarSupportedContent"
                        data-bs-target="#navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Quotation</Link>
                            </li>
                            <li className="nav-item ms-4">
                                {!userIsLoggedIn ? (
                                    <Link className="btn btn-sm btn-outline-primary my-1" to="/user/login">Login</Link>
                                ) : (
                                    <button className="btn btn-sm btn-outline-danger my-1" onClick={handleLogout}>Logout</button>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <main className="container my-5">
                {children}
            </main>
        </>
    )
}

export default Layout;
