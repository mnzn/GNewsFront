import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


// GET /api/post
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  const POST_PER_PAGE: number = 50

  let feed = null;
  const page_param = req.query.page || "-1"

  const page = parseInt(page_param as string)
  if (page < 0) {
    feed = [];
    res.json(feed);
    return;
  }

  const total:number = await prisma.post.count({
    where: {
      published: true,
    },
  });
  //const total = parseInt(total_s as string)

  if (POST_PER_PAGE * (page-1) >= total) {
    feed = [];
    res.json(feed);
    return;
  }

  if (POST_PER_PAGE * page <= total) {
    feed = await prisma.post.findMany({
      skip: POST_PER_PAGE * (page-1),
      take: POST_PER_PAGE,
      where: {
        published: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }else {
    feed = await prisma.post.findMany({
      skip: POST_PER_PAGE * (page-1),
      take: total - POST_PER_PAGE * (page-1),
      where: {
        published: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  res.json(feed);
}
