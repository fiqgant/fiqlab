'use client'

import { SiFacebook, SiGithub, SiInstagram, SiYoutube } from '@icons-pack/react-simple-icons'
import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@tszhong0411/ui'
import { CodeIcon, CommandIcon, LinkIcon, LogInIcon, LogOutIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { Fragment, useCallback, useEffect, useState } from 'react'

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { useSignInModalStore } from '@/stores/use-sign-in-modal-store'

type Groups = Array<{
  name: string
  actions: Array<{
    title: string
    icon: React.ReactNode
    onSelect: () => void | Promise<void>
  }>
}>

const CommandMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [copy] = useCopyToClipboard()
  const { status } = useSession()
  const { setOpen: setSignInModalOpen } = useSignInModalStore()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((value) => !value)
      }
    }

    document.addEventListener('keydown', down)

    return () => {
      document.removeEventListener('keydown', down)
    }
  }, [])

  const openLink = useCallback((url: string) => {
    setIsOpen(false)
    window.open(url, '_blank', 'noopener')
  }, [])

  const groups: Groups = [
    {
      name: 'Account',
      actions: [
        ...(status === 'authenticated'
          ? [
              {
                title: 'Sign out',
                icon: <LogOutIcon className='mr-3 size-4' />,
                onSelect: () => signOut()
              }
            ]
          : [
              {
                title: 'Sign in',
                icon: <LogInIcon className='mr-3 size-4' />,
                onSelect: () => {
                  setIsOpen(false)
                  setSignInModalOpen(true)
                }
              }
            ])
      ]
    },
    {
      name: 'General',
      actions: [
        {
          title: 'Copy Link',
          icon: <LinkIcon className='mr-3 size-4' />,
          onSelect: async () => {
            setIsOpen(false)

            await copy({ text: window.location.href })
          }
        },
        {
          title: 'Source code',
          icon: <CodeIcon className='mr-3 size-4' />,
          onSelect: () => {
            openLink('https://github.com/fiqgant/fiqlab')
          }
        }
      ]
    },
    {
      name: 'Social',
      actions: [
        {
          title: 'GitHub',
          icon: <SiGithub className='mr-3 size-4' />,
          onSelect: () => {
            openLink('https://github.com/fiqgant')
          }
        },
        {
          title: 'Facebook',
          icon: <SiFacebook className='mr-3 size-4' />,
          onSelect: () => {
            openLink('https://www.facebook.com/taufiqurrahman.mahmud?mibextid=LQQJ4d/')
          }
        },
        {
          title: 'Instagram',
          icon: <SiInstagram className='mr-3 size-4' />,
          onSelect: () => {
            openLink('https://instagram.com/fiqgant/')
          }
        },
        {
          title: 'YouTube',
          icon: <SiYoutube className='mr-3 size-4' />,
          onSelect: () => {
            openLink('https://youtube.com/@fiqgant?si=ZqoMwGhidOixJKSw')
          }
        }
      ]
    }
  ]

  return (
    <>
      <Button
        variant='ghost'
        className='size-9 p-0'
        onClick={() => {
          setIsOpen(true)
        }}
        type='button'
        aria-label='Open command menu'
      >
        <span className='sr-only'>Open command menu</span>
        <CommandIcon className='size-4' />
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder='Type a command or search' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {groups.map((group, i) => (
            <Fragment key={group.name}>
              <CommandGroup heading={group.name}>
                {group.actions.map((action) => (
                  <CommandItem key={action.title} onSelect={action.onSelect}>
                    {action.icon}
                    {action.title}
                  </CommandItem>
                ))}
              </CommandGroup>
              {i === groups.length - 1 ? null : <CommandSeparator />}
            </Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default CommandMenu
