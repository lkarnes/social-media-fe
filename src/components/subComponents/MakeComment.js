import React from 'react';
import {connect} from 'react-redux';

function MakeComment(props){
    return (
        <form>
            <textarea type='text' name='body' defaultValue='write your thoughts...' />
        </form>
    )
}

export default connect ()(MakeComment)