import { Loader2 } from 'lucide-react'

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <Loader2 className="w-16 h-16 animate-spin text-black" />
    </div>
  )
}

export default Loading
