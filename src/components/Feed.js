import React, {useEffect, useState} from 'react'
import axios from 'axios'
import MakePost from './subComponents/MakePost'

export default function Feed(props) {
    useEffect(()=>{
        if(!localStorage.getItem('token')){
          props.history.push('/')
        }
      })
    return (
        <div className='feed'>
          <div className='left-panel'>

          </div>

          <div className='main-feed'>
            <MakePost />
          </div>

          <div className='right-panel'>

          </div>

        </div>
        
    )
}