import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export const Board = () => {

    const [state, setState] = useState("")
    const [data, setData] =  useState([])

    const handleChange = (e) => {
        const{name,value} =e.target

        setState({
            ...state,
            [name]:value,
    
        })
    }

  const postData = () => {
    axios.post("https://crimecheck-noticeboard.herokuapp.com/board",state).then((res) => {
    alert("Notice Added")
    window.location.reload()
    })
   
  }

  const getData = () => {
    axios.get("https://crimecheck-noticeboard.herokuapp.com/board").then((res) => {
        setData(res.data)
    })
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <>
    <Box
      component="form" sx={{'& > :not(style)': { m: 1, width: '25ch' }}} noValidate autoComplete="off">

      {/* <TextField id="outlined-basic" label="Submit a Notice" variant="outlined"  /> */}

      <TextField
          id="outlined-textarea"
          label="Submit a Notice"
          placeholder="Enter your Notice Here"
          multiline
          name='description'
          onChange={handleChange}
        />
    
    </Box>
    
      
      <Button variant="contained" onClick={postData}>Submit</Button>

    <div>

    {
      data.map((e) =><Box key={e._id}>
            
            <Box>{e.description}</Box>
            <Box>{e.createdAt}</Box>
            </Box> )
    }
    </div>


    </>
  );
}