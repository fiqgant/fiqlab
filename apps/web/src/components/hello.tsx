'use client'

import { useEffect } from 'react'

const Hello = () => {
  useEffect(() => {
    console.log(`
███████╗██╗ ██████╗
██╔════╝██║██╔═══ ██║
█████╗  ██║██║    ██║ 
██╔══╝  ██║██║    ██║ 
██║     ██║╚██████╗██║
╚═╝     ╚═╝ ╚═════╝ ██║

all credit goes to hong, thanks hong :)
`)
  }, [])

  return null
}

export default Hello
