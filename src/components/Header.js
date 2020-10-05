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
            axiosWithAuth().get(`/getData/${decoded.subject}`).then(res => {
                props.signIn(res.data)
                axiosWithAuth().get(`/friends/all/${res.data.id}`).then(response => {
                    props.getFriends(response.data)
                })
            }).catch(err => {
                console.log({err})
                localStorage.removeItem('token')
            })
        }
        
    },[props])
    return props.userData.id === null ? (
        <div>
        </div>
    ) : (
        <SignedInHeader />
    )
}

const mapStateToProps= state =>({
    userData: state.userData,
    friend_list: state.friend_list
})

export default connect(mapStateToProps, {signIn, getFriends})(Header)