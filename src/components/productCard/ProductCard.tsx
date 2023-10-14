import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material"
import {Product} from "@prisma/client"

interface Props {
    product : Product
}

const ProductCard = ({product} : Props) => {
    return (
        <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          sx={{ height: 120 }}
          image={product.imageUrl || ""}
          title={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
      </Card>
    )
}

export default ProductCard;