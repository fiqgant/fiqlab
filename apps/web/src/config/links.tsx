import {
  type IconType,
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiYoutube
} from '@icons-pack/react-simple-icons'
import {
  BarChartIcon,
  FlameIcon,
  MessageCircleIcon,
  MonitorIcon,
  PencilIcon,
  UserCircleIcon
} from 'lucide-react'

type HeaderLinks = Array<{
  icon: React.ReactNode
  href: string
  text: string
}>

type FooterLinks = Array<{
  id: number
  links: Array<{
    href: string
    text: string
  }>
}>

type SocialLinks = Array<{
  href: string
  title: string
  icon: IconType
}>

export const HEADER_LINKS: HeaderLinks = [
  {
    icon: <PencilIcon className='size-3.5' />,
    href: '/blog',
    text: 'Blog'
  },
  {
    icon: <MessageCircleIcon className='size-3.5' />,
    href: '/guestbook',
    text: 'Guestbook'
  },
  {
    icon: <BarChartIcon className='size-3.5' />,
    href: '/dashboard',
    text: 'Dashboard'
  },
  {
    icon: <FlameIcon className='size-3.5' />,
    href: '/projects',
    text: 'Projects'
  },
  {
    icon: <UserCircleIcon className='size-3.5' />,
    href: '/about',
    text: 'About'
  },
  {
    icon: <MonitorIcon className='size-3.5' />,
    href: '/uses',
    text: 'Uses'
  }
]

export const FOOTER_LINKS: FooterLinks = [
  {
    id: 1,
    links: [
      {
        href: '/',
        text: 'Home'
      },
      {
        href: '/blog',
        text: 'Blog'
      },
      {
        href: '/about',
        text: 'About'
      },
      {
        href: '/dashboard',
        text: 'Dashboard'
      }
    ]
  },
  {
    id: 2,
    links: [
      {
        href: '/guestbook',
        text: 'Guestbook'
      },
      {
        href: '/uses',
        text: 'Uses'
      },
      {
        href: '/projects',
        text: 'Projects'
      },
      {
        href: 'https://fiqgant.github.io/',
        text: 'Links'
      }
    ]
  },
  {
    id: 3,
    links: [
      {
        href: 'https://github.com/fiqgant',
        text: 'GitHub'
      },
      {
        href: 'https://www.instagram.com/tfqrrhmn/',
        text: 'Instagram'
      },
      {
        href: 'https://youtube.com/@fiqgant?si=ZqoMwGhidOixJKSw',
        text: 'YouTube'
      },
      {
        href: 'https://www.facebook.com/taufiqurrahman.mahmud?mibextid=LQQJ4d/',
        text: 'Facebook'
      }
    ]
  }
]

export const SOCIAL_LINKS: SocialLinks = [
  {
    href: 'https://github.com/fiqgant',
    title: 'GitHub',
    icon: SiGithub
  },
  {
    href: 'https://www.facebook.com/taufiqurrahman.mahmud?mibextid=LQQJ4d/',
    title: 'Facebook',
    icon: SiFacebook
  },
  {
    href: 'https://www.instagram.com/fiqgant/',
    title: 'Instagram',
    icon: SiInstagram
  },
  {
    href: 'https://www.linkedin.com/in/fiqgant?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    title: 'LinkedIn',
    icon: SiLinkedin
  },
  {
    href: 'https://youtube.com/@fiqgant?si=ZqoMwGhidOixJKSw',
    title: 'YouTube',
    icon: SiYoutube
  }
]
