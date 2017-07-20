import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../../styles/navbar.css'

import userStore from '../../stores/userStore'
import types from '../../actions/userTypes'
import userActions from '../../actions/userActions'

let links = [
  {path:'/',name:'Home'},
  {path:'/hotels/create',name:'Make a hotel', private:true},
  {path:'/hotels/all',name:'All Hotels'},
  {path:'/reviews/all',name:'All Reviews'}
]

class MainNavigation extends Component {
    render () {
        let links = null
        let brand = null
        if(this.props.links){
            let counter = 0;
            links = this.props.links.concat().map(link => {
                if(link.private && !this.props.isLoggedIn){
                    return null
                }
                counter++
                return ( 
                <li key={counter} className={this.props.liClass}>
                    <Link className={this.props.linkClass} to={link.path}>{link.name}</Link>
                </li>)
            })
        }
        if(this.props.brand){
            brand = <Link to="/" className="navbar-brand">{this.props.brand}</Link>
        }
        return (
            <div className={this.props.leftDiv}>
                { brand }
                <ul className={this.props.ulClass}>
                    { links }
                </ul>
            </div>
        )
    }
}

class UserNavigation extends Component {
    render () {
        let userMenu = null
        if(this.props.isLoggedIn){
             userMenu = (
                <div className={this.props.userMenuClass}>
                    <a 
                     className="user-menu-hi">Hi, {this.props.user.name}</a>
                    <a onClick={this.logout}
                     className={this.props.linkClass}>Logout</a>
                </div>)
        } else {
            userMenu = (
                <div className={this.props.userMenuClass}>
                    <Link className={this.props.linkClass} to="/user/login" >Login</Link>
                    <Link className={this.props.linkClass} to="/user/register">Register</Link>
                </div>
            )
        }
        return userMenu
            
    }


    logout(){
        userActions.logout()
    }
}

class Navbar extends Component {

     constructor (props) {
        super(props)

        this.state={
            isLoggedIn:false,
            user:null
        }
        
        this.handleLoggedIn = this.handleLoggedIn.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)
        this.handleAuthenticated = this.handleAuthenticated.bind(this)

        userStore.on(types.USER_LOGGED_IN, this.handleLoggedIn)
        userStore.on(types.USER_LOGGED_OUT, this.handleLogOut)
        userStore.on(types.USER_AUTHENTICATED, this.handleAuthenticated)
        
    }

    componentDidMount () {
        if(localStorage.getItem('token')){
            userActions.authenticate(localStorage.getItem('token'))
        }
    }
    
    componentWillUnmount () {
        userStore.removeListener(types.USER_LOGGED_IN, this.handleLoggedIn)
        userStore.removeListener(types.USER_LOGGED_OUT, this.handleLogOut)
        userStore.removeListener(types.USER_AUTHENTICATED, this.handleAuthenticated)
    }


    render () {
        return (
            <nav className='main-nav'>
                <MainNavigation 
                    links = { links }
                    brand = {'Hotels'}
                    ulClass={'main-nav-ul'} 
                    linkClass={'nav-link'}
                    liClass={'list-item'}
                    leftDiv={'left-navbar'}
                    isLoggedIn={ this.state.isLoggedIn }/>
                <UserNavigation
                    userMenuClass={'right-navbar'}
                    linkClass={'nav-link'}
                    isLoggedIn={ this.state.isLoggedIn }
                    user={ this.state.user }
                 />
            </nav>
        )
    }

    handleLoggedIn(response){
        this.setState({
            isLoggedIn: true,
            user: response.user
        })
    }

    handleLogOut(){
        this.setState({
            isLoggedIn: false,
            user: null
        })
    }

    handleAuthenticated(name){
        this.setState({
            isLoggedIn: true,
            user: {
                name
            }
        })
    }
}

export default Navbar