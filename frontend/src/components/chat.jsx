import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useHistory } from "react-router-dom";
import { bindActionCreators } from 'redux';
import React, { useEffect, useState } from "react";
import { Button, Collapse, TextField, MenuItem, Select, Container } from '@mui/material'
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { updateLoggedInUser } from './../state/action'
import { actionCreators } from './../state/action-combiner';
import './style.css'

function Chat() {
    
    const [expand, setExpand] = useState(false)
	const [name, setName] = useState('')
	const [error, setError] = useState(false)
	const [color, setColor] = React.useState('default');
	const [loaded, setLoaded] = useState(false);
    const [userObject, setUserObject] = useState(null);
    const history = useHistory()
	const dispatch = useDispatch()
	const {updateLoggedInUser} = bindActionCreators(actionCreators, dispatch)
	let user = useSelector((state) => state)
	
	useEffect(() => {
        console.log("in chat page")
        if(user.userInfo == null || Object.keys(user.userInfo).length == 0){
            user = user.persisted
        }

        if(user.userInfo == null || Object.keys(user.userInfo).length == 0){        //no one's loggedin
            console.log('log in please')
            return
        }
        
        console.log(user.userInfo)
        setUserObject(user.userInfo)
        setLoaded(true)
    }, [])

    if(!loaded)
        return (<div>loading...</div>)
    return (
        <Container maxWidth='sm' className='container'>
        <div className="chat">
            <div className='top'>
                <div className='left'>
                    <div className='label'>
                        Welcome {userObject.username}
                    </div>
                    <div className='textview'>

                    </div>
                </div>
                <div className='right'>
                    <div className='label'>
                        Online Users:
                    </div>
                    <div className='users'>

                    </div>
                </div>
            </div>
            <div className='bottom'>
                <TextField
                    error={error}
                    id="outlined-error"
                    label="Say something!"
                    variant='standard'
                    // onChange={handleChangeName}
                    helperText={error ? 'That name is taken' : ''}
                    fullWidth
                />
            </div>
        </div>
        </Container>
    )
}

export default Chat