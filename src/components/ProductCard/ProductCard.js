import { useState } from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

function ProductCard({ dataSource }) {
  const [isFav, setIsFav] = useState(false);
  const { desc, price, createdOn, title, productImg, userName } = dataSource;
  const ProductTitle = <Typography fontWeight={"bold"}>{title}</Typography>;
  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: "0 0 20px gray",
        borderRadius: 2,
        height: 415,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            {userName.slice(0, 1)}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={ProductTitle}
        subheader={createdOn.toDate().toDateString()}
      />
      <CardMedia
        component="img"
        height="194"
        sx={{ objectFit: "contain" }}
        image={productImg}
        alt={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          onClick={() => setIsFav((prev) => !prev)}
          aria-label="add to favorites"
          color={isFav ? "error" : "black"}
        >
          <FavoriteIcon />
          <Typography pl={0.5}>{price}$</Typography>
        </IconButton>

        <Typography fontWeight={"bold"}>Added By {userName}</Typography>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
