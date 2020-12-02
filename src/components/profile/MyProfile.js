import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axiosWithAuth from '../../functions/axiosWithAuth';

import Post from '../feed/Post';
import UserIcon from '../../images/user-icon.png';
import MyProfileHeader from './MyProfileHeader';
import MakePost from '../feed/MakePost';
import Likes from './Likes';
import EditProfile from './EditProfile';
import Header from '../header/Header';

import { fillFeed } from '../../redux/actions';

function Profile(props) {
    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState(false);
    const [edit, setEdit] = useState(false);
    const toggleLikes = () => setLikes(!likes);
    const toggleEdit = () => setEdit(!edit);

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
                <Header/>
                <div id='profile'>
                {edit?<EditProfile {...props} toggleEdit={toggleEdit}/>: <MyProfileHeader {...props}toggleLikes={toggleLikes} toggleEdit={toggleEdit}/>}
                <div className='post-box'>
                    {likes ? <Likes id={props.userData.id}/>:null}
                    <MakePost/>
                    {posts.map(post => (
                    <Post key={post.id} data={post}/>
                    ))}
                </div>
            </div>
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