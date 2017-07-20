import React, { Component } from 'react'

import notifier from '../../utils/notifier'
import Input from '../shared/Input'

import types from '../../actions/hotel/hotelTypes'
import hotelActions from '../../actions/hotel/hotelActions'
import hotelStore from '../../stores/hotelStore'

let fields = [
    {type:'text',name:'name',id:'name'},
    {type:'text',name:'location',id:'loaction'},
    {type:'text',name:'description',id:'description'},
    {type:'number',name:'numberOfRooms',id:'numberOfRooms'},
    {type:'text',name:'image',id:'image'},
    {type:'number',name:'parkingSlots',id:'parkingSlots'}
]

let ValidateHotelForm = (payload) => {
  const errors = {}
  let isFormValid = true

  payload.numberOfRooms = parseInt(payload.numberOfRooms)

  if (payload.parkingSlots) {
    payload.parkingSlots = parseInt(payload.parkingSlots)
  }

  if (!payload || payload.name.length < 3) {
    isFormValid = false
    errors.name = 'Name must be more than 3 symbols.'
  }

  if (!payload || payload.image.length === 0) {
    isFormValid = false
    errors.image = 'Image URL is required.'
  }

  if (!payload || payload.description.length < 10) {
    isFormValid = false
    errors.description = 'Description must be more than 10 symbols.'
  }

  if (!payload || !payload.numberOfRooms || payload.numberOfRooms < 0) {
    isFormValid = false
    errors.numberOfRooms = 'Number of rooms must be a positive number.'
  }

  if (payload.parkingSlots) {
    if (payload.parkingSlots < 0) {
      isFormValid = false
      errors.parkingSlots = 'Parking slots must be a positive number.'
    }
  }

  return {
    success: isFormValid,
    errors
  }
}

class HotelForm extends Component {
    constructor (props) {
        super(props)
        
        this.state ={
            hotel:HotelForm.stateGen(fields)
        } 

        this.inputChange = this.inputChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleSuccess = this.handleSuccess.bind(this)
    }

    componentDidMount () {
      hotelStore.on(types.CREATED_HOTEL, this.handleSuccess)
      hotelStore.on(types.CREATED_HOTEL_FAIL, this.handleFail)
    }
    
    componentWillUnmount () {
      hotelStore.removeListener(types.CREATED_HOTEL, this.handleSuccess)
      hotelStore.removeListener(types.CREATED_HOTEL_FAIL, this.handleFail)
    }
    

    static stateGen(fields){
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
                            value={this.state.hotel[field.name]} />
            fieldsArr.push(input) 
            counter++
        }
        return (
            <form onSubmit={this.onSubmit}>
                { fieldsArr }
                <input className="input-button" type="submit" value="Create a hotel entry" />
            </form>
        )
    }

     inputChange(e){
        let {name, value} = e.target
        this.setState(prevState => {
             prevState['hotel'][name] = value
             return prevState
        })
    }

    onSubmit(e){
        e.preventDefault()
        console.log(this.state.hotel)
        let validation = ValidateHotelForm(this.state.hotel)
        if(!validation.success){
            notifier.notifyMany(validation.errors,'error')
            return
        }

        hotelActions.createHotel(this.state.hotel)
    }

    handleSuccess(response){
        notifier.notify('Successfully created a hotel entry','success')
        this.props.history.push("/")
    }

    handleFail(response){
        if (response.errors)
            notifier.notifyMany(response.errors, 'error')
        else 
            notifier.notify(response.message, 'error')
    }
}

export default HotelForm