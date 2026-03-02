'use client'

import Script from 'next/script'
import { RecaptchaResponse } from './types'
import { useState } from 'react'

declare global {
  interface Window {
    grecaptcha: {
      ready(callback: () => void): void
      execute(opt_widget_id?: number): Promise<void>
      execute(siteKey: string, action: { action: string }): Promise<string>
    }
  }
}

type Status = 'idle' | 'fetching' | 'error' | 'success'

const SITE_KEY = process.env.NEXT_PUBLIC_SITE_KEY as string

async function execute() {
  await new Promise<void>((resolve) => {
    window.grecaptcha.ready(() => resolve())
  })

  const token = await window.grecaptcha.execute(SITE_KEY, {
    action: 'submit',
  })

  const response = await fetch('/api/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  })

  const data = (await response.json()) as RecaptchaResponse

  return { data, status: response.status }
}

export default function HomePage() {
  const [status, setStatus] = useState<Status>('idle')
  const [data, setData] = useState<RecaptchaResponse | null>(null)

  async function onClick() {
    setStatus('fetching')
    setData(null)

    try {
      const { data, status } = await execute()
      setData(data)
      setStatus(status === 200 ? 'success' : 'error')
    } catch (error) {
      setStatus('error')
      console.error(error)
    }
  }

  return (
    <main className="fixed flex flex-col size-full items-center justify-center gap-8">
      <Script
        src="https://www.google.com/recaptcha/api.js?render=6LdAwXwsAAAAAGXavcnGzZ7osgOMY-ytOJZn6TBN"
        onLoad={() => {
          console.log('Script has loaded successfully!')
        }}
      />
      <button
        className="inline-flex items-center justify-center px-2 cursor-pointer bg-foreground text-background rounded hover:bg-foreground/90"
        disabled={status === 'fetching'}
        type="button"
        onClick={onClick}
      >
        {status === 'fetching' ? 'Verifying...' : 'Verify Recaptcha'}
      </button>

      <div>
        <h4 className="flex gap-2">
          <span>Result:</span>
          {status === 'success' && (
            <span className="text-lime-500">Success</span>
          )}
          {status === 'error' && <span className="text-red-500">Error</span>}
        </h4>

        <pre className="border border-foreground p-4 w-108">
          {data ? JSON.stringify(data, null, 2) : ''}
        </pre>
      </div>
    </main>
  )
}
