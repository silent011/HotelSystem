import { EventEmitter } from 'events'

import dispatcher from '../dispatcher'
import requester from '../requesters/requester'

import types from '../actions/hotel/hotelTypes'

class HotelStore extends EventEmitter{
    constructor() {
        super()

        this.handleActions = this.handleActions.bind(this)
        this.createHotel = this.createHotel.bind(this)
    }

    createHotel(hotel){
        requester
            .post('/hotels/create', hotel, true)
            .then(res => {
                if(res.success){
                    this.emit(types.CREATED_HOTEL)
                } else {
                    this.emit(types.CREATED_HOTEL_FAIL, res)
                }
            })
    }

    getAll(){
        requester.get('/hotels/all').then(res => {
            this.emit(types.GOT_ALL, res)
        })
    }

    handleActions(action){
        switch(action.type){
            case types.CREATE_HOTEL:{
                this.createHotel(action.payload)
                break
            }
            case types.GET_ALL:{
                this.getAll()
                break
            }
            default: break
        }
    }
}

let hotelStore = new HotelStore()
dispatcher.register(hotelStore.handleActions)

export default hotelStore