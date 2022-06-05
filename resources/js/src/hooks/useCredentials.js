import { useState } from "react";

export function useCredentials() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const handleChangeCredentials = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value});
    }

    const handleSubmitCredentials = (e) => {
        e.preventDefault();
    }

    return {
        credentials,
        handleChangeCredentials,
        handleSubmitCredentials
    }
}
