import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import styles from "../styles/login.module.css";

interface Props {
	logged: boolean;
	setLogged: (arg0: boolean) => void;
}
const Login: React.FC<Props> = ({ logged, setLogged }) => {
	const [email, setEmail] = React.useState("");
	const history = useNavigate();
	const [password, setPassword] = React.useState("");
	const [error, setError] = React.useState("");

	const redirectSignup = () => {
		history("/signup");
	};
	const handleSubmit = (e: any) => {
		e.preventDefault();
		axios
			.post(
				"http://localhost:4000/login",
				{ email, password },
				{ withCredentials: true }
			)
			.then((response) => {
				console.log(response.data);
				setLogged(true);
				history("/profile"); //deriger l utilisateur a profile si login est bon
			})
			.catch((error) => {
				console.log(error.response.data.message);

				//sauvegarder le message d erruer pour l afficher
				setError(error.response.data.message);
			});
	};

	return (
		<div className={styles.loginDiv}>
			<form className={styles.formDiv} onSubmit={handleSubmit}>
				{/*error message si existe*/}
				{error && (
					<div className={styles.errorMessage}>
						<p className={styles.error}>{error}</p>
					</div>
				)}
				<div className={styles.inputDiv}>
					<label>Email:</label>
					<input
						className={styles.input}
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</div>
				<div className={styles.inputDiv}>
					<label>Password:</label>
					<input
						className={styles.input}
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>
				<button className={styles.button} type="submit">
					Login
				</button>
				<button onClick={redirectSignup} type="button">
					sign up
				</button>
			</form>
		</div>
	);
};

export default Login;
