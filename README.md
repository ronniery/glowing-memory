# Glowing Memory

This frontend application provides users with the ability to manage created tickets, including features for creating, updating, and listing tickets. The application is designed to be mobile-friendly by default, ensuring a seamless user experience across various mobile devices and screen sizes. With its responsive design and adaptive layout, users can easily access and interact with the ticket management features on their smartphones or tablets. The mobile-friendly nature of the application allows users to conveniently perform ticket-related tasks while on the go, providing flexibility and accessibility for efficient ticket management anytime, anywhere.

## Getting Started

These instructions will give you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on deploying the project on a live system.

### Prerequisites

Requirements for the software and other tools to build, test and push:

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Node.js](https://nodejs.org/en/download)

### Installing

If you don't want any headache configuring things, copy the following command below, and wait until the install process ends:

```
  curl -k -o- https://raw.githubusercontent.com/ronniery/glowing-memory/master/install.sh | bash
```

However, if you want something more "hands-on" here is what you're looking for:

1. Checkout project locally
2. Go inside the created folder `glowing-memory`, then run `npm install`
3. If you want to run it locally:
   - Run the command `PORT=46001 npm run start`. If you run this command, make sure you have an instance of the ticket microservice running in background [ronniery/solid-sniffle](https://github.com/ronniery/solid-sniffle)
   - Run the command `PORT=46001 npm run start:dev`. If you **don't want to set up** the ticket microservice, a bash script will take care of it for you.
4. If you want to run tests, run the command `npm run test`
5. If you want to run docker locally:
   - Run inside the project folder `docker build -t rbcorrea/glowing-memory .` to build the docker image locally
   - Wait for the process finish, and then you can run `docker run -d -p 46001:46001 rbcorrea/glowing-memory` to spin up a container using the previous image

# Useful URLS

- http://localhost:46001/ - SPA application, open it and use it.

### Design, choices, and assumptions

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For the frontend application, I used what the React framework has to offer for us, I tried to isolate the generic components in a specific folder, and putting together all other interdependent parts, with that way we could import a single file that was compound by some small pieces, that could be used later somewhere else.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; As a consequence of that application chattering, I had to create a cross-shared state, the best way to achieve it without installing any extra state manager, was thought the React.ContextAPI + React.Hooks, inside the ContextAPI, we have all service calls wrapped in a single interface that can be used across the entire application, centralizing the service consumption; Later, I was sharing the available tickets inside that context, letting the other parts that depend on it, react when the number of tickets change, as a handfull addition I've created a hook to make it easier to consume the Context, without to import some extra dependencies to load the context.
