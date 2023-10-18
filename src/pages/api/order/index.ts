// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CartItem } from '@/types/cart';
import { prisma } from '@/utils/db';
import { OrderStatus, Product } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const method = req.method;
  if (method === "POST") {
    const cartItems = req.body as CartItem[];
    const cartItemIds = cartItems.map(element => element.id);
    const products = await prisma.product.findMany({ where : { id : {in : cartItemIds} } });

    const getProductPriceWithQtn = (element : CartItem) => {
        const currentProduct = products.find(product => product.id === element.id) as Product
        return currentProduct?.price * element.quantity ;
    }

    let totalPrice = 0;
    cartItems.forEach(element => {
        const price = getProductPriceWithQtn(element);
        totalPrice += price ;
    });

    const createdOrder = await prisma.order.create({data : {totalPrice : totalPrice , status : OrderStatus.ORDERED}})
    const orderId = createdOrder.id;
    cartItems.forEach(async(item) => {
        const data = {orderId ,productId : item.id , quantity : item.quantity};
        await prisma.orderline.create({ data });
    });
    return res.send(createdOrder);
  } 
  res.send("Invalid Method")
}