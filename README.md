# Homebase

![Node.js CI](https://github.com/paulmj7/homebase/workflows/Node.js%20CI/badge.svg)

Homebase is a distributed file storage system web app that interacts with [Hermes](https://github.com/paulmj7/hermes) workers.

## Installation

Using Node.js

```bash
yarn install
```

Initialize the database

```bash
node tableSetup.js
```

## Usage

Build with yarn

```bash
yarn build
```

Run with yarn

```bash
yarn start ## or node server.js
```

The web app can be accessed at http://localhost:3000

The current features built include:
- File download and upload
- Drag and drop folders and files to move them between directories
- Create new folders

## Connecting to a Hermes Worker

Run an instance of a Hermes worker on a different port. Then all you need to do is log in to the front-end and click "Add Worker". Homebase will remember the URL of the worker for you!

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://github.com/paulmj7/homebase/blob/master/LICENSE)
