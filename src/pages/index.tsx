import ProductCard from '@/components/productCard/ProductCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchProducts } from '@/store/slices/productSlice';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';


export default function Home() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((store) => store.product.items)
  console.log(products)
  useEffect(() => {
    dispatch(fetchProducts())
  },[]);
  return (
    <Box sx={{display : "flex",gap : "10px", flexWrap : "wrap"}}>
      {products.map((element) => <ProductCard key={element.id} product={element} /> )}
    </Box>
  )
}
