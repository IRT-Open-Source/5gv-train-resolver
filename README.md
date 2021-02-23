| [![5G-VICTORI logo](doc/images/5g-victori-logo.png)](https://www.5g-victori-project.eu/) | This project has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No 857201. The European Commission assumes no responsibility for any content of this repository. | [![Acknowledgement: This project has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No 857201.](doc/images/eu-flag.jpg)](https://ec.europa.eu/programmes/horizon2020/en) |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |


# Train Resolver

Tells streaming clients from where they shall retrieve video stream segments.

## What is this?

The Train Resolver service is part of the [platform](https://gitlab.irt.de/5g-victori/platform) for media caching on trains. The Train Resolver is needed by [streaming client](https://gitlab.irt.de/5g-victori/sample-streaming-client) based on the [ARD-Player with the MCDN Add-on](https://gitlab.irt.de/5g-victori/platform#adaptations-specific-to-ard-mediathek). When the user requests the playback of a video the player will first query a resolution service for which host it shall address to retrieve the respective stream segments. The DNS on trains equipped with our system will be configured to redirect these requests to the Train Resolver. The Train Resolver will tell the player to request all video segments from the local [cache](https://gitlab.irt.de/5g-victori/cache) on the train.

## How does it work?

The service consits of an HTTP interface implemented in [`app.controller.ts`](src/app.controller.ts) which routes to a simple provider implemented in [`app.service.ts`](src/app.service.ts). The provder generates the body of the default repsonse of the HTTP interface, which will look like in this listing:

```json
{
  "cdns": [
    {
      "hostname": "http://<<original-CDN-hostname>>.cache.cache:8080",
      "weight": 1
    }
  ]
}
```

## Technologie used:

- [Nest.js](https://nestjs.com/)

## Install, build, run

**Note:** _Typically you would use the `up.sh` script from the [Platform](https://gitlab.irt.de/5g-victori/platform) project to install, build and run this service as part of a composite of docker services. Read on if you intend to run the service directly on your host system._

**Prerequestits**: Following software needs to be installed on your host machine in order to execute the subsequent steps.

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)

First, `git clone` this project and change into its root directory. Than run the following command to install its dependencies:

```bash
$ npm install
```

You can than run the service in three different modes.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

With following command you can build a [docker image](https://www.docker.com) for this service. But again, typically you use the startup script `up.sh` of the [Platform](https://gitlab.irt.de/5g-victori/platform) project to do the job.

```bash
$ DOCKER_BUILDKIT=1 docker build --ssh gitlab="$HOME/.ssh/<<your_private_key_name>>" -t train-resolver .
```

Replace `<<your_private_key_name>>` by the name of the private key used to authenticate at the repository.