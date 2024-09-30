import React from 'react'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import useLogout from '../hooks/useLogout'


const Navbar = () => {

    const {loading,logout}=useLogout();

    const handleClick = () => {
        logout();
      }
  return (
    <>
     <Container maxWidth="lg" sx={{height:"50px",backgroundColor:"yellow"}}>
       <Button variant="contained" color="primary" onClick={handleClick}>
          Logout
       </Button>
     </Container>
    
    
    </>
  )
}

export default Navbar