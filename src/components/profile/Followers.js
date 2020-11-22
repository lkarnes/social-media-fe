import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import axiosWithAuth from '../../functions/axiosWithAuth';

function Followers(props){
    const [followers, setFollowers] = useState([])

    useEffect(()=>{
        axiosWithAuth().get(``).then(res => {
            console.log(res)
        })
    },[])
    return (

        <div className='modal-narrow'>
            <button className='modal-exit' onClick={props.toggle}>X</button>
            <div>
                {followers.map(user => (
                    <p>{user.username}</p>
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