import React from 'react';
import {NavLink} from 'react-router-dom';

export default function SmallUserCard({user}){
    return (
        <NavLink to={`/profile/${user.id}`} className='user-card'>
            <img className='user-icon-xsmall' src={user.image} alt={user.username} />
            <p>{user.first_name} {user.last_name} aka {user.username}</p>
        </NavLink>
    )
}