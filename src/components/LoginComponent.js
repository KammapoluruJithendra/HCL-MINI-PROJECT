import { BrowserRouter, Link, Route, Router, Routes ,useNavigate} from 'react-router-dom';
import NewRegisterAccount from './NewRegisterComponent';
import Forgetpassword from './ForgetPasswordComponent';
import './LoginComponent.css'
import { useState,useEffect} from "react";
import ShoppingApp from './ShoppingComponent';
import CartItems from './CartComponent';

export default function Login(){
    const [User,setUser]=useState({Email:"",Password:""});
    const [userdetails,setUserDetails]=useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        fetch("http://127.0.0.1:2000/getusers")
        .then(response=>response.json())
        .then(data=>{
            setUserDetails(data);
        })
    },[])
    function VerfiyEmail(e){
        setUser({
            Email:e.target.value,
            Password:User.Password
    })

    }
    function VerfiyPassword(e){
        setUser({
            Email:User.Email,
            Password:e.target.value
    })
    }
    function Verify(){
        for (const items of userdetails){
                    if(items.UserName === User.Email && items.Password === User.Password){
                        navigate('/Shopping');
                        break;
                    }
                    else{
                        navigate('/Shopping/Cart');
                    }
                }
            }
    return(
      <div className='container2'>  
        <div className="container3">       
                    <input placeholder="ENTER E-MAIL" type="e-mail" className="input-email" onChange={VerfiyEmail} required></input><br></br>
                    <input placeholder="ENTER-PASSWORD" type="password" className="password" onChange={VerfiyPassword} required></input><br></br>
                    <button className='button12' onClick={Verify}>Sign-In</button>
                    {console.log(User)}
                    <br></br>
                    <div className='container1'>

                        <Link to="/newregister"><a className='newregister'>New Register?</a></Link> 
                        <Link to="/forgetpassword"><a className='forgetpassword'>Forget Password?</a></Link>
                    
                    </div>
        </div>   
    </div>
    )
}