import React, { useState, useEffect } from "react";
import prisma from '../lib/prisma';

const Sidebar: React.FC<{ total: number, objId: string }> = ({ total, objId }): JSX.Element  => {
    const [updateTime, setUpdateTime] = useState("")
    const [runTime, setRunTime] = useState("")
    useEffect(()=>{
      let minute = Math.round(((new Date().getTime()-parseInt(objId.substring(0, 8), 16)*1000)/(60*1000)))
      if(minute > 180) {
        const hour = Math.floor(minute/60)
        minute = minute%60
        setUpdateTime(hour + "小时" + minute)
      }else{
        setUpdateTime(minute.toString())
      }

      let day = Math.round(((new Date().getTime()-new Date(1688170140000).getTime())/(24*60*60*1000)))
      if(day > 365) {
        const year = Math.floor(day/365)
        day = day%365
        setRunTime(year + "年" + day)
      }else{
        setRunTime(day.toString())
      }
    },[])
    return (
      <div className="flex flex-col p-4 text-sm">
        <div className="border-b pb-2 text-zinc-400">
        <p>运行概况</p>
        </div>
        <div className="grid grid-cols-3 pt-2">
        <div className="justify-self-end pr-2 py-2 text-zinc-400">最近更新于</div><div className="col-span-2 py-2 font-bold">{updateTime}分钟前</div>
        <div className="justify-self-end pr-2 py-2 text-zinc-400">已运行</div><div className="col-span-2 py-2 font-bold">{runTime}天</div>
        <div className="justify-self-end pr-2 py-2 text-zinc-400">已收录新闻</div><div className="col-span-2 py-2 font-bold">{total}条</div>
        </div>
      </div>
    )
}

export default Sidebar;
