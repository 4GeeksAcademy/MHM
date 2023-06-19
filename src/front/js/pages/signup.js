import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { Context } from "../store/appContext";

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const token = sessionStorage.getItem; ("token");
    console.log(token);
    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.target)
        actions.createUser(email, password)
    }

    return (
        <div className="loginCont">
            <form className="loginForm">
                <div className="loginFormContent">
                    <h1>Sign Up for account </h1>
                    <div className="input-field">
                        <input className="myInput" type={"text"} placeholder={'Email'} value={email} onChange={(e) => setemail(e.target.value)} />
                    </div>
                    <div className="input-field">
                        <input className="myInput" type={'password'} placeholder={'Password'} value={password} onChange={(e) => setpassword(e.target.value)} />
                    </div>

                </div>
                <div className="loginFormAction">
                    <button className="formBtn regBtn" onClick={(e) => handleClick(e)}>Register</button>
                </div>
            </form>
        </div>
    );
}
