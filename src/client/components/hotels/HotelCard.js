import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../../styles/hotel-card.css'

class HotelCard extends Component {
    render () {
        let hotel = this.props.hotel
        return (
            <div className='hotel-card'>
                <img src={hotel.image} alt="hotel"/>
                <div className='hotel-card-right'>
                    <h2>{hotel.name}</h2>
                    <h3>{hotel.location}</h3>
                    <Link to={`hotels/details/${hotel.id}`}>Details about {hotel.name}</Link>
                </div>
            </div>
        )
    }
}

export default HotelCard