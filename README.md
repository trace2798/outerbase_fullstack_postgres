# Summize: Next.js, Clerk, Outerbase

### This repo is for my submission for the Outerbase X Hashnode Hackathon which took place during Septembar 1 - Septembar 30, 2023

#### Hashnode article: [Share and Review books you love with "Summize"](https://shreyas-chaliha.hashnode.dev/share-and-review-books-you-love-with-summize) 

## Getting Started

### Either fork the repo or directly clone it

### Prerequisites

**Node version 16.8 or later  
**macOS, Windows (including WSL), and Linux are supported.

### To directly clone the repo

```shell
git clone https://github.com/trace2798/outerbase_fullstack_postgres.git
```
### Command
To make the application completely functioning you will need to have the values for the env mentioned below and the Commands as described in the article as mentioned above.

### Install packages

```shell
npm i
```

### Setup .env file

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

DATABASE_URL=FOR my application it is a postgres database from Supababse.

OUTERBASE_SECRET=
NEXT_PUBLIC_OUTERBASE_SECRET=
COHERE_API_KEY=
OPENAI_API_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
| `build`         | To build your application                |
| `start`         | Starts a production  instance of the app |


## For env value and functionality of this application I have wrote a very detailed article on [hashnode](https://shreyas-chaliha.hashnode.dev/share-your-milestones-and-memories-with-post-it)


Youtube Demo Link: [Post iT](https://www.youtube.com/watch?v=iXuKCdvHBLY)
