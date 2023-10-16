import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchProducts } from '@/store/slices/productSlice';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {Product} from "@prisma/client"
import SearchProducts from '@/components/searchProduct/SearchProducts';
import Products from '@/components/products/Products';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';

export default function Home() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((store) => store.product.items);
  const cartItems = useAppSelector((store) => store.cart.items)
  const [ filteredProducts , setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(fetchProducts())
  },[]);

  useEffect(() => {
    if(products.length > 0) {
      setFilteredProducts(products)
    }
  },[products])

  return (
    <Box sx={{display : "flex", flexDirection : "column", gap : "10px", padding : "20px"}}>
      <Box sx={{ display : "flex", justifyContent : "flex-end"}} >
        <Link href={"cart"} style={{textDecoration: "none", display : "flex"}}>
        <ShoppingCartIcon sx={{fontSize: "30px",color : "purple"}} />
        {cartItems.length > 0 && <Typography sx={{color : "green"}}>{cartItems.length}</Typography>}
        </Link>
      </Box>
      <SearchProducts products={products} setFilteredProducts={setFilteredProducts} />
      <Products filteredProducts={filteredProducts} />
    </Box>
  )
}
