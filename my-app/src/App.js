import { Component } from 'react'
import { BrowserRouter, Switch, Route} from "react-router-dom";
import LoginForm from './Components/LoginForm'
import SignUp from './Components/SignUp'
import Header from './Components/Header';
import Home from './Components/Home'
import About from './Components/About'

class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={LoginForm}/>
          <Route  path='/signup' component={SignUp}/>
          <Route path='/' component={Header}/>
          <Route path='/home' component={Home}/>
          <Route  path='/about' component={About}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App