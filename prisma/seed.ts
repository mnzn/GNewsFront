import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const postData: Prisma.PostCreateInput[] = [
  {
          title: 'Join the Prisma Slack',
          figure: '/news_resource/xxx.webp',
          published: true,
          title_cn: 'xxxxx',
          icon: 'xxxxx',
          time: 'xxxxx',
          top_image: 'xxxxx',
          summary: 'xxxxx',
          text: 'xxxxx',
          text_cn: 'xxxxx',
          url: 'xxxxx',
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const p of postData) {
    const post = await prisma.post.create({
      data: p,
    })
    console.log(`Created post with id: ${post.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
