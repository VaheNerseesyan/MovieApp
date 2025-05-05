import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";
import { login } from "../../features/logedIn/LogedInSlice";
import { useDispatch } from "react-redux";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogIn = async () => {
        try {
            const email = `${username.toLowerCase()}@gmail.com`;
            await signInWithEmailAndPassword(auth, email, password);
            alert("User logged in successfully");
            dispatch(login());
            navigate("/home");
        } catch (error) {
            console.error("Error registering:", error);
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" onClick={handleLogIn}>Login</button>
            <h5>Sign up<NavLink to="/registerPage">Register</NavLink></h5>
        </div>
    )
}

export default LoginPage;