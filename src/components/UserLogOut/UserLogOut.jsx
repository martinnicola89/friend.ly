import React from 'react';

export default function UserLogOut(props) {
    return (
        <div className='UserLogOut'>
            <button onClick={props.handleLogOut}>Logout</button>
        </div>
    );
}

