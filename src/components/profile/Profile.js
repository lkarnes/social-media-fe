import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axiosWithAuth from '../../functions/axiosWithAuth';
import Post from '../feed/Post';
import FriendButton from './FriendButton';
import UserIcon from '../../images/user-icon.png';
import UserStats from './UserStats';
import Header from '../header/Header'


import { addFriend, removeFriend } from '../../redux/actions';

function Profile(props) {
    const [data,setData] = useState({})
    const [posts, setPosts] = useState([])
    const [likeToggle, setLikeToggle] = useState(false);
    const toggleLikes = () => setLikeToggle(!likeToggle);
    useEffect(()=>{
        axiosWithAuth().get(`/friends/${props.match.params.id}`).then(res => {
            setData(res.data)
            axiosWithAuth().get(`/posts/${props.match.params.id}/0`).then(res => {
                setPosts(res.data.reverse())
            })
        })   
    },[props])
    
   return (
       <>
       <Header/>
        <div className='profile'>
            <div className='profile-header'>
                <img className='user-icon-large profile-picture' src={data.image === null ? UserIcon : data.image} alt={`${data.first_name}s profile`} />
                
                <div className='profile-button-menu'>
                    <UserStats id={props.match.params.id} LikeToggle={toggleLikes}/>
                </div>
                <div className='user-data'>
                    <h5>{data.first_name} {data.last_name} aka {data.username}</h5>
                    <p>email: {data.email}</p>
                    <FriendButton data={data}/>
                </div>
                
            </div>
            
            <div className='post-box'>
                {posts.map(post => (
                <Post key={post.id} data={post}/>
                ))}
                {posts.length >= 15 ? <button>Load More</button>: <></>}
            </div>
            
        </div>
    </>
    )
}

const mapStateToProps = state => ({
    userData: state.userData,
    friendList : state.friendList                                    
})

export default connect(mapStateToProps, {addFriend,removeFriend})(Profile)