import { auth } from "../../firebase";
import { FormEvent, useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Button, Input, Typography } from "antd";
import { Card } from "antd";
function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isLoggedIn) {
            alert("You are already logged in");
            navigate("/");
        }
    }, []);

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("User registered successfully");
            navigate("/login");
        } catch (error) {
            alert("Email or username already in use");
            console.error("Error registering:", error);
        }
    };

    return (

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: '#858585'
        }}>
            <Card style={{ width: 500 }}>
                <h1 style={{ textAlign: 'center' }}>Register</h1>
                <form>
                    <div>
                        <h4>Email</h4>
                        <Input
                            type="text"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        <Typography.Text type="secondary" style={{ fontSize: 10}}>
                                <p>Password must be at least 6 characters long</p>
                                <p>Password must contain at least one uppercase letter</p>
                                <p>Password must contain at least one lowercase letter</p>
                                <p>Password must contain at least one number</p>
                                <p>Password must contain at least one special character</p>
                        </Typography.Text>
                    </div>
                    <br />
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={handleRegister}
                        block
                    >
                        Register
                    </Button>
                    <br />
                    <h4>Already have an account?
                        <Button
                            type="link"
                            onClick={() => navigate("/login")}
                        >Login
                        </Button></h4>
                    <br />
                </form>
            </Card>
        </div>
    );
};

export default RegisterPage;