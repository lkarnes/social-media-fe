import React, {useEffect} from 'react';
import axiosWithAuth from '../../functions/axiosWithAuth';
import SignedInHeader from './SignedInHeader';
import jwt_decode from 'jwt-decode';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {signIn, getFriends, loadLikes} from '../../redux/actions';

function Header({ getFriends, signIn, userData, loadLikes}) {
    const history = useHistory();
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
            axiosWithAuth().get(`/likes/posts/${decoded.subject}`).then(res => {
                loadLikes(res.data)
            }).catch(err => console.log({err}))
        }
        
    },[getFriends, signIn, userData.id, loadLikes])

    return history.location.pathname !== '/'? (<SignedInHeader/>): null;
}

const mapStateToProps= state =>({
    userData: state.userData,
    friend_list: state.friend_list,
    likes: state.likes,
})

export default connect(mapStateToProps, {signIn, getFriends, loadLikes})(Header)