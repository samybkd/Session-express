import React, { useState, useEffect } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";

import axios from "axios";

import styles from "../styles/profile.module.css";

interface IProfile {
	name: string;
	email: string;
	age: string;
	functionality: string;
}

interface Props {
	logged: boolean;
	setLogged: (arg0: boolean) => void;
}

const Profile: React.FC<Props> = ({ logged, setLogged }) => {
	const [userProfile, setUserProfile] = useState<IProfile | null>(null);
	const navigate = useNavigate();
	const handleLogout = () => {
		axios
			.post("http://localhost:4000/logout", null, { withCredentials: true })
			.then((response) => {
				console.log(response.data);
				setLogged(false);
				navigate("/");
			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		axios
			.get("http://localhost:4000/profile", { withCredentials: true })
			.then((response) => {
				console.log(response.data);
				setUserProfile(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	if (!logged) {
		return <Navigate to="/" />; //rediregier l utilisatuer vers home si il est pas authetifier
		//ce qui nous permet de proteger cette page
	}
	if (!userProfile) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.mainDiv}>
			<h1>Profile Details</h1>
			<div className={styles.container}>
				<div className={styles.fieldsDiv}>
					<div className={styles.info}>
						<h2>Name:</h2>{" "}
						<p className={styles.detailText}>{userProfile.name}</p>
					</div>
					<div className={styles.info}>
						<h2>Age:</h2>{" "}
						<p className={styles.detailText}>{userProfile.age}</p>
					</div>
				</div>
				<div className={styles.fieldsDiv}>
					<div className={styles.info}>
						<h2>Email:</h2>{" "}
						<p className={styles.detailText}>{userProfile.email}</p>
					</div>
					<div className={styles.info}>
						<h2>Functionality:</h2>{" "}
						<p className={styles.detailText}>
							{userProfile.functionality}
						</p>
					</div>
				</div>
			</div>
			<div className={styles.btnDiv}>
				<button className={styles.btn} onClick={handleLogout}>
					<p className={styles.detailText}>Logout</p>
				</button>
			</div>
		</div>
	);
};

export default Profile;
