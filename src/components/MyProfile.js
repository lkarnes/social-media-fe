import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axiosWithAuth from '../functions/axiosWithAuth';
import Post from './subComponents/Post';
import UserIcon from '../images/user-icon.png';

function Profile(props) {
    const [data,setData] = useState({})
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        console.log(props.userFata)
        axiosWithAuth().get(`/posts/${props.userData.id}`).then(res => {
            setPosts(res.data.reverse())
        })
    }, [props])
    console.log(posts)
    return (
        <div className='profile'>
            <div className='profile-header'>
                <img className='profile-picture' src={props.userData.image === null ? UserIcon : data.image} alt={`${data.first_name}s profile`} />
                <div className='user-data'>
                    <h5>{props.userData.first_name} {props.userData.last_name} aka {props.userData.username}</h5>
                    <p>email: {props.userData.email}</p>
                </div> 
            </div>
            
            <div className='post-box'>
                {posts.map(post => (
                <Post key={post.id} data={post}/>
                ))}
            </div>
            
        </div>
    )
}

const mapStateToProps = state => ({
    userData: state.userData                                    
})

export default connect(mapStateToProps)(Profile)