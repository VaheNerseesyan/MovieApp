import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         alert("You are already logged in");
    //         navigate("/");
    //     }
    //     console.log(isLoggedIn)
    // }, [isLoggedIn]);

    const handleRegister = async () => {
        try {
            const email = `${username.toLowerCase()}@gmail.com`;
            await createUserWithEmailAndPassword(auth, email, password);
            alert("User registered successfully");
            navigate("/login");
        } catch (error) {
            alert("Email already in use");
            console.error("Error registering:", error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" onClick={handleRegister}>Register</button>
                <div>
                    <NavLink to="/">Already have an account? Log in</NavLink>
                </div>
        </div>
    );
};

export default RegisterPage;