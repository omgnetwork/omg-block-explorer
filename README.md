
# omg-block-explorer

  a mysterious place where you can see transactions data.
  
## Development

Simply run `npm install` to install dependencies

Create `.env` file in root folder with `WATCHER_URL` value

  example of .env file

```text
WATCHER_URL=http://watcher-staging.omg.network
```

After that run `npm dev` the app will be serve on default url `localhost:3000`

if you don't want to create .env file, just run `WATCHER_URL=http://watcher-staging.omg.network npm run dev`

## Production

Run `npm build` will create production js files that will be in `.next` folder, then simply run `NODE_ENV=production node ./server` to start the production app`

tdlr; run `WATCHER_URL=xxxxxxx npm run build-start` which take care everything on production setting for you if you do not have `.env` file or if you have one just run `npm run build-start`.

the production app will serve on port `3000`