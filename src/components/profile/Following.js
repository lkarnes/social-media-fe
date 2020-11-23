import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import SmallUserCard from '../misc/SmallUserCard';

function Following(props){
    return (
        <div className='modal-narrow'>
            <button className='modal-exit' onClick={props.toggle}>X</button>
            <div className='friend-list'>
                {props.friendList && props.friendList.length > 0 ? props.friendList.map(user => (
                    <SmallUserCard user={user}/>
                )) : <p> you dont follow anyone</p>}
            </div>
            
        </div>
    )
}

const mapStateToProps = state => ({
    userData: state.userData,
    friendList: state.friendList
})

export default connect(mapStateToProps)(Following)