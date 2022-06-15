import React from 'react'
import './Intro.css'

function Intro(props) {
  return (
    <div className='intro'>
        <div className="intro-body">{props.content}</div>
        <div className='intro-footer'>
        <div className="intro-name">{props.name}, {props.age} years old</div>
        <div className="intro-occupation">{props.occupation}</div>
        </div>
    </div>
  )
}

export default Intro