import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import userStore from '../../stores/userStore'
import types from '../../actions/userTypes'

let isAuthenticated = false

let changeAuth = () => {
    isAuthenticated = !isAuthenticated
}

userStore.on(types.USER_AUTHENTICATED, changeAuth)
userStore.on(types.USER_LOGGED_IN, changeAuth)
userStore.on(types.USER_LOGGED_OUT, changeAuth)

const PrivateRoute = ({component:Component, ...rest}) => {
   return <Route {...rest} render={props => {
        return isAuthenticated ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname:'/user/login', state:{from: props.location}}} />
        )
    }} />
}

export default PrivateRoute