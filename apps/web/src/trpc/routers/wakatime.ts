import { env } from '@tszhong0411/env'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const wakatimeRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const res = await fetch('https://wakatime.com/api/v1/users/current/all_time_since_today', {
      headers: {
        Authorization: `Basic ${Buffer.from(env.WAKATIME_API_KEY).toString('base64')}`
      }
    })

    const {
      data: { total_seconds }
    } = await res.json()

    return {
      seconds: total_seconds as number
    }
  })
})
