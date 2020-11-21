import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import ThumbSolid from '../../images/thumbs-up-solid.png';
import ThumbTrans from '../../images/thumbs-up-transparent.png';
import {likePost} from '../../redux/actions'
import axiosWithAuth from '../../functions/axiosWithAuth'

function LikeButton(props){
    const [likeToggle, setLikeToggle] = useState()
    useEffect(()=>{
        if(props.likes.filter(l => l.id === props.data.id).length === 1){
            setLikeToggle(true)
        }else{
            setLikeToggle(false)
        }
    },[])
    const handleLike = () => {
        if(likeToggle){
            axiosWithAuth().delete(`/unlike/post/${props.id}/${props.data.id}`).then(res => {
                props.setData({...props.data, likes: props.data.likes - 1})
            })
        }else{
            axiosWithAuth().get(`/like/${props.id}/${props.data.id}`).then(res => {
                props.likePost(props.data)
                props.setData({...props.data, likes: props.data.likes + 1})
            })
        }
        setLikeToggle(!likeToggle)
        
    }

    return(
        <>
            {likeToggle?<img src={ThumbSolid} style={{width: 20}} alt='likes' onClick={handleLike} />:
            <img src={ThumbTrans} style={{width: 20}} alt='likes' onClick={handleLike} />}
        </>
    )
}

const mapStateToProps = state => ({
    id: state.userData.id,
    likes: state.likes,
})

export default connect(mapStateToProps,{likePost})(LikeButton)