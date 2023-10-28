import {Link,withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header =(props)=>{
    const logOut = ()=>{
        Cookies.remove("jwtToken")
        const {history}=props
        history.replace('/login')
    }
        return(
            <div className='header-container'>
                <div>
                    <h1>Blog</h1>
                </div>
                <div>
                    <ul className='list-container'>
                        <Link className='link' to='/home'><li className='list-items'>Home</li></Link> 
                        <Link className='link' to="/about"><li className='list-items'>About</li></Link>
                    </ul>
                </div>
                <div>
                    <button className='loginButton' type="button" onClick={logOut}>LogOut</button>
                </div>
            </div>
        )
}
export default withRouter(Header)