import React, { Component } from 'react'
import Input from '../shared/Input'
import notifier from '../../utils/notifier'

import userStore from '../../stores/userStore'
import types from '../../actions/userTypes'
import userActions from '../../actions/userActions'


let fields = [
        {type:'text',name:'email',id:'email'},
        {type:'password',name:'password',id:'password'}
    ]

let validateLoginForm = (payload) => {
    const errors = {}
    let isFormValid = true

    if (payload.password.length < 4) {
        isFormValid = false
        errors.password = 'Password must have at least 4 characters.'
    }

    if (payload.email.length === 0 ) {
        isFormValid = false
        errors.username = 'Please provide your username.'
    }

    return {
        errors,
        isFormValid
    }
}

class LoginForm extends Component {
    constructor (props) {
        super(props)
        
        this.state = this.stateGen(fields)

        this.inputChange = this.inputChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.handleSuccess = this.handleSuccess.bind(this)
    }

    componentDidMount () {
        userStore.on(types.USER_LOGGED_IN,this.handleSuccess)
        userStore.on(types.USER_LOG_IN_FAIL, this.handleFail)      
    }
    
    componentWillUnmount () {
        userStore.removeListener(types.USER_LOGGED_IN, this.handleSuccess)
        userStore.removeListener(types.USER_LOG_IN_FAIL, this.handleFail)
    }
    

    stateGen(fields){
        let state = {}
        for(let field of fields){
            state[field.name] = ''
        }
        return state;
    }
    
    render () {
        let fieldsArr = []
        let counter = 0
        for(let field of fields){
            let input = <Input key={counter} {...field} inputChange={this.inputChange} 
                            value={this.state[field.name]} />
            fieldsArr.push(input) 
            counter++
        }
        return (
            <form onSubmit={this.onSubmit}>
                { fieldsArr }
                <input className="input-button" type="submit" value="Login" />
            </form>
        )
    }

     inputChange(e){
        let {name, value} = e.target

        this.setState({
            [name]: value
        })
    }

    onSubmit(e){
        e.preventDefault()
        let validation = validateLoginForm(this.state)
        if(!validation.isFormValid){
            notifier.notifyMany(validation.errors,'error')
            return
        }
        
        userActions.login(this.state)
    }

    handleSuccess(response){
        notifier.notify('Successfully Logged In!','success')
        localStorage.setItem('token', response.token)
        localStorage.setItem('name', response.user.name)
        this.props.history.push("/")
    }

    handleFail(response){
        if (response.errors)
            notifier.notifyMany(response.errors, 'error')
        else 
            notifier.notify(response.message, 'error')
    }
}

export default LoginForm