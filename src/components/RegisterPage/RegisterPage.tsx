import { auth } from "../../firebase";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const email = `${username.toLowerCase()}@gmail.com`;
            await createUserWithEmailAndPassword(auth, email, password);
            alert("User registered successfully");
            navigate("/");
        } catch (error) {
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