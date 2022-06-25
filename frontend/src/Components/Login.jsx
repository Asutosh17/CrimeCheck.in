import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import validator from 'validator'




export const Login = () => {
 
  const navigate =useNavigate()
  const [user,setUser] = useState({
      username:"",
      password:"",
  })
//const [name,SetName]=useState("")
  const [errorMessage, setErrorMessage] = useState('')
 
  const validate = (value,id) => {
 
    if (validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      // handleChange()
      setUser({...user,
        [id]:value})
      setErrorMessage('Strong Password')
    } else {
      setErrorMessage('Is Not Strong Password')
    }
  }




  const handleChange =e=>{
  
      const{id,value} =e.target

      setUser({
          ...user,
          [id]:value,
  
      })
  }

  const register  = (e)=>{
    e.preventDefault()
    
      axios.post("https://crimecheck-noticeboard.herokuapp.com/login",{
        username:user.username,
        password : user.password
      }).then(res=>{
        alert(res.data.message)
        let msg = res.data.message;
        if(msg == "Login Successfull"){
            navigate("/board")
        }
       else if(msg == "User not registered"){
            navigate("/register")
        }
        else{
            navigate("/")
        }
         //navname(res.data.user)
    //    return;
 
 })
//  .catch((err)=>{
//    alert("pls try diffrent mail or username")
//    console.log(err)
//  })
//     }
//     else{
//       alert("password not macth")
  
//     }
     
  }
 
  
  return (
    <div>
  
    <div className='signup' >
       <h2>Login</h2>
       <form onSubmit={register}>
    
       <label >User Name</label><br />
    <input type="text" required id="username" value={user.username} placeholder="Enter user name" onChange={handleChange} /><br />
    
    <label >password</label><br />
    <input type="text" required id="password" maxLength={8} placeholder="Enter password" onChange={(e) => validate(e.target.value,e.target.id)} /><br />

    {errorMessage === '' ? null :
        <span style={{
          color: 'red',
        }}>{errorMessage}</span>}
        <br />
    
    <input type="submit"  /><br />

    <label className="label" htmlFor="">Don't have an account?</label>
        <Link to="/register">Register</Link>

            </form>
    </div></div>
  )
}
