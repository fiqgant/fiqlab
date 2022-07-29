const siteMetadata = {
  title: 'fiqlab',
  author: 'Taufiqurrahman',
  headerTitle: 'fiqlab',
  description: 'my personal blog where I share my work, article, etc',
  snippets: 'Reuseable code snippets collected by fiq',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://fiqlab.dev',
  siteRepo: 'https://github.com/fiqgant/fiqlab',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'fiqgant@gmail.com',
  github: 'https://github.com/fiqgant',
  twitter: 'https://twitter.com/fiqgant',
  linkedin: 'https://www.linkedin.com/in/fiqgant/',
  website: 'https://fiqlab.dev',
  locale: 'id-ID',
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports plausible, simpleAnalytics, umami or googleAnalytics
    plausibleDataDomain: 'fiqlab.dev', // e.g. tailwind-nextjs-starter-blog.vercel.app
    simpleAnalytics: false, // true or false
    umamiWebsiteId: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    googleAnalyticsId: 'G-ZEYZTLH0MZ', // e.g. UA-000000-2 or G-XXXXXXX
  },
  newsletter: {
    provider: 'emailOctopus',
  },
  comment: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      inputPosition: 'bottom',
      lang: 'en',
      darkTheme: 'dark',
      themeURL: '',
    },
  },
  socialAccount: {
    instagram: 'tfqrrhmn',
  },
}

module.exports = siteMetadata
