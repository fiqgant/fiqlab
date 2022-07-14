import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getCurrentlyReading } from '@/lib/goodreads'
import fetcher from 'lib/fetcher'
import useSWR from 'swr'

export async function getStaticProps() {
  const currentlyReading = await getCurrentlyReading({ limit: 1 })

  return { props: { currentlyReading } }
}
export default function Now() {
  var year = new Date().getFullYear()
  var month = new Date().getMonth()
  var date = new Date().getDate()
  var time = new Date().getTime()
  var hour = new Date().getHours()
  var minute = new Date().getMinutes()
  var second = new Date().getSeconds()

  var ParthBirthDate = '1997-03-07'
  var birthDate = new Date(ParthBirthDate)
  var ParthAge = year - birthDate.getFullYear()
  var ParthMonth = Math.abs(birthDate.getMonth() - month)
  var ParthDay = Math.abs(birthDate.getDate() - date)

  return (
    <>
      <PageSEO
        title={`Now - ${siteMetadata.author}`}
        description="Publication"
        url={siteMetadata.url}
      />
      <div>
        <div className="my-2">
          <h3>Publication</h3>
          <div className=" mt-4 mb-8 text-xs text-neutral-700 dark:text-neutral-400">
            This page was automatically updated @ {date}-{month}-{year} {hour}:{minute}:{second}
          </div>
        </div>
        {/* Misc */}
        <div className="flex justify-between">
          <div className="mt-2 mb-10 w-1/4 rounded-md border border-gray-600 p-1 text-sm dark:border-gray-200">
            <span className="ml-2 font-semibold">Location:</span> <span>Medan</span>
            <br />
            <span className="ml-2 font-semibold">Weather:</span> <span>31°C, extreme rain</span>
          </div>

          <div className="mt-2 mb-10 w-2/5 rounded-md border border-gray-600 p-1 text-sm dark:border-gray-200">
            <span className="ml-2 font-semibold">Reading:</span>{' '}
            <span>Moby Dick - Herman Melville</span>
            <br />
            <span className="ml-2 font-semibold">Age:</span>{' '}
            <span>
              {ParthAge} years, {ParthMonth} months and {ParthDay} days
            </span>
          </div>

          <div className="mt-2 mb-10 w-1/4 rounded-md border border-gray-600 p-1 text-sm dark:border-gray-200">
            <span className="ml-2 font-semibold">Eating:</span> <span>N/A</span>
            <br />
            <span className="ml-2 font-semibold">Drinking:</span> <span>Coffee</span>
          </div>
        </div>
        {/* Work */}
        <div className="pb-4">
          <span>
            <b>📖 Analysis of Model-Free Reinforcement Learning Algorithm for Target Tracking. </b>
            <i>
              Muhammad Fikry, Rizal Tjut Adek, Zulfhazli Zulfhazli, Subhan Hartanto, Taufiqurrahman,
              Dyah Ika Rinawati.
            </i>{' '}
            <Link
              href={'https://ejournal.upi.edu/index.php/COELITE/article/view/43795'}
              className="special-underline no-underline dark:text-gray-100 hover:dark:text-gray-100"
            >
              Journal of Computer Engineering, Electronics and Information Technology (COELITE){' '}
            </Link>
            <br />
          </span>
        </div>
        <div className="pb-4">
          <span>
            <b>
              📖 Analysis of Dimensional Reduction Effect on K-Nearest Neighbor Classification
              Method.
            </b>
            <i> Taufiqurrahman, Erna Budhiarti Nababan, Syahril Efendi.</i>{' '}
            <Link
              href={'https://jurnal.polgan.ac.id/index.php/sinkron/article/view/11234'}
              className="special-underline no-underline dark:text-gray-100 hover:dark:text-gray-100"
            >
              Sinkron : Jurnal dan Penelitian Teknik Informatika{' '}
            </Link>
            <br />
          </span>
        </div>
      </div>
    </>
  )
}
