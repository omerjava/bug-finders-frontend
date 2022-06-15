import React from 'react'
import './UserCard.css'

function UserCard(props) {
  return (
    <div className='user-card'>
        <div className="header">
            {props.username}
        </div>
        <div className="body">
            {props.email}
        </div>
        <div className="footer">
            {props.date}
            <div className="user-bugs">hello</div>
            <div className="user-comments"> hi</div>
        </div>
    </div>
  )
}

export default UserCard