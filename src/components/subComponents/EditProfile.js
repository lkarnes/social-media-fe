import React from 'react';
import {connect} from 'react-redux';

import Icon from '../../images/user-icon.png'

function EditProfile(props){
    return (
        <form className='profile-header'>
                <img className='user-icon-large' src={props.userData.image?props.userData.image: Icon} alt={`${props.userData.first_name}s profile`} />
                <div className='user-data'>
                    <h5><input name='first_name' defaultValue={props.userData.first_name}/> <input name='last_name' defaultValue={props.userData.last_name}/> aka <input name='username' defaultValue={props.userData.username}/></h5>
                    <p>email: {props.userData.email}</p>
                </div> 
        </form>
    )
}

export default connect()(EditProfile)