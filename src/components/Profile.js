import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axiosWithAuth from '../functions/axiosWithAuth';
import Post from './subComponents/Post';
import UserIcon from '../images/user-icon.png';
import { addFriend, removeFriend } from '../redux/actions';

function Profile(props) {
    const [toggle, setToggle] = useState(true)
    const [data,setData] = useState({})
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        console.log(props.friendList)
        if(props.friendList.some(f =>f['friend_id'] === data.id)){
            console.log('why')
            setToggle(false)
        }else{
            setToggle(true)
        }
        axiosWithAuth().get(`/friends/${props.match.params.id}`).then(res => {
            setData(res.data)
            axiosWithAuth().get(`/posts/${props.match.params.id}/0`).then(res => {
                setPosts(res.data.reverse())
            })
        })   
    }, [])
    
    const handleAddFriend = () => {
        
        props.addFriend(data)
        setToggle(false)
        axiosWithAuth().post('/friends/add', {friend_id: data.id, user_id: props.userData.id, friendship_status:'high'}).then(res =>{
            console.log(res)
        }).catch(err => {
            console.log({err})
        })
    }

    const handleRemoveFriend = () => {
        
        props.removeFriend(data.id)
        setToggle(true)
        axiosWithAuth().delete(`/friends/remove/${props.userData.id}/${data.id}`).then(res => {
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
                {toggle?<button className='button-1' onClick={handleAddFriend}>Add as Friend</button>:<button onClick={handleRemoveFriend}>Remove as Friend</button>}
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
    userData: state.userData,
    friendList : state.friendList                                    
})

export default connect(mapStateToProps, {addFriend,removeFriend})(Profile)