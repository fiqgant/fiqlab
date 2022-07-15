import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import Tweet from '@/components/Tweet'
import { getTweets } from '@/lib/twitter'

export async function getStaticProps() {
  const tweets = await getTweets([
    '1507008244014755857',
    '1507223367123812358',
    '1510141929782222850',
    '1506772765654884354',
    '1501721174425939968',
    '1498812064772489216',
    '1497284684144857092',
  ])

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
            This is a collection of tweets I've enjoyed. I use Twitter quite a bit, so I wanted a
            place to publicly share what inspires me, makes me laugh, and makes me think.
          </p>
        </div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </div>
    </>
  )
}
