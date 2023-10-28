import { Component } from 'react'
import {Link,withRouter} from "react-router-dom"

import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './index.css'

class SignUp extends Component {
    state={
        signupName: '',
        signupEmail: '',
        signupPassword: '',
        message:"",
        passwordVisible:false,
    }

    onChangeSignUp = (event)=>{
        this.setState({signupName:event.target.value})
      }
  
      onChangeSignUpEmail = (event)=>{
        this.setState({signupEmail:event.target.value})
      }
  
      onChangeSignUpPassword = (event)=>{
        this.setState({signupPassword:event.target.value})
      }

      handleTogglePasswordVisibility=()=>{
        this.setState((prevState) => ({
          passwordVisible: !prevState.passwordVisible,
        }));
      }

      
  handleSignupSubmit = async (e) => {
    e.preventDefault();
    const { signupName, signupEmail, signupPassword } = this.state;
  
    try {
      // Make a POST request to the signup API with the user's information
      const response = await axios.post('http://localhost:6002/api/signup', {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
      });
  
      if (response.status === 200) {
        // Signup successful
        // Use a method to navigate to the '/login' route
        this.props.history.push('/login');
      } else {
        // Handle signup failure, e.g., show an error message
        console.log('Signup failed');
      }
    } catch (error) {
      // Handle any errors, e.g., network issues
      console.error('An error occurred:', error);
      if (error.response){
        this.setState({message:error.response.data.message})

      }
      
    }
  };
  
  // Method to navigate to the login route

    

    render(){
        const {signupName,signupEmail,signupPassword,message,passwordVisible} = this.state
        return(
          <div className="container">
        <div className='login-container'>
        <h3 className="text-center login-head">Signup</h3>
            <form onSubmit={this.handleSignupSubmit}>
              <label htmlFor='nameid' className='label'>Name</label>
              <br/>
              <input
                type="text"
                placeholder="Name"
                value={signupName}
                onChange={this.onChangeSignUp}
                required
                id="nameid"
                className='inputs'
              />
              <br/>
              <label className='label' htmlFor='emailid'>Email</label>
              <br/>
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={this.onChangeSignUpEmail}
                required
                id="emailid"
                className='inputs'
              />
              <br/>
              <label className='label' htmlFor='passwordid'>Password</label>
              <br/>
              <input
                type={passwordVisible?"text":"password"}
                placeholder="Password"
                value={signupPassword}
                onChange={this.onChangeSignUpPassword}
                required
                id="passwordid"
                className='inputs'
                />
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
              <button type="submit" className="login-button">Register</button>
              {message && <p className='paragraph'>{message}</p>}
              </div>
            </form>
            <Link to="/login"><button type="submit" className="login-button signup">Login</button></Link>

            </div>
      </div>
        )
    }
}
export default withRouter(SignUp)