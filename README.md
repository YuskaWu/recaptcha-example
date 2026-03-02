This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Add environment variables

create `.env` file at the root of the project, copy paste `secret key` and `site key` onto the corresponding environment variable:

```bash
# .env
# reCAPTCHA secret key
SECRET_KEY=????
# reCAPTCHA site key
NEXT_PUBLIC_SITE_KEY=????
```

## [Google reCAPTCHA](https://developers.google.com/recaptcha)

[official documentation](https://developers.google.com/recaptcha/intro)