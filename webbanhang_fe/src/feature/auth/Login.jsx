import React, { useState } from "react";
import '../../components/style.css';

const Login = () => {
    
    const signInBtn = () => {
        const container = document.querySelector(".container");
        container.classList.remove("right-panel-active");
    };
    
    const signUpBtn = () => {
        const container = document.querySelector(".container");
        container.classList.add("right-panel-active");
    };
    
    const preventDefault = (e) => {
        e.preventDefault();
    };
    
    
    
    return (
        <div className="formLogin">
            <div className="container right-panel-active">
                <div className="container__form container--signup">
                    <form action="#" className="form" id="form1" onSubmit={preventDefault}>
                        <h2 className="form__title">Sign Up</h2>
                        <input type="text"  placeholder="Fullname" className="input" name="fullName" />
                        <input type="email"  placeholder="Email" className="input" name="email"/>
                        <input type="text" placeholder="Address" className="input" name="address"/>
                        <input type="text" placeholder="Phone" className="input" name="phone"/>
                        <input type="password"  placeholder="Password" className="input" name="password"/>
                        <button className="btn">Sign Up</button>
                    </form>
                </div>
                <div className="container__form container--signin">
                    <form action="#" className="form" id="form2" onSubmit={preventDefault}>
                        <h2 className="form__title">Sign In</h2>
                        <input type="email" placeholder="Email" className="input" />
                        <input type="password" placeholder="Password" className="input" />
                        <a href="#" className="link">
                            Forgot your password?
                        </a>
                        <button className="btn">Sign In</button>
                    </form>
                </div>
                {/* Overlay */}
                <div className="container__overlay">
                    <div className="overlay">
                        <div className="overlay__panel overlay--left">
                            <button className="btn" id="signIn" onClick={signInBtn}>
                                Sign In
                            </button>
                        </div>
                        <div className="overlay__panel overlay--right">
                            <button className="btn" id="signUp" onClick={signUpBtn}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;