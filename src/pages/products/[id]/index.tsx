import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const ProductDetailPage = () => {
  const router =  useRouter();
  const productId = Number(router.query.id);
  const products = useAppSelector((state) => state.product.items);
  const finedProduct = products.find((element) => element.id === productId);
  const dispatch = useAppDispatch();

  
    return (
      <Box sx={{maxWidth : 900,margin : "0 auto"}}>
        <Box sx={{display : "flex", justifyContent : "center",mt : "40px"}}>
          <Box sx={{maxWidth : 800, display : 'flex', gap: 5}}>
            <Box>
              <img src={finedProduct?.imageUrl || ""} width={500} style={{borderRadius: "10px"}}/>
            </Box>
            <Box sx={{display: "flex", flexDirection : "column", justifyContent:"center", gap: "15px"}}>
              <Typography variant="h4">{finedProduct?.title}</Typography>
              <Typography >{finedProduct?.description}</Typography>
              <Typography variant="h6">$ {finedProduct?.price}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{display : "flex", justifyContent : "flex-end", mr : 5}}>
          <Button variant="contained" sx={{bgcolor: "blueviolet"}} onClick={() => {
            dispatch(addToCart({...finedProduct, quantity : 1}));
            router.push("/");
          }}>Add to Card</Button>
        </Box>
      </Box>
    )
}

export default ProductDetailPage;