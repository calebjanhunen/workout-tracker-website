import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './PersistLogin.module.css';

import { Box, CircularProgress, Container } from '@material-ui/core';
import { Outlet } from 'react-router-dom';
import { useLazyRefreshAccessTokenQuery } from 'redux/features/authApiSlice';
import { setCredentials } from 'redux/reducer/authSlice';

const PersistLogin = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.auth.accessToken);
    const [refreshAccessToken] = useLazyRefreshAccessTokenQuery();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function verifyRefreshToken() {
            try {
                const data = await refreshAccessToken();

                if (data?.data?.accessToken && data?.error?.status !== 401) {
                    dispatch(
                        setCredentials({
                            user: data.data.username,
                            userId: data.data.userId,
                            accessToken: data.data.accessToken,
                        })
                    );
                }
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }

        accessToken ? setIsLoading(false) : verifyRefreshToken();
    }, [refreshAccessToken, accessToken, dispatch]);

    return isLoading ? (
        <Container fixed className={styles.loadingContainer}>
            <Box component="div" className={styles.loadingDiv}>
                <CircularProgress />
            </Box>
        </Container>
    ) : (
        <Outlet />
    );
};

export default PersistLogin;
