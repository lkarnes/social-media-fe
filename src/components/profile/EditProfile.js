import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {useHistory} from 'react-router'

import Icon from '../../images/user-icon.png'

import {signIn, clearState} from '../../redux/actions';
import axiosWithAuth from '../../functions/axiosWithAuth';

function EditProfile(props){
    const formElem = React.useRef()
    const history = useHistory();
    const handleSave = e => {
        e.preventDefault()
        const formData = new FormData(formElem.current)
         formData.append('email', props.userData.email)
         formData.append('password', props.userData.password)
        axios.put(`https://social-1.herokuapp.com/api/edit/${props.userData.id}`, formData).then(res =>{
            console.log(res)
            props.signIn(res.data.data)
            props.toggleEdit()
        }).catch(err => {
            alert(err)
            console.log({err})
        })
    }
    const handleDeleteAccount = e => {
        e.preventDefault();
        if(window.confirm('This action is permanent are you sure you would like to proceed?')){
            axiosWithAuth().delete(`/delete/${props.userData.id}`).then(res => {
                console.log(res)
                props.clearState()
                localStorage.clear()
                history.push('/')
            })
        }
    }
    const handleSelect = e => {
        e.preventDefault()
        var hiddenInput = document.getElementById('hidden-photo-input')
        hiddenInput.click()
    }
    const handleUpload = e => {
        const image = document.getElementById('changed-photo')
        if(e.target.value){   
            image.src = URL.createObjectURL(e.target.files[0])
        }
    }
    return (
        <form ref={formElem} onSubmit={handleSave} className='profile-header'>
               
                <img id='changed-photo' className='user-icon-large' src={props.userData.image?props.userData.image: Icon} alt={`${props.userData.first_name}s profile`} />
                <button className='button-2' onClick={handleSelect}>Change Photo</button>
                <button className='button-2 delete-account' onClick={handleDeleteAccount}>Delete Account</button>
                <input id='hidden-photo-input' type='file' name='image' style={{display:'none'}} accept="image/*" onChange={handleUpload}/>
                <div className='user-data'>
                    
                    <h5><input name='first_name' defaultValue={props.userData.first_name}/> <input name='last_name' defaultValue={props.userData.last_name}/> aka <input name='username' defaultValue={props.userData.username}/></h5>
                    <p>email: {props.userData.email}</p>
                    <button className='button-1' onSubmit={handleSave}>Save</button>
                </div> 
        </form>
    )
}

const mapStateToProps = state => ({
    userData: state.userData
})

export default connect(mapStateToProps,{signIn, clearState})(EditProfile)