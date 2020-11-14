import React from 'react';
import {connect} from 'react-redux';


function Likes(props){
    return (
        <div>
            <p>Awaiting backend route</p>
        </div>
    )
}

const mapStateToProps = state => ({
    userData: state.userData,
})

export default connect(mapStateToProps)(Likes)