import { HTMLAttributes } from 'react'

type PageHeaderProps = HTMLAttributes<HTMLDivElement>

export function PageHeader({ className, children, ...props }: PageHeaderProps) {
  return (
    <section
      className={`flex flex-col items-center gap-2 text-center ${className}`}
      {...props}
    >
      {children}
    </section>
  )
}

export function PageHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={`text-2xl font-semibold leading-tight md:text-3xl ${className}`}
      {...props}
    />
  )
}

export function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-sm text-muted-foreground md:text-base ${className}`}
      {...props}
    />
  )
} 