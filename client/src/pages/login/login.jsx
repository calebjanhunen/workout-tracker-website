import {
    Box,
    Button,
    Card,
    Container,
    TextField,
    Typography,
} from '@material-ui/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import styles from './login.module.css';

import { useLoginMutation } from 'redux/features/authApiSlice';
import { setCredentials } from 'redux/reducer/authSlice';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [login] = useLoginMutation();
    const accessToken = useSelector(state => state.auth.accessToken);

    async function handleSubmitLogin(e) {
        e.preventDefault();
        if (user.length < 4) {
            return console.log('username must be at least 4 characters long');
        }
        if (pwd.length < 8) {
            return console.log('Password must be at least 8 characters long');
        }
        try {
            setIsLoading(true);
            const userData = await login({
                username: user,
                password: pwd,
            }).unwrap();

            dispatch(
                setCredentials({
                    user,
                    userId: userData.userId,
                    accessToken: userData.accessToken,
                })
            );

            setUser('');
            setPwd('');

            location.state
                ? navigate(location.state.from.pathname)
                : navigate('home');
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    return accessToken ? (
        <Navigate to="/" />
    ) : (
        <Container className={styles.container} maxWidth="xs">
            <Card className={styles.card}>
                <Typography variant="h4" color="primary" align="center">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmitLogin}>
                    <TextField
                        variant="outlined"
                        size="small"
                        required
                        placeholder="Username"
                        fullWidth
                        autoFocus
                        onChange={e => setUser(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        size="small"
                        required
                        placeholder="Password"
                        type="password"
                        fullWidth
                        onChange={e => setPwd(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        disabled={isLoading ? true : false}
                    >
                        Sign in
                    </Button>
                </Box>
                <Typography>
                    Don't have an account? <a href="/register">Register</a>
                </Typography>
            </Card>
        </Container>
    );
};

export default LoginPage;
