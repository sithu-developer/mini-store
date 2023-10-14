// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/utils/db';
import type { NextApiRequest, NextApiResponse } from 'next'

const  handler =  async(req: NextApiRequest,res: NextApiResponse) => {
  const method = req.method;
  if (method === "GET") {
      const products = await prisma.product.findMany();
      return res.send(products);
  }
  res.status(400).send("invalid method");
}
export default handler;