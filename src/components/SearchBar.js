import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import axiosWithAuth from '../functions/axiosWithAuth'
import { useHistory } from "react-router-dom";

import Search from '../images/search.png'

function SearchBar(props) {
    const history = useHistory()
    const[search , setSearch] = useState('')
    const[searchData, setSearchData] = useState([])
    useEffect(()=>{
        
    },[searchData])
    const handleUserClick = user => {
        setSearchData([])
        setSearch('')
        history.push(`/profile/${user.id}`)
    }
    const handleChange = e => {
        setSearch(e.target.value)
        if(search.length >= 2){
            axiosWithAuth().get(`/friends/users/${e.target.value}`).then(res => {
                setSearchData(res.data)
            })
        }else{
            setSearchData([])
        }
    }
    return (
        <div className='search-box'>
            <input className='search-bar' value={search} name='search' onChange={handleChange}/>
            <img className='search-icon' src={Search} width='15px' alt='search icon'/>
            <div className='dropdown'>
                {searchData !== []?
                    searchData.map(user => (
                        <div className='user-tab' onClick={()=>handleUserClick(user)}>
                            <p>{user.first_name} {user.last_name} aka {user.username}</p>
                        </div>
                )):null
            }   
            </div>
        </div>
        
    )
}

export default connect()(SearchBar)