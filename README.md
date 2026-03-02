## Getting Started

### 1. Add environment variables

create `.env` file at the root of the project, copy paste `secret key` and `site key` onto the corresponding environment variable inside `.env` file:

```bash
# .env
# reCAPTCHA secret key
SECRET_KEY=????
# reCAPTCHA site key
NEXT_PUBLIC_SITE_KEY=????
```

### 2. Start docker compose services

```bash
docker compose up
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

<br>


## [Google reCAPTCHA](https://developers.google.com/recaptcha)

[official documentation](https://developers.google.com/recaptcha/intro)