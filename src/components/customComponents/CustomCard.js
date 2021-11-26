import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';



export default function CustomCard({userName,userId,liked,userImage,image,likesNumber,drawingTitle,isOwner, handleFavorite,handleDelete,handleEdit}) {
 

  return (
    <Card sx={{ maxWidth: 345 }}>
        <Link to={`/users/${userId}`} style={{textDecoration:'none'}} >
            <CardHeader
                avatar={
                <Avatar alt={`${userName}-img`}  src={userImage} />
                    
                }
                title={drawingTitle}
                subheader={`Drawn By: ${userName}`}
            />
        </Link>
      
      <CardMedia
        component="img"
        image={image}
        alt={`${drawingTitle}-img`}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="like drawing" onClick={handleFavorite}>
          <FavoriteIcon  style={liked?{color:'#EC407A'}:{}} />{` ${likesNumber}`}
        </IconButton>
        {isOwner?
        <>
        <IconButton aria-label="edit" onClick={handleEdit}>
          <EditIcon sx={{color:'#FFA500'}} />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon sx={{color:'#EA0D25'}} />
        </IconButton>
        </>:''}
        
      </CardActions>
    
    </Card>
  );
}