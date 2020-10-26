import React from 'react';
import {connect} from 'react-redux';

function MakeComment(props){
    return (
        <form className='comment-form'>
            <textarea type='text' name='body' placeholder='write a comment' />
            <button>Send</button>
        </form>
    )
}

export default connect ()(MakeComment)