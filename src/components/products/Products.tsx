import { Box } from "@mui/material";
import ProductCard from "../productCard/ProductCard";
import { Product } from "@prisma/client";

interface Props {
    filteredProducts : Product[];
}

const Products = ({filteredProducts} : Props) => {
    return (
      <Box sx={{display : "flex",gap : "10px", flexWrap : "wrap"}}>
        {filteredProducts.map((element) => <ProductCard key={element.id} product={element} /> )}
      </Box>
    )
}

export default Products;