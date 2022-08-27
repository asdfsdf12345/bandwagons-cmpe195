import React from 'react'
import Button from '@material-ui/core/Button'
import TemporaryDrawer from '../components/ProfileDrawer'
import BasicTextFields from '../components/TextField'

const ProfilePage = () => {
  return (
    <>
      <div id = "button2">
      <Button 
      variant="contained">{TemporaryDrawer()}
      </Button>
      </div>
      <div>
        I love Bandwagons
      </div>
      <>
      <BasicTextFields/>
      </>
    </>

  )
}

export default ProfilePage
