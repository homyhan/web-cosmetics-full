import React, { useState } from "react";
import '../../components/style.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "./thunk";
import Swal from 'sweetalert2'
   

const Login = () => {

    const [formData, setFormData] = useState({
        fullName:'',
        email:'',
        address:'',
        phone:'',
        password:'',
        status:1,
        role:{
            role:0,
            nameRole: "Customer"
        }
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
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
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
    const handleSignUp = async()=>{        
        const res = await dispatch(register(formData));        
        Swal.fire({
            position: "center",
            icon: res?.status === 200 ? "success" : "error",
            title: res.data,
            showConfirmButton: false,
            timer: 1500
        });
    }
    
    
    
    return (
        <div className="formLogin">
            <div className="container right-panel-active">
                <div className="container__form container--signup">
                    <form action="#" className="form" id="form1" onSubmit={preventDefault}>
                        <h2 className="form__title">Sign Up</h2>
                        <input type="text" onChange={(e)=>{handleChange(e)}} placeholder="Fullname" className="input" name="fullName" />
                        <input type="email" onChange={(e)=>{handleChange(e)}} placeholder="Email" className="input" name="email"/>
                        <input type="text" onChange={(e)=>{handleChange(e)}} placeholder="Address" className="input" name="address"/>
                        <input type="text" onChange={(e)=>{handleChange(e)}} placeholder="Phone" className="input" name="phone"/>
                        <input type="password" onChange={(e)=>{handleChange(e)}} placeholder="Password" className="input" name="password"/>
                        <button className="btn" onClick={()=>{handleSignUp()}}>Sign Up</button>
                        
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
