import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function Feed(props) {
    useEffect(()=>{
        if(!localStorage.getItem('token')){
          props.history.push('/')
        }
      })
    return (
        <div className='main-feed'>

        </div>
    )
}