type AuthLayoutProps = {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col justify-center px-4">
      <div className="w-full max-w-xs mx-auto">{children}</div>
    </div>
  )
}
