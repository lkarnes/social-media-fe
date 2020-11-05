import React, { useState } from 'react';
import {connect} from 'react-redux';
import axiosWithAuth from '../../functions/axiosWithAuth'

function MakeComment(props){
    const [comment, setComment] = useState({
        user_id: props.user_id,
        post_id: props.data.id
    })

    const handleChange = e => {
        comment[e.target.name] = e.target.value
    }
    const handleSubmit = e => {
        e.preventDefault()
        axiosWithAuth().post('/comments/add', comment).then(res => {
            comment.first_name = props.userData.first_name
            comment.last_name = props.userData.last_name
            comment.image = props.userData.image
            console.log(res)
            props.postState.setData({...props.postState.data, comments: [...props.postState.data.comments, comment]})
        })
        setComment({
            user_id: props.user_id,
            post_id: props.data.id, 
            body: ''
        })
    }
    return (
        <form className='comment-form'>
            <textarea type='text' name='body' value={comment.body} onChange={handleChange} placeholder='write a comment' />
            <button type='submit ' onClick={handleSubmit}>Send</button>
        </form>
    )
}

const mapStateToProps = state => ({
    user_id: state.userData.id,
    userData: state.userData
})

export default connect (mapStateToProps)(MakeComment)