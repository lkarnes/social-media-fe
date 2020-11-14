import React, {useState} from 'react'
import { connect } from 'react-redux'
import axiosWithAuth from '../../functions/axiosWithAuth'
import { useHistory } from "react-router-dom";

function SearchBar(props) {
    const history = useHistory()
    const[search , setSearch] = useState('')
    const[searchData, setSearchData] = useState([])
    const handleUserClick = user => {
        setSearchData([])
        setSearch('')
        history.push(`/profile/${user.id}`)
    }
    const handleChange = e => {
        setSearch(e.target.value)
        if(e.target.value.length > 2){
            axiosWithAuth().get(`/friends/users/${e.target.value}`).then(res => {
                setSearchData(res.data)
            })
        }else{
            setSearchData([])
        }
    }
    return (
        <div className='search-box'>
            <input className='search-bar' value={search} name='search' onChange={handleChange} placeholder='find some friends...' />
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