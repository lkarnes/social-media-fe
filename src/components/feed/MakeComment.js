import React, { useState } from 'react';
import {connect} from 'react-redux';
import axiosWithAuth from '../../functions/axiosWithAuth'

function MakeComment(props){
    const [comment, setComment] = useState()

    const handleChange = e => {
        console.log(e.target.value)
        setComment(e.target.value)
    }
    const handleSubmit = e => {
        e.preventDefault()
        let newComment = {
            body:comment,
            user_id: props.user_id,
            post_id: props.data.id
        }
        axiosWithAuth().post('/comments/add', newComment).then(res => {
            newComment = {
                body:comment,
                user_id: props.user_id,
                post_id: props.data.id,
                first_name : props.userData.first_name,
                last_name : props.userData.last_name,
                username : props.userData.username,
                image : props.userData.image,
                id : res.data,
            }
            props.postState.setData({...props.postState.data, comments: [...props.postState.data.comments, newComment]})
        })
        setComment('')
    }
    return (
        <form className='comment-form'>
            <textarea type='text' name='body' value={comment} onChange={handleChange} placeholder='write a comment' />
            <button type='submit ' onClick={handleSubmit}>Send</button>
        </form>
    )
}

const mapStateToProps = state => ({
    user_id: state.userData.id,
    userData: state.userData
})

export default connect (mapStateToProps)(MakeComment)