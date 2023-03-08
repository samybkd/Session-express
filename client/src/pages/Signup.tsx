import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css";
function Signup() {
	const history = useNavigate();

	const [error, setError] = React.useState("");

	const [email, setEmail] = React.useState("");
	const [name, setName] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [age, setAge] = React.useState("");
	const [functionality, setFunctionality] = React.useState("client");

	const redirectLogin = () => {
		history("/login");
	};
	const handleSubmit = (e: any) => {
		e.preventDefault();
		axios
			.post(
				"http://localhost:4000/signup",
				{ email, password, age, functionality, name },
				{ withCredentials: true }
			)
			.then((response) => {
				console.log(response.data);
				//setLogged(true);
				history("/profile");
			})
			.catch((error) => {
				console.log(error.response.data);
				setError(error.response.data);
			});
	};

	return (
		<div className={styles.loginDiv}>
			<form
				style={{ gap: "20px" }}
				className={styles.formDiv}
				onSubmit={handleSubmit}>
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
				<div className={styles.inputDiv}>
					<label>Age:</label>
					<input
						className={styles.input}
						type="number"
						value={age}
						onChange={(event) => setAge(event.target.value)}
					/>
				</div>
				<div className={styles.inputDiv}>
					<label>Name:</label>
					<input
						className={styles.input}
						type="text"
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
				</div>
				<div className={styles.inputDiv}>
					<label>Functionality:</label>
					<select
						id="user-type"
						className={styles.input}
						value={functionality}
						onChange={(event) => setFunctionality(event.target.value)}>
						<option value="employee">Employee</option>
						<option value="client">Client</option>
					</select>
				</div>
				<button className={styles.button} type="submit">
					Sign up
				</button>
				<div className={styles.inputDiv}>
					<label>already have an account ?</label>
					<button onClick={redirectLogin}>Login</button>
				</div>
			</form>
		</div>
	);
}

export default Signup;
