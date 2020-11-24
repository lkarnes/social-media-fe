import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import axiosWithAuth from '../../functions/axiosWithAuth';
import {loadLikes} from '../../redux/actions';

import Post from '../feed/Post';

function Likes({userData, userLikes, loadLikes, id}){
    const [likes , setLikes] = useState(userLikes)
    const [mounted, setMounted] = useState(false)
    useEffect(()=> {
        axiosWithAuth().get(`/likes/posts/${id}`).then(res => {
            loadLikes(res.data)
            setLikes(res.data)
            setMounted(true)
        })
    },[userData.id, loadLikes])
        
    if(mounted === false){
        return (
            <p style={{width: '100%', margin: '0 auto', textAlign: 'center', padding: 5}}>loading...</p>
        )
    }else if(likes.length > 0){
        return (
            <div className='likes-box'>
                <h5>Post You've Liked</h5>
                {likes.map(post => (
                    <Post data={post}/>
                ))}
            </div>
        )
    }else{
        return (
            <p style={{width: '100%', margin: '0 auto', textAlign: 'center', padding: 5}}>No Likes found</p>
        )
        
    }
}

const mapStateToProps = state => ({
    userData: state.userData,
    userLikes : state.likes
})

export default connect(mapStateToProps, {loadLikes})(Likes)