import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from './components/AppNavigation/Navbar'
import Footer from './components/shared/Footer'

import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'

import HomePage from './components/home/HomePage'

import PrivateRoute from './components/shared/PrivateRoute'

import HotelForm from './components/hotels/HotelForm'
import HotelsAll from './components/hotels/HotelsAll'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar />
        <main>
          <Switch>
            <Route exact path = "/" component= { HomePage } />
            
            <Route path='/user/login' component= { LoginForm } />
            <Route path='/user/register' component= { RegisterForm } />

            <PrivateRoute path='/hotels/create' component= { HotelForm } />
            <Route path= '/hotels/all' component = { HotelsAll } />
          </Switch>
        </main>
        <Footer />
      </div>
    ) 
  }
}

export default App
