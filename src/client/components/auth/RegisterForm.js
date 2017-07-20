import React, { Component } from 'react'
import Input from '../shared/Input'
import validator from 'validator'
import notifier from '../../utils/notifier'

import userStore from '../../stores/userStore'
import types from '../../actions/userTypes'
import userActions from '../../actions/userActions'

let fields = [
        {type:'text',name:'name',id:'name'},
        {type:'password',name:'password',id:'password'},
        {type:'text',name:'email',id:'email'}
    ]

let validateRegistrationForm = (payload) => {
    const errors = {}
    let isFormValid = true

    if (typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false
        errors.email = 'Please provide your email address.'
    }

    if (!payload.password || payload.password.length < 4) {
        isFormValid = false
        errors.password = 'Please provide your password.'
    }

    if (!payload.name  || payload.name.length === 0) {
        isFormValid = false
        errors.name = 'Please provide your name.'
    }

    return {
        isFormValid,
        errors
    }
}

class RegisterForm extends Component {
    constructor (props) {
        super(props)
        
        this.state = this.stateGen(fields)

        this.inputChange = this.inputChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.handleSuccess = this.handleSuccess.bind(this)
    }

    componentDidMount () {
        userStore.on(types.USER_REGISTERED, this.handleSuccess)
        userStore.on(types.USER_REGISTER_FAIL, this.handleFail)  
    }
    
    componentWillUnmount () {
        userStore.removeListener(types.USER_REGISTERED, this.handleSuccess)
        userStore.removeListener(types.USER_REGISTER_FAIL, this.handleFail)       
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
                <input className="input-button" type="submit" value="Register" />
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
        let validation = validateRegistrationForm(this.state)
        if(!validation.isFormValid){
            notifier.notifyMany(validation.errors,'error')
            return
        }

        userActions.register(this.state)
    }

    handleSuccess(){
        notifier.notify('Successfully Registered!','success')
        this.props.history.push('/')
    }

    handleFail(response){
        if (response.errors)
            notifier.notifyMany(response.errors, 'error')
        else 
            notifier.notify(response.message, 'error')
    }
}

export default RegisterForm