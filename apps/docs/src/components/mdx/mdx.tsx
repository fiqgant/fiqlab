import { type MDXComponents, MDXRemote } from '@tszhong0411/mdx'
import * as uiComponents from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { type Pluggable } from 'unified'

import 'katex/dist/katex.min.css'
import { rehypeComponentCode } from '@/lib/rehype-component-code'

import ComponentPreview from './component-preview'

type MdxProps = {
  content: string
} & React.ComponentPropsWithoutRef<'div'>

const components: MDXComponents = {
  ...uiComponents,
  ComponentPreview,
  pre: uiComponents.CodeBlock
}

const Mdx = (props: MdxProps) => {
  const { content, className, ...rest } = props

  return (
    <div className={cn('prose w-full', className)} {...rest}>
      <MDXRemote
        source={content}
        components={components}
        mdxOptions={{
          remarkPlugins: [remarkMath as unknown as Pluggable],
          rehypePlugins: [
            rehypeComponentCode as unknown as Pluggable,
            rehypeKatex as unknown as Pluggable
          ]
        }}
      />
    </div>
  )
}

export default Mdx
