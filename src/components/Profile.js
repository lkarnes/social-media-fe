import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axiosWithAuth from '../functions/axiosWithAuth';
import Post from './subComponents/Post';
import UserIcon from '../images/user-icon.png';

function Profile(props) {
    const [data,setData] = useState({})
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        axiosWithAuth().get(`/friends/${props.match.params.id}`).then(res => {
            setData(res.data)
            axiosWithAuth().get(`/posts/${props.match.params.id}/0`).then(res => {
                setPosts(res.data.reverse())
            })
        })
    }, [props])
    const handleAddFriend = () => {
        axiosWithAuth().post('/friends/add', {friend_id: data.id, user_id: props.userData.id, friendship_status:'high'}).then(res =>{
            console.log(res)
        }).catch(err => {
            console.log({err})
        })
    }
    return (
        <div className='profile'>
            <div className='profile-header'>
                <img className='user-icon-large' src={data.image === null ? UserIcon : data.image} alt={`${data.first_name}s profile`} />
                <h2>{data.first_name} {data.last_name} aka {data.username}</h2>
                <h5>email: {data.email}</h5>
                <button className='button-1' onClick={handleAddFriend}>Add as Friend</button>
            </div>
            
            <div className='post-box'>
                {posts.map(post => (
                <Post key={post.id} data={post}/>
                ))}
                {posts.length >= 15 ? <button>Load More</button>: <></>}
            </div>
            
        </div>
    )
}

const mapStateToProps = state => ({
    userData: state.userData                                    
})

export default connect(mapStateToProps)(Profile)