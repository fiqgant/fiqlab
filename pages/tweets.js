import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import Tweet from '@/components/Tweet'
import { getTweets } from '@/lib/twitter'

export async function getStaticProps() {
  const tweets = await getTweets(['1002104154737684480'])

  return { props: { tweets } }
}

export default function Tweets({ tweets }) {
  return (
    <>
      <PageSEO
        title={`Tweets - ${siteMetadata.author}`}
        description="A collection of tweets that inspire me, make me laugh, and make me think."
      />
      <div className="mx-auto max-w-2xl">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Tweets
          </h1>
          <p className="text-md leading-7 text-gray-500 dark:text-gray-400">
            This is a collection of tweets I've enjoyed. so I wanted a place to publicly share what
            makes me laugh and makes me think.
          </p>
        </div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </div>
    </>
  )
}
