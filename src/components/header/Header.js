import React, {useEffect} from 'react';
import axiosWithAuth from '../../functions/axiosWithAuth';
import SignedInHeader from './SignedInHeader';
import jwt_decode from 'jwt-decode';
import {connect} from 'react-redux';
import {signIn, getFriends} from '../../redux/actions';

function Header({friend_list, getFriends, signIn, userData}) {
    useEffect(()=>{
        if(localStorage.getItem('token') && userData.id === null){
            var token = localStorage.getItem('token')
            var decoded = jwt_decode(token)
            //gets user data from token
            axiosWithAuth().get(`/getData/${decoded.subject}`).then(res => {
                signIn(res.data)
                //gets all friends
                axiosWithAuth().get(`/friends/all/${res.data.id}`).then(friendArr => {
                    Promise.all(friendArr.data.map(friend => {
                        //gets data for friend
                        return axiosWithAuth().get(`/friends/${friend.friend_id}`)
                    })).then(response => {
                        getFriends(response.map(obj => {return obj.data}))
                    })
                })
            }).catch(err => {
                console.log({err})
                localStorage.removeItem('token')
            })
        }
        
    },[getFriends, signIn, userData.id])
    return userData.id === null ? null : (<SignedInHeader/>)
}

const mapStateToProps= state =>({
    userData: state.userData,
    friend_list: state.friend_list
})

export default connect(mapStateToProps, {signIn, getFriends})(Header)