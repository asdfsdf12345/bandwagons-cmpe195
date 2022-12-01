import React from 'react'
import Banner from '../components/Banner'
import MakePost from '../components/MakePost';
import Post from '../components/Post'
import { NavigationState } from "../NavigationContext";


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Homepage = () => {

  const {user, setAlert} = NavigationState();


  const [commentOpen, setCommentOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = () => () => {
    setCommentOpen(true);
  };

  const handleClose = () => {
    setCommentOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (commentOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [commentOpen]);

  if (user) {
    return (
      <>
        <div><MakePost/></div>
        <div><Post/></div> 
        <div>
        <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
        <Button onClick={handleClickOpen('body')}>scroll=body</Button>
        <Dialog
          open={commentOpen}
          onClose={handleClose}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
    Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                  )
                  .join('\n')}
              </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
        </div>
      </>
    )
  } else {
    return <div><Banner/></div>
  }
}

export default Homepage
