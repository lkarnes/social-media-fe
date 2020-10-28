import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import axiosWithAuth from '../../functions/axiosWithAuth'

import Comment from './Comment';

function Comments(props){
    return (
        <div className='comments'>
            {props.postState.data.comments.map(comment => (
                <Comment data={comment}  postState={props.postState}/>
            ))}
        </div>
    )
}

export default connect()(Comments)