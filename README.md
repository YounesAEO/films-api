## nodejs project template

A simple express, mongodb with mongoose project template.

##### 1/ Start with cloning the project:

`$ git clone https://github.com/startup-square/express-mongoose-template.git my-api`

`$ cd my-api`

##### 2/ Create a .env file in the main folder

`$ touch .env`

It should contain at least two config strings:

```
PORT=3000
DATABASE_URL=mongodb://localhost:27017/my-api-db
```

##### 3/ Start developing:

start the server with `$ npm run dev`.

##### 4/ Push changes to your project repository:

Change the remote url first:

`$ git remote set-url origin https://github.com/startup-square/my-api-repo.git`

Then you can push changes to the _main_ branch or any branch you're working on.

`$ git push -u origin main`

### <center>⛔️ NEVER PUSH TO THIS REPO ⛔️</center>
