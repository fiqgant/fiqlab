import { allBlogPosts } from 'mdx/generated'
import type { Metadata, ResolvingMetadata } from 'next'

import FilteredPosts from '@/components/filtered-posts'
import PageTitle from '@/components/page-title'

const title = 'Blog'
const description =
  'My personal website and blog where I share my thoughts on various topics, including tutorials, notes, and personal experiences. Explore my site to learn more about my journey and discover some of what I have learned.'

type PageProps = {
  params: Record<string, never>
  searchParams: Record<string, never>
}

export const generateMetadata = async (
  _: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const previousOpenGraph = (await parent).openGraph ?? {}
  const previousTwitter = (await parent).twitter ?? {}

  return {
    title,
    description,
    alternates: {
      canonical: '/blog'
    },
    openGraph: {
      ...previousOpenGraph,
      url: '/blog',
      title,
      description
    },
    twitter: {
      ...previousTwitter,
      title,
      description
    }
  }
}

const Page = () => {
  const posts = allBlogPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <>
      <PageTitle title={title} description={description} />
      <FilteredPosts posts={posts} />
    </>
  )
}

export default Page
