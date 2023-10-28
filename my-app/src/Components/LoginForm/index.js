import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios'

import './index.css';

class LoginForm extends Component {
    state = {
      loginEmail: '',
      loginPassword: '',
      message:'',
      passwordVisible:false,
    };


    onChangeEmail = (event)=>{
      this.setState({loginEmail:event.target.value})
    }

    onChangePassword = (event)=>{
      this.setState({loginPassword:event.target.value})
    }

    

  handleTogglePasswordVisibility=()=>{
    this.setState((prevState) => ({
      passwordVisible: !prevState.passwordVisible,
    }));
  }



 
  handleLoginSubmit = async  (e) => {
    e.preventDefault();
    // Handle login form submission here 
    const { loginEmail, loginPassword } = this.state;

    try {
      const response = await axios.post('http://localhost:6002/api/login', {
        email: loginEmail,
        password: loginPassword,
      });
  
      if (response.status === 200) {
        // Login successful
        // Use a method to navigate to the '/' route
        const data= response.data
        const token = data.token
        this.navigateToHome(token);
        
      } else {
        // login faild 

      }
    } catch (error) {
      // Handle any errors, e.g., network issues 
console.log("error",error)
      if(error.response){
        this.setState({message:error.response.data.message})
      }
      
    }
  };
  
  // This method should be defined to navigate to the home route
  navigateToHome = (token) => {
    Cookies.set("jwtToken",token,{expires:30,path:'/'})
    this.props.history.replace('/');
  };
  

  render() {
    const {loginEmail,loginPassword,message,passwordVisible}=this.state
    return (
      <div className="container">
        <div className='login-container'>
        <h3 class="text-center login-head">Login</h3>
            <form onSubmit={this.handleLoginSubmit}>
              <label className='label' htmlFor='emailId'>Email</label><br/>
              <input className='inputs' type="email" value={loginEmail} onChange={this.onChangeEmail} placeholder='Email'/>
              <br/>
              <label className='label' htmlFor='passwordId'>Password</label><br/>
              <input className='inputs' type={passwordVisible?"text":"password"} value={loginPassword} onChange={this.onChangePassword} placeholder='Password'/>
              <span
                className="password-toggle-icon"
                onClick={this.handleTogglePasswordVisibility}
              >
                <FontAwesomeIcon className='icons'
                  icon={passwordVisible ? faEye : faEyeSlash}
                  />
                  </span>
    
              <br/>
              <div className='button-container'>
              <button type="submit" className="login-button">Login</button>
              </div>
            </form>
            {message && <p className='paragraph'>*{message}</p>}
            <Link to="/signup"><button type="submit" className="login-button signup">Register</button></Link>
          
        </div>
      </div>
    );
  }
}

export default LoginForm;
