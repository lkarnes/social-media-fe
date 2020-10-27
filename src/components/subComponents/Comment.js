import React from 'react';
import {connect} from 'react-redux'

function Comment({data}){
    return (
        <div className='comment'>
            <div className='comment-tag'>
                <img className='user-icon-xsmall' src={data.image}/>
                <p className='username'>{data.first_name} {data.last_name} aka {data.username}</p>
            </div>
            <p className='body'>{data.body}</p>
        </div>
    )
}

export default connect()(Comment)