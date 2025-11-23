'use client'

import { useTransition } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { Globe } from 'lucide-react'

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = () => {
    const newLocale = currentLocale === 'bn' ? 'en' : 'bn'
    
    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`
      router.refresh()
    })
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLanguage}
      disabled={isPending}
      className="flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      <span className="font-semibold">{currentLocale === 'bn' ? 'EN' : 'বাং'}</span>
    </Button>
  )
}
