import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axiosWithAuth from '../../functions/axiosWithAuth';

import Post from '../feed/Post';
import UserIcon from '../../images/user-icon.png';
import MyProfileHeader from './MyProfileHeader';
import Following from './Following';
import Portal from '../misc/Portal';
import MakePost from '../feed/MakePost';
import Likes from './Likes';
import EditProfile from './EditProfile';
import Followers from './Followers';

import { fillFeed } from '../../redux/actions';

function Profile(props) {
    const [posts, setPosts] = useState([]);
    const [followingModal, setFollowingModal] = useState(false);
    const [followerModal, setFollowerModal] = useState(false);
    const [likes, setLikes] = useState(false);
    const [edit, setEdit] = useState(false);
    const toggleLikes = () => setLikes(!likes);
    const toggleEdit = () => setEdit(!edit);
    const toggleFollowing = () => {
        const profile = document.getElementById('profile');
        if(!followingModal){
            setFollowingModal(true);
            profile.classList.add('blur');
        }else{
            setFollowingModal(false);
            profile.classList.remove('blur');
        }
    };
    const toggleFollowers = () => {
        const profile = document.getElementById('profile');
        if(followerModal){
            profile.classList.remove('blur');
        }else{
            profile.classList.add('blur');
        }
        setFollowerModal(!followerModal)
    }
    useEffect(()=>{
        if (props.userData.id){
            axiosWithAuth().get(`/posts/${props.userData.id}/0`).then(res => {
                setPosts(res.data.reverse());
            });
        };
        
    }, [props.userData.id]);
    if (props.userData.id){
       return (
            <>
                <div id='profile'>
                {edit?<EditProfile {...props} toggleEdit={toggleEdit}/>:<MyProfileHeader {...props} toggleFollowing={toggleFollowing} toggleFollowers={toggleFollowers} toggleLikes={toggleLikes} toggleEdit={toggleEdit}/>}
                <div className='post-box'>
                    {likes ? <Likes/>:null}
                    <MakePost/>
                    {posts.map(post => (
                    <Post key={post.id} data={post}/>
                    ))}
                </div>
            </div>
                <Portal>
                    {followingModal ? <Following toggle={toggleFollowing}/>: null}
                    {followerModal ? <Followers toggle={toggleFollowers}/>: null}
                </Portal>
            </>
    ) 
    }else{
        return(
            <div className='profile'>
                <div className='profile-header'>
                    <img className='user-icon-large' src={UserIcon} alt={`profile`} />
                    <div className='user-data'>
                        <h5>loading...</h5>
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

export default connect(mapStateToProps, {fillFeed})(Profile)