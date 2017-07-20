import React, { Component } from 'react'
import queryString from 'query-string'

import types from '../../actions/hotel/hotelTypes'
import hotelActions from '../../actions/hotel/hotelActions'
import hotelStore from '../../stores/hotelStore'

import HotelCard from './HotelCard'
import Pages from './Pages'
import SearchForm from '../shared/SearchForm'

class HotelsAll extends Component {
    constructor (props) {
        super(props)

        this.state = {
            hotels: null,
            currentPage: 1,
            search: '' 
        }
        
        this.handleSuccess = this.handleSuccess.bind(this)
        hotelStore.on(types.GOT_ALL, this.handleSuccess)
    }

    
    componentWillMount () {
        this.qsHandler(this.props)
    }

    componentWillReceiveProps (nextProps) {
        this.qsHandler(nextProps)
    }
    
    componentDidMount () {
        hotelActions.getAll()
    }

    componentWillUnmount () {
        hotelStore.removeListener(types.GOT_ALL, this.handleSuccess)
    }

    handleSuccess(hotels){
        this.setState({
            hotels
        })
    }

    render () {
        console.log(this.props)
        let hotels = this.state.hotels
        let pages = null
        let currentPage = this.state.currentPage
        let searchForm = null
        if(hotels){
            searchForm = <SearchForm />
            pages = this.genPages(hotels.length, currentPage)

            let min = (currentPage-1) * 2
            let max = currentPage * 2
            hotels = this.parseHotels(hotels.slice(min,max))
        }
        return (
            <div>
                { searchForm }
                { hotels }
                { pages }
            </div>
        )
    }

    parseHotels(hotels) {
        let parsed = hotels.concat().map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
        ))

        return parsed
    }

    genPages(length, currentPage){
        return <Pages length={length} currentPage={currentPage} />
    }

    qsHandler(props){
        let qs = queryString.parse(props.location.search)
        if(qs){
            if(qs.page){
                this.setState(prevState => {
                    prevState.currentPage = qs.page
                    return prevState
                })
            }
            if(qs.search){
                this.setState(prevState => {
                    prevState.search = qs.search
                    return prevState
                })
            }
        }
    }
}

export default HotelsAll