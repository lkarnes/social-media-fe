import React from 'react'
import { connect } from 'react-redux'
import Search from '../images/search.png'

function SearchBar(props) {
    return (
        <div className='search-box'>
            <input className='search-bar'/>
            <img className='search-icon' src={Search} width='15px' alt='search icon'/>
        </div>
        
    )
}

export default connect()(SearchBar)