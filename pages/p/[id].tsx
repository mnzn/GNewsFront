import React from "react";
import ReactMarkdown from "react-markdown";
import { GetStaticProps, GetStaticPaths} from "next";
import Router from "next/router";
import Image from "next/image";
import Head from "next/head";
import Layout from "../../components/Layout";
import { PostProps } from "../../components/Post";
import prisma from '../../lib/prisma'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id) ,
    },
  });
  return {
    props: post,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
  });

  const pid = feed.map((post) => ({
    params: { id: post.id },
  }))

  return {
    paths: pid,
    fallback: false, // false or "blocking"
  }
};


const Post: React.FC<PostProps> = (props) => {
  let title = props.title_cn;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <div>
    <Head>
      <title>{props.title_cn}</title>
    </Head>
    <Layout><div className="max-w-4xl mx-auto dark:text-white">
      <div className="flex flex-col items-center py-4">
        <div><h1 className="font-bold">{title}</h1></div>
        <div><small>{new Date(Date.parse(props.time)).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</small></div>
      </div>
      {props.top_image && (<div className="float-right w-full sm:w-[400px] h-[200px] relative">
        <Image
          src={props.top_image}
          alt="top_image"
          placeholder = 'empty'
          fill={true}
          className="object-contain"
        />
      </div>)}
      <div>
        <ReactMarkdown children={props.text_cn} />
      </div>
    </div></Layout>
    </div>
  );
};

export default Post;
