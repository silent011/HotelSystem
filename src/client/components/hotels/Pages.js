import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../../styles/pages.css'

const SinglePage = (props) => {
    let clazz = 'single-page-link'
    if(props.currentPage === props.page){
        clazz+= ' page-highlight'
    }
    return (
        <Link className={clazz} to={`?page=${props.page}`}>{props.page}</Link>
    )
}

class Pages extends Component {
    render () {
        let length = this.props.length
        let currentPage = this.props.currentPage*1
        let maxPages = Math.ceil(length/2)
        let pages = this.genPages(maxPages, currentPage)
       
        let prevButton = this.prevButton(currentPage)
        let nextButton = this.nextButton(currentPage, maxPages)
        return (
            <div className='pages'>
                { prevButton }
                { pages }
                { nextButton }
            </div>
        )
    }

    genPages(maxPages, currentPage){
        let pages = []
        for(let i = 1;i<=maxPages; i++){
            pages.push(<SinglePage currentPage={currentPage} key={i} page={i} />)
        }

        return pages
    }

    prevButton(currentPage){
        let prevPage = currentPage-1
        if(prevPage < 1){
            return null
        }
        return (
            <Link className='single-page-link' to={`?page=${prevPage}`}>{'<<'}</Link>
        )
    }

    nextButton(currentPage, maxPages){
         let nextPage = currentPage+1
         if(nextPage > maxPages){
             return null
         }

         return (
            <Link className='single-page-link' to={`?page=${nextPage}`}>{'>>'}</Link>
        )
    }
}

export default Pages