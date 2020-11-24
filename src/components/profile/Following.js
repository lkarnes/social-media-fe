import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import SmallUserCard from '../misc/SmallUserCard';
import axiosWithAuth from '../../functions/axiosWithAuth';


function Following({toggle, data, id}){
    const [following, setFollowing] = useState()
    useEffect(()=>{
        var array = Promise.all(data.map(user =>{
            console.log(user)
            return axiosWithAuth().get(`/friends/${user.friend_id}`).then(data => {
                return data.data
            })
        }))
        array.then(res => {
            setFollowing(res)
        })
    },[])
    return (
        <div className='modal-narrow'>
            <button className='modal-exit' onClick={toggle}>X</button>
            <div className='friend-list'>
                {following && following.length > 0 ? following.map(user => (
                    <SmallUserCard user={user}/>
                )) : <p> you dont follow anyone</p>}
            </div>
            
        </div>
    )
}

const mapStateToProps = state => ({
    userData: state.userData,
    friendList: state.friendList
})

export default connect(mapStateToProps)(Following)