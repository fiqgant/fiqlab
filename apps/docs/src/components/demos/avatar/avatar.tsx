import { Avatar, AvatarFallback, AvatarImage } from '@tszhong0411/ui'

const AvatarDemo = () => {
  return (
    <Avatar>
      <AvatarImage src='https://github.com/fiqgant' alt='fiqgant' />
      <AvatarFallback>TH</AvatarFallback>
    </Avatar>
  )
}

export default AvatarDemo
