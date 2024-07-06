'use client'

import { BlurImage } from '@tszhong0411/ui'
import { motion, useAnimate, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

import me from '~/images/me.png'

const variants = {
  initial: {
    y: 40,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1
  }
}

const GetInTouch = () => {
  const [scope, animate] = useAnimate()
  const cardsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardsRef, { once: true, margin: '-100px' })

  useEffect(() => {
    void animate(
      [
        ['#pointer', { left: 200, top: 60 }, { duration: 0 }],
        ['#javascript', { opacity: 1 }, { duration: 0.3 }],
        ['#pointer', { left: 50, top: 102 }, { at: '+0.5', duration: 0.5, ease: 'easeInOut' }],
        ['#javascript', { opacity: 0.4 }, { at: '-0.3', duration: 0.1 }],
        ['#ml', { opacity: 1 }, { duration: 0.3 }],
        ['#pointer', { left: 224, top: 170 }, { at: '+0.5', duration: 0.5, ease: 'easeInOut' }],
        ['#ml', { opacity: 0.4 }, { at: '-0.3', duration: 0.1 }],
        ['#iot', { opacity: 1 }, { duration: 0.3 }],
        ['#pointer', { left: 88, top: 198 }, { at: '+0.5', duration: 0.5, ease: 'easeInOut' }],
        ['#iot', { opacity: 0.4 }, { at: '-0.3', duration: 0.1 }],
        ['#ai', { opacity: 1 }, { duration: 0.3 }],
        ['#pointer', { left: 200, top: 60 }, { at: '+0.5', duration: 0.5, ease: 'easeInOut' }],
        ['#ai', { opacity: 0.4 }, { at: '-0.3', duration: 0.1 }]
      ],
      {
        repeat: Number.POSITIVE_INFINITY
      }
    )
  }, [animate])

  return (
    <motion.div
      className='shadow-feature-card dark:shadow-feature-card-dark relative rounded-xl p-1 backdrop-blur-lg'
      initial='initial'
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={cardsRef}
      transition={{
        duration: 0.5
      }}
    >
      <div className='flex flex-col gap-6 rounded-[11px] p-4 lg:p-6'>
        <div className='flex gap-12 max-md:flex-col'>
          <div className='relative size-64 max-md:mx-auto' ref={scope}>
            <BlurImage
              src={me}
              width={3975}
              height={3975}
              className='absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-[20px]'
              alt='Me sit in front of my desk and coding'
            />
            <div
              id='ai'
              className='absolute bottom-12 left-14 rounded-3xl border bg-gradient-to-b from-zinc-50 to-zinc-100 px-2 py-1.5 text-xs opacity-40 dark:from-zinc-800 dark:to-zinc-900'
            >
              AI
            </div>
            <div
              id='ml'
              className='absolute left-2 top-20 rounded-3xl border bg-gradient-to-b from-zinc-50 to-zinc-100 px-2 py-1.5 text-xs opacity-40 dark:from-zinc-800 dark:to-zinc-900'
            >
              ML
            </div>
            <div
              id='iot'
              className='absolute bottom-20 right-1 rounded-3xl border bg-gradient-to-b from-zinc-50 to-zinc-100 px-2 py-1.5 text-xs opacity-40 dark:from-zinc-800 dark:to-zinc-900'
            >
              IoT
            </div>
            <div
              id='javascript'
              className='absolute right-8 top-10 rounded-3xl border bg-gradient-to-b from-zinc-50 to-zinc-100 px-2 py-1.5 text-xs opacity-40 dark:from-zinc-800 dark:to-zinc-900'
            >
              Programming
            </div>

            <div id='pointer' className='absolute'>
              <svg
                width='16.8'
                height='18.2'
                viewBox='0 0 12 13'
                className='fill-blue-500'
                stroke='white'
                strokeWidth='1'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M12 5.50676L0 0L2.83818 13L6.30623 7.86537L12 5.50676V5.50676Z'
                />
              </svg>
              <span className='relative left-4 rounded-3xl bg-blue-500 px-2 py-0.5 text-xs text-white'>
                Fiq
              </span>
            </div>
          </div>

          <div className='flex flex-col justify-center px-4'>
            <p className='font-title mb-2 bg-gradient-to-r from-black to-black/70 bg-clip-text text-3xl font-bold text-transparent dark:from-zinc-100 dark:to-zinc-400'>
              Any questions about AI, ML, IoT, or Programming?
            </p>
            <p className='text-zinc-800 dark:text-zinc-300'>
              Feel free to reach out to me!{' '}
              <span className='text-muted-foreground'>I'm unavailable for collaboration.</span>
            </p>
            <div className='my-8 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0'>
              <a
                href='mailto:fiqgant@gmail.com'
                className='bg-email-button rounded-full px-4 py-2 text-sm text-white'
              >
                fiqgant@gmail.com
              </a>
              <a
                href='mailto:taufiq@wbi.ac.id'
                className='bg-email-button rounded-full px-4 py-2 text-sm text-white'
              >
                taufiq@wbi.ac.id
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default GetInTouch
