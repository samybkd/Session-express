import { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import axios from "axios";
import Signup from "./pages/Signup";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	//on envoie cette requete pour verifier apres que l utilisatuer quitte la fenetre ou rafraichie
	// si il etteit deja authentifier
	useEffect(() => {
		axios
			.get("http://localhost:4000/loginCheck", { withCredentials: true })
			.then((response) => {
				const data = response.data;
				if (data.loggedIn) {
					setIsLoggedIn(true);
				} else {
					setIsLoggedIn(false);
				}
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<div>
			<Router>
				<Routes>
					{/*rediriger l utilisatuer a login si il va vaire home */}
					<Route path="/" element={<Navigate to="/login" replace />} />
					<Route
						path="/login"
						element={
							<Login logged={isLoggedIn} setLogged={setIsLoggedIn} />
						}
					/>
					<Route path="/signup" element={<Signup />} />
					<Route
						path="/profile"
						element={
							<Profile logged={isLoggedIn} setLogged={setIsLoggedIn} />
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
