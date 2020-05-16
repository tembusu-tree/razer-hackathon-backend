## Pre-requisites

Get yarn for [all platforms](https://yarnpkg.com/getting-started/install).

## Before you start
### Install dependencies
```
$ yarn install
```
### Start mongoDB locally
1. Install MongoDB if you haven't
    Mac: https://zellwk.com/blog/install-mongodb
    Windows: https://treehouse.github.io/installation-guides/windows/mongo-windows.html
2. Check if mongo is installed
```
$ mongo --version
```
3. Start mongo and create db
```
$ mongo //start mongodb shell
> use razer-hackathon // create database with name razer-hackathon
> ^C // exit mongo shell

brew services run mongodb-community //run mongoDB as background service
```
## How to run project

```
$ yarn start
```

Check out http://localhost:3000/

## How to serve production build

```
$ yarn serve-prod
```
To check if your server is up:
http://localhost:3000/ping should see pong on browser
