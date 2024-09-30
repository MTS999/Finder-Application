import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import useGetNotifications from "../../hooks/useGetNotifications";
import { useNotificationContext } from "../../context/NotificationContext";
import useReadNotification from "../../hooks/useReadNotification";




const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function NotificationList() {

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  // const { loading } = useGetNotifications();

  const { notifications } = useNotificationContext();
  console.log(notifications);

  const {loading,readNotification }=useReadNotification()

  const handleClick = (id) => {
     
    readNotification(id)
  
  }
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          {/* <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Avatar with text and icon
          </Typography> */}

          <Demo>
            <List dense={dense}>
              {/* {generate( */}

              {notifications?.notifications.map((item) => (
                <ListItem onClick={()=>handleClick(item._id)}
                  key={item._id} // Add a unique key here
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.message}
                    secondary={secondary ? "Secondary text" : null}
                  />
                </ListItem>
              ))}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
