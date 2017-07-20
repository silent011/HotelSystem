import React, { Component } from 'react'

class SearchFrom extends Component {
    constructor (props) {
        super(props)
        
        this.state= {
            search: ''
        }

        this.inputChange = this.inputChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    render () {
        return (
            <form className='search-form' onSubmit={this.onSubmit}>
                <input type="search" 
                onChange={this.inputChange}
                value={this.state.search}
                placeholder="Search"/>
                <button type="submit">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </form>
        )
    }

    inputChange(e){
        this.setState({
            search:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()
        console.log(this.state)
    }
}

export default SearchFrom