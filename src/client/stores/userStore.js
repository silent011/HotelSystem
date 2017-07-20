import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'

import requester from '../requesters/requester'
import types from '../actions/userTypes'

class UserStore extends EventEmitter{
    constructor (props) {
        super(props)
        
        this.user = null

        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.logout = this.logout.bind(this)
    }

    login(user) {
        requester.post('/auth/login',user).then(response => {
             if(response.success){
                console.log('at userStore')
                this.user = response.user
                this.emit(types.USER_LOGGED_IN, response)
            } else {
                this.emit(types.USER_LOG_IN_FAIL, response)
            }
        })
    }
    
    register(user){
        requester.post('/auth/signup',user).then(response => {
            if(response.success){
                this.emit(types.USER_REGISTERED)
            } else {
                console.log(response)
                this.emit(types.USER_REGISTER_FAIL, response)
            }
        })
    }

    logout(){
        this.user = null
        localStorage.clear()
        this.emit(types.USER_LOGGED_OUT)
    }

    authenticate(token){
        this.emit(types.USER_AUTHENTICATED, localStorage.getItem('name'))
    }

    handleAction(action) {
        switch (action.type) {
            case types.USER_REGISTERING: {
                this.register(action.payload);
                break;
            }
            case types.USER_LOGGING_IN: {
                this.login(action.payload);
                break;
            }
            case types.USER_AUTHENTICATE: {
                this.authenticate(action.payload);
                break;
            }
            case types.USER_LOGGING_OUT:{
                this.logout()
                break;
            }
            default: break;
        }
    }
}

let userStore = new UserStore()
dispatcher.register(userStore.handleAction)

export default userStore