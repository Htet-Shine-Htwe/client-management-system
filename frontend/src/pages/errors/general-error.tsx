
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface GeneralErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  minimal?: boolean
}

export default function GeneralError({
  className,
  minimal = false,
}: GeneralErrorProps) {
  return (
    <div className={cn('h-svh w-full', className)}>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        {!minimal && (
          <h1 className='text-[7rem] font-bold leading-tight'>500</h1>
        )}
        <span className='font-medium'>Oops! Something went wrong {`:')`}</span>
        <p className='text-center text-muted-foreground'>
          We apologize for the inconvenience. <br /> Please try again later.
        </p>

        <Button
        onClick={() => window.location.reload()}
        >
           Try Reload Page
        </Button>
        
      </div>
    </div>
  )
}