export type RecaptchaResponse =
  | { success: false; 'error-codes': string[] }
  | {
      success: true
      challenge_ts: string // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
      hostname: string // the hostname of the site where the reCAPTCHA was solved
      score: number // 0 ~ 1, based on the interactions with the reCAPTCHA and their behavior patterns. The closer to 1.0, the more likely the interaction is legitimate.
      action: string // the action that was performed
    }

export type RecaptchaPayload = {
  secret: string
  response: string
  remoteip?: string
}
