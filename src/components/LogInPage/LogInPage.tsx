import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useEffect, useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/logedIn/LogedInSlice";
import { RootState } from "../../app/store";
import { Input, Button, Card } from 'antd';
import { useMessageApi } from "../../utils/MessageContext";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    const messageApi = useMessageApi()

    const success = (succesMessage: string) => {
        messageApi.open({
            type: 'success',
            content: succesMessage
        });
    };

    const warning = (warningMessage: string) => {
        messageApi.open({
            type: 'warning',
            content: warningMessage,
        });
    };

    const errorMessage = (errorMessage: string) => {
        messageApi.open({
            type: 'error',
            content: errorMessage,
        });
    };

    useEffect(() => {
        if (isLoggedIn) {
            warning('You are already logged in');
            setTimeout(() => {
                console.log("YOU ARE ALREADY LOGGED IN")
                navigate("/");
            }, 0);
        }
    }, []);


    const handleLogIn = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const email = `${username.toLowerCase()}`;
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            dispatch(login({ email: userCredential.user.email }));
            success('You have loged in succesfully')
            navigate("/", { state: { username: username, email: email } });
        } catch (error) {
            errorMessage("Failed to log in. Please check your credentials.")
            console.error("Error logging in:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* {contextHolder} */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: '#858585'
            }}>
                <Card style={{ width: 500 }}>
                    <h1 style={{ textAlign: 'center' }}>Login</h1>
                    <form onSubmit={handleLogIn}>
                        <div>
                            <h4>Email</h4>
                            <Input
                                type="text"
                                placeholder="Enter your email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoComplete="username"
                            />
                        </div>
                        <div>
                            <h4>Password</h4>
                            <Input.Password
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                        </div>
                        <br />
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                        >
                            Login
                        </Button>
                        <br />
                        <h4>Don't have an account?
                            <Button
                                type="link"
                                onClick={() => navigate("/register")}
                            >Register
                            </Button></h4>
                        <br />
                    </form>
                </Card>
            </div>
        </>
    );
}

export default LoginPage;