import React, {useEffect} from 'react';
import axiosWithAuth from '../functions/axiosWithAuth';
import SignedInHeader from './subComponents/SignedInHeader';
import jwt_decode from 'jwt-decode';
import {connect} from 'react-redux';
import {signIn} from '../redux/actions';

function Header(props) {
    console.log(props)
    useEffect(()=>{
        if(localStorage.getItem('token') && props.userData.id === null){
            var token = localStorage.getItem('token')
            var decoded = jwt_decode(token)
            axiosWithAuth().get(`/getData/${decoded.subject}`).then(res => {
                props.signIn(res.data)
                console.log(res.data)
            }).catch(err => {
                console.log({err})
                localStorage.removeItem('token')
            })
        }
    },[props])

    return props.userData.id === null ? (
        <div>
        </div>
    ) : (
        <SignedInHeader />
    )
}

const mapStateToProps= state =>({
    userData: state.userData,
})

export default connect(mapStateToProps, {signIn})(Header)