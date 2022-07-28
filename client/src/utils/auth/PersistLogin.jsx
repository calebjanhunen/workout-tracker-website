import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCredentials } from "redux/reducer/authSlice";
import { useLazyRefreshAccessTokenQuery } from "redux/features/authApiSlice";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.auth.accessToken);
    const [refreshAccessToken] = useLazyRefreshAccessTokenQuery();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function verifyRefreshToken() {
            try {
                const data = await refreshAccessToken();
                if (data?.data?.accessToken) {
                    dispatch(
                        setCredentials({
                            user: data.data.username,
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

    return isLoading ? <p>Loading...</p> : <Outlet />;
};

export default PersistLogin;
