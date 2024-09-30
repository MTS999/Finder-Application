import React from 'react'
import {Typography,Box} from '@mui/material'
import { useAuthContext } from '../../context/AuthContext'


const Message = ({message}) => {

  const {authUser}=   useAuthContext()
  return (
    <Box textAlign={ authUser.data._id== message.senderId?"right":"left"}>

    <Typography variant="body1" color="initial">{message.message}</Typography>

    </Box>
  )
}

export default Message