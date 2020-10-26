import React from 'react';
import {connect} from 'react-redux';
import MakeComment from './MakeComment';

function Comments(props){
    return (
        <div className='comments'>
            <MakeComment/>
        </div>
    )
}

export default connect()(Comments)