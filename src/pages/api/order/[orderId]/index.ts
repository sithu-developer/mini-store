// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/utils/db';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const method = req.method;
    if (method === "DELETE") {
        const query = req.query;
        const orderId = Number(query.orderId);
        if(!orderId) return res.status(400).send("Bad request");
        const isFound = await prisma.order.findFirst({where : {id : orderId}});
        if (!isFound) return res.status(400).send("Bad request2");
        await prisma.orderline.deleteMany({where : { orderId }});
        await prisma.order.deleteMany({where : {id : orderId}})
        return res.send("OK");
    }
    res.status(405).send("Invalid method")
}
