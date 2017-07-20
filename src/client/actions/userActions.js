import dispatcher from '../dispatcher'
import types from './userTypes'

const userActions = {
    register: (user) => {
        dispatcher.dispatch({
            type:types.USER_REGISTERING,
            payload: user
        })
    },
    login:(user) => {
        dispatcher.dispatch({
            type:types.USER_LOGGING_IN,
            payload: user
        })
    },
    authenticate: (token) => {
        dispatcher.dispatch({
            type:types.USER_AUTHENTICATE,
            payload: token
        })
    },
    logout: () => {
        dispatcher.dispatch({
            type:types.USER_LOGGING_OUT
        })
    }
}

export default userActions