import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@tszhong0411/ui'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

const ThemeToggle = () => {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='size-9 p-0' type='button' aria-label='Toggle theme'>
          <span className='sr-only'>Toggle theme</span>
          <SunIcon className='size-4 dark:hidden' />
          <MoonIcon className='hidden size-4 dark:block' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          className='gap-2'
          onClick={() => {
            setTheme('light')
          }}
        >
          <SunIcon className='size-[18px]' /> Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className='gap-2'
          onClick={() => {
            setTheme('dark')
          }}
        >
          <MoonIcon className='size-[18px]' /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className='gap-2'
          onClick={() => {
            setTheme('system')
          }}
        >
          <MonitorIcon className='size-[18px]' /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeToggle
