import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useHistory } from "react-router-dom";
import { bindActionCreators } from 'redux';
import React, { useEffect, useState } from "react";
import { Button, Collapse, TextField, MenuItem, Select, Container } from '@mui/material'
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import { updateLoggedInUser } from './state/action'
import { actionCreators } from './state/action-combiner';
import logo from './logo.svg';
import './App.css';

function App() {

	const [expand, setExpand] = useState(false)
	const [name, setName] = useState('')
	const [error, setError] = useState(false)
	const [color, setColor] = useState('default');
	const [loaded, setLoaded] = useState(false);
    const history = useHistory()
	const dispatch = useDispatch()
	const {updateLoggedInUser} = bindActionCreators(actionCreators, dispatch)
	let user = useSelector((state) => state)
	
	useEffect(() => {
        // console.log("in useEffect homepage")
        // if(user.userInfo == null || Object.keys(user.userInfo).length == 0){
        //     user = user.persisted
        // }

        // if(user.userInfo == null || Object.keys(user.userInfo).length == 0){        //no one's loggedin
        //     console.log('log in please')
        //     // history.push('/')
        //     return
        // }

        // console.log(user.userInfo)
        setLoaded(true)
    }, [])

	const handleColorChange = (event) => {
		setColor(event.target.value);
		console.log(event.target.value)
	}

	const expandOptions = (e) => {
		setExpand(!expand)
	}

	const handleChangeName = (event) => {
        let _name = event.target.value
        setName(_name)
    }

	const handleSubmit = async (e) => {

		const colorOptions = ['Red', 'Blue', 'Green', 'Yellow', 'Purple']

		let randomName = name
		if(name === ''){
			randomName = uniqueNamesGenerator({
				dictionaries: [adjectives, animals], style: 'capital', separator:''
			})
		}

		let colorChoice = color
		if(color === 'default'){
			colorChoice = colorOptions[colorOptions.length * Math.random() | 0]
		}

		let response
		try {
			response = await fetch('http://localhost:3000/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({username: randomName})
			});
		} catch (error) {
			setError(true)
			console.log('duplicate name')
			return
		}
		
        let result;

        try {
            result = await response.json()
            console.log(result)
			updateLoggedInUser({username: result.username, color: colorChoice})
        } catch (error) {
            alert('problem with fetchUser')
            console.log(error)
			return
        }

		history.push('/chat')
	}

	if(!loaded)
        return (<div>loading...</div>)
	return (
		<Container maxWidth='sm'>
		<div className="App">
			<div className='title'>
				Welcome to RahmanChat!
			</div>
			<div className='center'>
				<Button variant='contained' onClick={expandOptions} className='btn'>
					Join the convo!
				</Button>
			</div>
			<Collapse in={expand}>
				<div className='form'>
					<div className='title'>
						Pick a nickname and color to get started
						<div className='subtext'>
							Optional
						</div>
					</div>
					<div className='textfield'>
						<TextField
							error={error}
							className='text'
							id="outlined-error"
							label="Choose a nickname!"
							variant='outlined'
							onChange={handleChangeName}
							helperText={error ? 'That name is taken' : ''}
						/>
					</div>
					<div className='dropdown'>
						<Select
							value={color}
							onChange={handleColorChange}
							displayEmpty
							inputProps={{ 'aria-label': 'Without label' }}
						>
							<MenuItem value="default">
								<em>Choose a color!</em>
							</MenuItem>
							<MenuItem value={'Red'}>Red</MenuItem>
							<MenuItem value={'Blue'}>Blue</MenuItem>
							<MenuItem value={'Green'}>Green</MenuItem>
							<MenuItem value={'Yellow'}>Yellow</MenuItem>
							<MenuItem value={'Purple'}>Purple</MenuItem>
						</Select>
					</div>
					<div className='btn'>
						<Button variant='outlined' onClick={handleSubmit}>
							ok
						</Button>
					</div>
				</div>
			</Collapse>
		</div>
		</Container>
	);
}

export default App;
