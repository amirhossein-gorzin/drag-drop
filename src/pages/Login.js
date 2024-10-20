import React, {useState} from 'react';
import data from "../data"
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate()
    const[name,setName] = useState("")
    const[password,setPassword] = useState("")

    function login(){
        let user = data.users.find(user=> user.name===name && user.password===password)
        if (user){
            alert("logged in successfully")
            localStorage.setItem("user",JSON.stringify(user.id))
            navigate("/")
            setName("")
            setPassword("")
        }else{
            alert("user doesnt found !!")
            setName("")
            setPassword("")
        }
    }

    return (
        <div style={{display:"flex",flexDirection:"column",width:300}}>
            <input type="text" placeholder={"name"} value={name} onChange={event => setName(event.target.value)}/>
            <input type="password" placeholder={"password"} value={password} onChange={event => setPassword(event.target.value)}/>
            <button style={{marginTop:10}} onClick={login}>login</button>
        </div>
    );
}

export default Login;