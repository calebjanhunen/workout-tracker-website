import {
    Card,
    Container,
    TextField,
    Typography,
    Box,
    Button,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

import { useRegisterMutation } from "redux/features/authApiSlice";
import { setCredentials } from "redux/reducer/authSlice";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [matchPwd, setMatchPwd] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [register] = useRegisterMutation();
    const accessToken = useSelector(state => state.auth.accessToken);

    async function handleRegister(e) {
        e.preventDefault();

        if (pwd !== matchPwd) return console.log("Passwords do not match");

        try {
            const data = await register({
                username: user,
                password: pwd,
            }).unwrap();
            console.log(data);
            dispatch(setCredentials({ user, accessToken: user.accessToken }));

            setUser("");
            setPwd("");
            setMatchPwd("");

            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

    return accessToken ? (
        <Navigate to="/" />
    ) : (
        <Container maxWidth="xs">
            <Card>
                <Typography variant="h4" color="primary" align="center">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleRegister}>
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
                        fullWidth
                        onChange={e => setPwd(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        size="small"
                        required
                        type="password"
                        placeholder="Confirm Password"
                        fullWidth
                        onChange={e => setMatchPwd(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        disabled={isLoading ? true : false}
                    >
                        Register
                    </Button>
                </Box>
                <Typography>
                    Already have an account? <a href="/login">Sign in</a>
                </Typography>
            </Card>
        </Container>
    );
};

export default Register;
