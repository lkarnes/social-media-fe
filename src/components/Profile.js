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
            axiosWithAuth().get(`/posts/${props.match.params.id}`).then(res => {
                setPosts(res.data)
                
            })
        })
    }, [props])
    console.log(posts)
    return (
        <div className='profile'>
            <div className='profile-header'>
                <img className='profile-picture' src={data.image === null ? UserIcon : data.image} alt={`${data.first_name}s profile`} />
                <h2>{data.first_name} {data.last_name} aka {data.username}</h2>
                <h5>email: {data.email}</h5>
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