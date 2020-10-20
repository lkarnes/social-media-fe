import React, {useEffect} from 'react';
import axiosWithAuth from '../functions/axiosWithAuth';
import SignedInHeader from './subComponents/SignedInHeader';
import jwt_decode from 'jwt-decode';
import {connect} from 'react-redux';
import {signIn, getFriends} from '../redux/actions';

function Header(props) {
    useEffect(()=>{
        if(localStorage.getItem('token') && props.userData.id === null){
            var token = localStorage.getItem('token')
            var decoded = jwt_decode(token)
            //gets user data from token
            axiosWithAuth().get(`/getData/${decoded.subject}`).then(res => {
                props.signIn(res.data)
                //gets all friends
                axiosWithAuth().get(`/friends/all/${res.data.id}`).then(friendArr => {
                    var response = []
                        friendArr.data.map(friend => {
                        //gets data for friend
                        axiosWithAuth().get(`/friends/${friend.friend_id}`).then(friendData => {
                            response.push(friendData.data)
                        })
                    })
                    //adds data to store
                    props.getFriends(response)
                })
            }).catch(err => {
                console.log({err})
                localStorage.removeItem('token')
            })
        }
        
    },[])
    return props.userData.id === null ? null : (<SignedInHeader/>)
}

const mapStateToProps= state =>({
    userData: state.userData,
    friend_list: state.friend_list
})

export default connect(mapStateToProps, {signIn, getFriends})(Header)