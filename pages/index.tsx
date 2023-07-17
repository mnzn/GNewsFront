import React, { useState } from "react";
import Link from 'next/link'
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import Sidebar from "../components/Sidebar";
import prisma from '../lib/prisma'

const POST_PER_PAGE: number = 50

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page_param = query.page || "1"
  const page = parseInt(page_param as string) < 0 ? 1 : parseInt(page_param as string)

  const total:number = await prisma.post.count({
    where: {
      published: true,
    },
  });
  //const total = parseInt(total_s as string)

  let feed = null;
  if(POST_PER_PAGE * (page-1) >= total) {
    feed = [];
  }else if (POST_PER_PAGE * page <= total) {
    feed = await prisma.post.findMany({
      skip: POST_PER_PAGE * (page-1),
      take: POST_PER_PAGE,
      where: {
        published: true,
      },
      orderBy: {
        id: "desc",
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
        id: "desc",
      },
    });
  }
  const has_next = POST_PER_PAGE*page < total
  const key = page

  const result = await prisma.post.findMany({
    take:1,
    where: {
      published: true,
    },
    select: {
      id: true,
    },
    orderBy: {
      id: 'desc',
    },
  });
  //console.log(result)
  const objId = result[0].id
  //console.log(objId)

  return {
    props: { feed,page,total,has_next,objId,key },
  };
};

type Props = {
  feed: PostProps[];
  page: number;
  total: number;
  has_next: boolean;
  objId: string;
  key: number;
};

const Blog: React.FC<Props> = (props) => {

  const [page, setPage] = useState(props.page);
  const [newFeed, setNewFeed] = useState([]);
  const handleClick = async() => {
    let gotfeed = null;
    try {
      const res = await fetch(`/api/post?page=${page+1}`)
      if (res.status !== 200) {
        throw new Error('Failed to fetch')
      }
      gotfeed = await res.json()
    } catch (err) {
      gotfeed = []
    }
    setNewFeed(a => [...a, ...gotfeed]);
    setPage(p => p+1);
  };

  return (
    <Layout>
      <div className="flex flex-row xl:gap-4">
        <div className="flex-auto w-auto">
          <main>
            {props.feed.map((post) => (
              <div key={post.id} className="shadow sm:shadow-none border sm:border-0 sm:border-b dark:border-0 dark:border-b rounded-md sm:rounded-none dark:rounded-none mb-2 sm:mb-0 bg-white dark:bg-gray-800 dark:text-white border-gray-100 dark:border-gray-700 transition-shadow ease-in duration-100 hover:bg-zinc-50 dark:hover:bg-gray-700">
                <Post post={post} />
              </div>
            ))}

            {newFeed.map((post) => (
              <div key={post.id} className="shadow sm:shadow-none border sm:border-0 sm:border-b dark:border-0 dark:border-b rounded-md sm:rounded-none dark:rounded-none mb-2 sm:mb-0 bg-white dark:bg-gray-800 dark:text-white border-gray-100 dark:border-gray-700 transition-shadow ease-in duration-100 hover:bg-zinc-50 dark:hover:bg-gray-700">
                <Post post={post} />
              </div>
            ))}
            {props.has_next && (<a className="hidden" href={"/?page=" + (props.page+1)}>Next Page</a>)}
            {(page*POST_PER_PAGE < props.total) && (<div className="mt-4 flex justify-center" ><button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 rounded shadow" onClick={handleClick}>Load More</button></div>)}
          </main>
        </div>
        <div className="hidden xl:block xl:w-80 xl:h-fit bg-white dark:bg-gray-800 dark:text-white shrink-0 shadow">
          <Sidebar total={props.total} objId={props.objId} />
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
