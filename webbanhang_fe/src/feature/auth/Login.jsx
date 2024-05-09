import React, { useState } from "react";
import '../../components/style.css';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPass, generatePass, getUserByEmail, register, updatePass } from "./thunk";
import Swal from 'sweetalert2'
import { validation } from "../../services/validation";
   

const Login = () => {
    const [state, setState] = useState(true);
    const [emailChangePass, setEmailChangePass]= useState('');
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
    });
    const [errors, setErrors] = useState({
        fullName:'',
        email:'',
        address:'',
        phone:'',
        password:'',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const signInBtn = () => {
        const container = document.querySelector(".container");
        container.classList.remove("right-panel-active");
        setState(true);
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
        

        // const validationErrors = validation(formData); // Perform input validation
        // if (Object.keys(validationErrors).length > 0) {
        //     // There are validation errors, update state to show errors
        //     setErrors(validationErrors);
        // } else {
        //     // No validation errors, proceed with signup
        //     const res = await dispatch(register(formData));
        //     Swal.fire({
        //         position: "center",
        //         icon: res?.status === 200 ? "success" : "error",
        //         title: res.data,
        //         showConfirmButton: false,
        //         timer: 1500
        //     });
        // }
        const formErrors = validation(formData); // Perform input validation for all fields
        setErrors(formErrors); // Update error state for all fields

        if (Object.keys(formErrors).length === 0) {
            // No validation errors, proceed with signup
            const res = await dispatch(register(formData));
            Swal.fire({
                position: "center",
                icon: res?.status === 200 ? "success" : "error",
                title: res.data,
                showConfirmButton: false,
                timer: 1500
            });
        }
       
    }
    function isObjectEmpty(obj) {
        return Object.entries(obj).length === 0;
      }

    // const handleValidation = (data)=>{
    //     setErr(validation(data));
    // }

    const handleBlur = (e) => {
        const { name } = e.target;
        const fieldErrors = validation({ [name]: formData[name] }); // Perform validation for the specific field
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: fieldErrors[name] || '' // Update error state for the specific field
        }));
    };

    const handleChangeState = ()=>{
        setState(!state);
    }
    
    const handleChangePass = async ()=>{
        
        const resNewPass = await dispatch(generatePass);
        const resUser = await dispatch(getUserByEmail(emailChangePass));
        const dataRes = {
            "email": emailChangePass,
            "newPass": resNewPass?.data
        }

        const newPass = {
            "password": resNewPass?.data
        }
        await dispatch(updatePass(resUser?.data?.id, newPass))
        
        const res = await dispatch(forgotPass(dataRes));
        await Swal.fire({
            position: "center",
            icon:  res?.status==200?"success":"error",
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
                        <input type="text" onBlur={handleBlur} onChange={(e)=>{handleChange(e)}} placeholder="Fullname" className="input" name="fullName" />
                        {errors.fullName&& <span style={{color:'red', fontSize:'13px'}}>{errors.fullName}</span> }
                        <input type="email" onBlur={handleBlur} onChange={(e)=>{handleChange(e)}} placeholder="Email" className="input" name="email"/>
                        {errors.email&& <span style={{color:'red', fontSize:'13px'}}>{errors.email}</span> }
                        <input type="text" onBlur={handleBlur} onChange={(e)=>{handleChange(e)}} placeholder="Address" className="input" name="address"/>
                        {errors.address&& <span style={{color:'red', fontSize:'13px'}}>{errors.address}</span> }
                        <input type="text" onBlur={handleBlur} onChange={(e)=>{handleChange(e)}} placeholder="Phone" className="input" name="phone"/>
                        {errors.phone&& <span style={{color:'red', fontSize:'13px'}}>{errors.phone}</span> }
                        <input type="password" onBlur={handleBlur} onChange={(e)=>{handleChange(e)}} placeholder="Password" className="input" name="password"/>
                        {errors.password&& <span style={{color:'red', fontSize:'13px'}}>{errors.password}</span> }
                        <button className="btn" onClick={()=>{handleSignUp()}}>Sign Up</button>
                        
                    </form>
                </div>
                <div className="container__form container--signin">
                    {state?<form action="#" className="form" id="form2" onSubmit={preventDefault}>
                        <h2 className="form__title">Sign In</h2>
                        <input type="email" placeholder="Email" className="input" />
                        <input type="password" placeholder="Password" className="input" />
                        <a style={{cursor:'pointer'}} onClick={()=>{handleChangeState()}} className="link">
                            Forgot your password?
                        </a>
                        <button className="btn">Sign In</button>
                    </form>: <form action="#" className="form" id="form2" onSubmit={preventDefault}>
                        <h2 className="form__title">Forgot password</h2>
                        <input type="email" onChange={(e)=>{setEmailChangePass(e.target.value)}} placeholder="Email" className="input" name="email" />
                        
                        <a style={{cursor:'pointer'}} onClick={()=>{handleChangeState()}} className="link">
                            Signin
                        </a>
                        <button className="btn" onClick={()=>{handleChangePass()}}>Submit</button>
                    </form>}                    
                    
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
