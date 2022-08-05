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

export default function Now(currentlyReading) {
  const { data } = useSWR('/api/now-playing', fetcher)
  let currentlyReadingData = currentlyReading['currentlyReading']

  var year = new Date().getFullYear()
  var month = new Date().getMonth()
  var date = new Date().getDate()
  var time = new Date().getTime()
  var hour = new Date().getHours()
  var minute = new Date().getMinutes()
  var second = new Date().getSeconds()

  var FiqBirthDate = '2000-04-16'
  var birthDate = new Date(FiqBirthDate)

  var FiqAge = year - birthDate.getFullYear()

  var FiqMonth = 0
  if (month >= birthDate.getMonth()) FiqMonth = month - birthDate.getMonth()
  else {
    FiqAge--
    FiqMonth = 12 + month - birthDate.getMonth()
  }

  var FiqDay = 0
  if (date >= birthDate.getDate()) FiqDay = date - birthDate.getDate()
  else {
    FiqMonth--
    FiqDay = 31 + date - birthDate.getDate()
    if (FiqMonth < 0) {
      FiqMonth = 11
      FiqAge--
    }
  }

  var age = {}
  age = {
    years: FiqAge,
    months: FiqMonth,
    days: FiqDay,
  }

  var ageString = ''
  if (age.years > 0 && age.months > 0 && age.days > 0)
    ageString = age.years + ' years, ' + age.months + ' months, and ' + age.days + ' days old.'
  else if (age.years == 0 && age.months == 0 && age.days > 0)
    ageString = 'Only ' + age.days + ' days old!'
  else if (age.years > 0 && age.months == 0 && age.days == 0)
    ageString = age.years + ' years old. Happy Birthday!!'
  else if (age.years > 0 && age.months > 0 && age.days == 0)
    ageString = age.years + ' years and ' + age.months + ' months old.'
  else if (age.years == 0 && age.months > 0 && age.days > 0)
    ageString = age.months + ' months and ' + age.days + ' days old.'
  else if (age.years > 0 && age.months == 0 && age.days > 0)
    ageString = age.years + ' years, and' + age.days + ' days old.'
  else if (age.years == 0 && age.months > 0 && age.days == 0)
    ageString = age.months + ' months old.'
  else ageString = "Welcome to Earth! <br> It's first day on Earth!"

  return (
    <>
      <PageSEO
        title={`Now - ${siteMetadata.author}`}
        description="My publication"
        url={siteMetadata.url}
      />
      <div>
        <div className="my-2">
          <h3>This is a few of my publication</h3>
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
            <a
              href={currentlyReadingData[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <span>{currentlyReadingData[0].title}</span> by{' '}
              <span>{currentlyReadingData[0].author}</span>
            </a>
            <br />
            <span className="ml-2 font-semibold">Age:</span> <span>{ageString}</span>
          </div>

          <div className="mt-2 mb-10 w-1/4 rounded-md border border-gray-600 p-1 text-sm dark:border-gray-200">
            <span className="ml-2 font-semibold">Listening:</span>{' '}
            <span>
              {data?.songUrl ? (
                <a
                  href={data.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  <span>{data.title}</span>
                </a>
              ) : (
                <span>Not Playing</span>
              )}
            </span>
            <br />
            <span className="ml-2 font-semibold">Drinking:</span> <span>Coffee</span>
          </div>
        </div>
        {/* Work */}
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          🎓 Master's Thesis
        </h1>
        <br></br>
        <div className="pb-4">
          <span>
            <b>
              📖 Linear Discriminant Analysis (LDA) On K-Nearest Neighbour (KNN) Algorithm For
              Attribute Reduction.
            </b>{' '}
            <Link
              href={
                'https://repositori.usu.ac.id/bitstream/handle/123456789/47191/187038052.pdf?sequence=1&isAllowed=y'
              }
              className="special-underline no-underline dark:text-gray-100 hover:dark:text-gray-100"
            >
              Pdf in Indonesian{' '}
            </Link>
            <br />
          </span>
        </div>
        <br></br>
        <br></br>
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          ✒️ Journal
        </h1>
        <br></br>
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
