import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axiosWithAuth from '../functions/axiosWithAuth';
import Post from './subComponents/Post';
import UserIcon from '../images/user-icon.png';
import MyProfileHeader from './subComponents/MyProfileHeader'
import FriendList from './subComponents/FriendList'
function Profile(props) {
    const [posts, setPosts] = useState([])
    const [modal, setModal] = useState(false)
    var toggleFriendsList = () => {
        const modalElem = document.getElementById('friend-list-modal')
        const profile = document.getElementById('profile')
        if(!modal){
            setModal(true)
            profile.classList.add('blur')
            modalElem.style.display = 'block'
        }else{
            setModal(false)
            profile.classList.remove('blur')
            modalElem.style.display = 'none'
        }
        
    }
    useEffect(()=>{
        if (props.userData.id){
            axiosWithAuth().get(`/posts/${props.userData.id}/0`).then(res => {
            setPosts(res.data.reverse())
        })
        }
        
    }, [props.userData])
    if (props.userData.id){
       return (
            <>
                  <div id='profile'>
                    <MyProfileHeader {...props} toggle={toggleFriendsList}/>
                    <div className='post-box'>
                        {posts.map(post => (
                        <Post key={post.id} data={post}/>
                        ))}
                    </div>
                </div>
                <div id='friend-list-modal' className='friendlist modal-medium none'>
                    <button onClick={toggleFriendsList}>X</button>
                    <FriendList/>
                </div>
            </>
            

    ) 
    }else{
        return(
            <div className='profile'>
            <div className='profile-header'>
                <img className='user-icon-large' src={UserIcon} alt={`profile`} />
                <div className='user-data'>
                    <h5></h5>
                    <p></p>
                </div> 
            </div>
            
            <div className='post-box'>
                
            </div>
        </div>
        )
    }
    
}

const mapStateToProps = state => ({
    userData: state.userData,
    friendList: state.friendList                                   
})

export default connect(mapStateToProps)(Profile)