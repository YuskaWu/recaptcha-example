import { NextRequest, NextResponse } from 'next/server'
import { RecaptchaResponse } from '../../types'

const SECRET_KEY = process.env.SECRET_KEY as string

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RecaptchaResponse>> {
  const { token } = (await request.json()) as { token: string }

  const headers = new Headers()
  headers.set('Accept', 'application/json')
  headers.set('Content-Type', 'application/x-www-form-urlencoded')

  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      body: `secret=${SECRET_KEY}&response=${token}`,
      headers,
    },
  )

  const data: RecaptchaResponse = await response.json()

  const isError = !response.ok || !data.success

  if (isError) {
    console.error('failed to verify recaptcha', data)
  }

  return NextResponse.json(data, { status: isError ? 400 : 200 })
}
