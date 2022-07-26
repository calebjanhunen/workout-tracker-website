import { useState } from "react";
import Button from "react-bootstrap/Button";
import styles from "./login.module.css";

const LoginPage = () => {
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");

    function handleSubmitLogin(e) {
        e.preventDefault();
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmitLogin}>
                <div className="login-page__username">
                    <label htmlFor="username">Username</label>
                    <input id="username" className="form-control" />
                </div>
                <div className="login-page__password">
                    <label htmlFor="password">password:</label>
                    <input id="password" placeholder="password" />
                </div>
                <Button>Login</Button>
            </form>
        </div>
    );
};

export default LoginPage;
