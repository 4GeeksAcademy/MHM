import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate()

	const handleClick = async (e) => {
		e.preventDefault();
		await actions.login(email, password);
		if (store.token) {
			navigate('/mainpage');
		};
	}

	return (
		<div className="loginCont">
			<h1 className="title">Welcome to <u>Mental Health Mate</u>!</h1>
			<h2 className="subtitle">We are here to connect you to other people to help with mental health</h2>
			<h2 className="subtitle">If you would like to connect with other people, you can login, and if you don't have an account, you can make one below</h2>
			<form className="loginForm">
				<div className="loginFormContent">
					<h1>Login</h1>

					<div className="input-field">
						<input className="myInput" type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div className="input-field">
						<input className="myInput" type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
					</div>
				</div>
				<div className="loginFormAction">
					<button className="formBtn regBtn" onClick={(e) => handleClick(e)}>Login</button>
				</div>
				<a href="/signup">Click to sign up</a>
			</form>
		</div>
	);
}
