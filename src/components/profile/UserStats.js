import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../functions/axiosWithAuth';

import Portal from '../misc/Portal';
import Followers from './Followers';
import Following from './Following';

export default function UserStats(props) {
    const [followers, setFollowers] = useState([]);
    const [followerToggle, setFollowerToggle] = useState(false)
    const [followingToggle, setFollowingToggle] = useState(false)
    const [following, setFollowing] = useState([]);
    const [likes, setLikes] = useState([])
    useEffect(()=> {
        axiosWithAuth().get(`/friends/all/followers/${props.id}`).then(res => {
            setFollowers(res.data)
            console.log(res.data)
        })
        axiosWithAuth().get(`/friends/all/${props.id}`).then(res => {
            setFollowing(res.data)
        })
        axiosWithAuth().get(`/likes/posts/${props.id}`).then(res => {
            setLikes(res.data)
        })
    },[])
    const handleFollowingExit = () => setFollowingToggle(false)
    const handleFollowerExit = () => setFollowerToggle(false)

    return (
        <div className='user-stats'>
            <div className='stat' onClick={()=>setFollowingToggle(!followingToggle)}>
                <h5>{following.length}</h5>
                <p>Following</p>
                 
            </div>
            <div className='stat' onClick={()=>setFollowerToggle(!followingToggle)}>
                <h5>{followers.length}</h5>
                <p>Followers</p>
            </div>
            <div className='stat' onClick={props.LikeToggle}>
                <h5>{likes.length}</h5>
                <p>Likes</p>
            </div>

            <Portal>
                {followingToggle?<Following data={following} id={props.id} toggle={handleFollowingExit}/>: null}
                {followerToggle?<Followers data={followers} id={props.id} toggle={handleFollowerExit}/>: null}
            </Portal>
        </div>
    )
}