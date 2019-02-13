
# omg-block-explorer

  a mysterious place where you can see transactions data.
  
## Development

Simply run `yarn install` to install dependencies 

Create `.env` file in root folder with `WATCHER_URL` value

  example of .env file

```text
WATCHER_URL=http://watcher-staging.omg.network
```

After that run `yarn dev` the app will be serve on default url `localhost:3000`

## Production

Run `yarn build` will create a node js server in `.next` folder
