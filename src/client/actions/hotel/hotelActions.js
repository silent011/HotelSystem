import dispatcher from '../../dispatcher'
import types from './hotelTypes'

const hotelActions = {
    createHotel: (hotel) => {
        dispatcher.dispatch({
            type: types.CREATE_HOTEL,
            payload: hotel
        })
    },
    getAll: () => {
        dispatcher.dispatch({
            type: types.GET_ALL
        })
    }
}

export default hotelActions