import React, {useState} from 'react';
import axiosWithAuth from '../../functions/axiosWithAuth';
import {connect} from 'react-redux';
import {addPost} from '../../redux/actions';
import ImagePreview from './ImagePreview';

function MakePost(props){
    const formElement = React.useRef()
    const errorBox = React.useRef()
    const adjustHeight = () => {
        const textarea = document.getElementById('textarea')
        if(textarea.value.length > 40) {
            textarea.rows = (Math.round(textarea.value.length / 45)+1)
        }else{
            textarea.rows = 2;
        }
    }
    const handleSelect = e => {
        e.preventDefault()
        var hiddenInput = document.getElementById('file-input')
        hiddenInput.click()
    }
    const handleUpload = e => {
        const photoBox = document.getElementById('photo-box')
        const image = document.getElementById('added-photo')
        if(e.target.value){   
            image.src = URL.createObjectURL(e.target.files[0])
            photoBox.style.display = 'flex'
        }
    }

    const checkErrors = (formData) => {
        console.log(formData)
        let bool = false;
        var error = errorBox.current;
        var form = formData;
        if(form.get('body').length < 2 ){
            error.style.display = 'flex'
            error.innerHTML = 'the Body must be atleast 2 charecters long...'
            bool = true
        }
        if (form.get('body').length > 400){
            error.style.display = 'flex'
            error.innerHTML = 'the body must be under 400 charecters...'
            bool = true
        }
        if (!props.id){
            bool = true
            error.innerHTML = 'error while posting please refresh page or try again later'
        }
        if (form.get('header').length > 40){
            error.style.display = 'flex'
            error.innerHTML = 'header must be under 40 charecters...'
        }
        return bool
    }

    const handleSubmit = e => {
        e.preventDefault() 
        const formData = new FormData(formElement.current)
        const photoBox = document.getElementById('photo-box')
        formData.append('poster_id', props.id)
        formData.append('status', 'public')
        if(formData.get('image').name === ''){
            formData.append('type', 'string')
        }else{
            formData.append('type', 'image')
        }
        if(!checkErrors(formData)){
            axiosWithAuth().post('/posts/createpost/', formData).then(res=>{
                console.log(res)
                props.addPost(res.data)    
                formData.delete('image')
                formElement.current.body.value = null
                formElement.current.title.value = null
                formElement.current.image.value = null
            }).catch(err => {console.log({err})})
            photoBox.style.display = 'none';
        }
        
    }
    
    return (
        <div className='make-post'>
            <ImagePreview formElement={formElement}/>
                <h4>Create a Post</h4>
            <form onSubmit={handleSubmit} ref={formElement} >
                <p ref={errorBox} className='error-message' style={{}}></p>
                <p className='error' id='max-length' style={{'display':'none'}}>The body is at max length</p>
                <input id='title' placeholder='Title(Optional)' type='text' name='header' />
                <textarea id='textarea' rows='2' placeholder='Body(Required)' name='body' onChange={adjustHeight}/>
                <input id='file-input' type='file' name='image' style={{display:'none'}} accept="image/*" onChange={handleUpload}/>    
                <button className='button-2' onClick={handleSelect}>Add a Image</button>
                <button className='button-1' type='submit' onClick={handleSubmit}>Post</button>
            </form>
            
        </div>
    )
}

const mapStateToProps = state => ({
    id: state.userData.id
})

export default connect(mapStateToProps,{addPost})(MakePost);