import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import axiosWithAuth from '../../functions/axiosWithAuth';
import SmallUserCard from '../misc/SmallUserCard';

function Followers(props){
    const [followers, setFollowers] = useState([])

    useEffect(()=>{
        axiosWithAuth().get(`/friends/all/followers/${props.userData.id}`).then(res => {
            var array = Promise.all(res.data.map(user =>{
                return axiosWithAuth().get(`/friends/${user.user_id}`).then(data => {
                    return data.data
                })
            }))
            array.then(res => {
                setFollowers(res)
            })
        })
    },[])
    return (

        <div className='modal-narrow'>
            <button className='modal-exit' onClick={props.toggle}>X</button>
            <div>
                {followers.map(user => (
                    <SmallUserCard user={user}/>
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    userData: state.userData,
    friendList: state.friendList
})

export default connect(mapStateToProps)(Followers)