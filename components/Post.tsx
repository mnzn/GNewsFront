import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";

import linkButtonImg from '../public/news_resource/icons/link.png'
export type PostProps = {
  id: number;
  figure?: string;
  published: boolean;
  title: string;
  title_cn: string;
  icon: string;
  time: string;
  top_image?: string;
  summary: string;
  text: string;
  text_cn: string;
  url: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  return (
    <div className="p-2 sm:p-4 sm:gap-4 sm:flex sm:flex-row">
      {post.figure && (<div className="w-full h-fit sm:shrink-0 sm:w-[196px] sm:h-[117.6px] relative">
        <Link
          href={{
            pathname: '/p/[id]',
            query: { id: post.id },
          }}
        >
        <Image
          src={post.figure}
	  alt="figure"
          sizes="100vw"
          width={0}
          height={0}
          style={{ width: '100%', height: 'auto' }}
          priority={true}
          placeholder = 'empty'
          className="object-cover"
        />
        </Link>
        <div className="absolute show sm:hide top-0 w-full h-[35px] bg-amber-500/80">
        <div className="absolute left-2 top-1"><small>{new Date(Date.parse(post.time)).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</small></div>
        <div className="absolute right-4 top-2"><a href={post.url} target="_blank">
          <Image
            src={linkButtonImg}
            alt="Reference"
            width={20}
            height={20}
            priority={false}
          />
        </a></div>
        </div>
      </div> )}
      <div className="flex-auto flex-col relative">
        <div className="py-2 sm:py-0">
        <Link
          href={{
            pathname: '/p/[id]',
            query: { id: post.id },
          }}
        >
        <h2 className="font-bold">{post.title_cn}</h2>
        </Link>
        </div>
        <div className="h-[14px] w-[120px] relative">
        <Image
          src={post.icon}
	  alt={post.icon}
          fill={true}
          priority={false}
          className="object-left object-contain"
        />
        </div>
        <div className="py-1"><ReactMarkdown className="prose prose-p:text-gray-400 prose-p:line-clamp-3 prose-p:text-xs dark:prose-invert" children={post.summary} /></div>
        <div className="w-full mt-4">
        <small className="absolute hide sm:show sm:bottom-0 sm:left-0">{new Date(Date.parse(post.time)).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}</small>
        <a className="absolute hide sm:show sm:bottom-0 sm:right-0" href={post.url} target="_blank">
          <Image
            src={linkButtonImg}
            alt="Reference"
            width={20}
            height={20}
            priority={false}
          />
        </a>
        </div>
      </div>
    </div>
  );
};

export default Post;
