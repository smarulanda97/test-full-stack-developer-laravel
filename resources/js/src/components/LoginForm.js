import { useAuth } from "../hooks/useAuth";
import { useCredentials } from '../hooks/useCredentials';

function LoginForm() {
    const { handleLogin, error } = useAuth();
    const { credentials, handleChangeCredentials } = useCredentials();

    return (
        <div className='row justify-content-center'>
            <div className='col-sm-12 col-md-6'>
                <form onSubmit={(e) => handleLogin(e, credentials)}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            required
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            aria-describedby="Email"
                            placeholder="johndoe@doe.com"
                            autoComplete="email-new"
                            onChange={handleChangeCredentials}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            required
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            aria-describedby="Password"
                            placeholder="********"
                            autoComplete='current-password'
                            onChange={handleChangeCredentials}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary mx-auto d-block">Login</button>

                    {error ? (
                        <div className="alert alert-danger d-flex align-items-center mt-3" role="alert">
                            {error}
                        </div>
                    ): null}
                </form>
            </div>
        </div>
    )
}

export default LoginForm;
