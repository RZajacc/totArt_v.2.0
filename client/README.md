# Client

Next.js application utilizing both SSR, but also CSR depending on the component. 

### Project requirements:

Create .env.local file and store there 2 variables:

`API_URL_SERVER=http://localhost:5000`
`NEXT_PUBLIC_API_URL=http://localhost:5000`

To run the application locally it is important that they are both same. 
If you run it with docker-compose, first value will be overwritten by service name:

`Backend:5000`

While running SSR components in docker you need to allow container to container communication, meaning you need to use network created by docker. However it is not required for local development, therefore here both values should remain same.

In utils you might notice the function buildFetchURL which holds also:

`NEXT_PUBLIC_REMOTE_API_URL`

This one is for deployment purposes only and thus can be ignored. 

To install all dependencies use a command:

`npm i`

To run the app use command:

`npm run dev`

And for this part of the app that would be all. Server side requires a bit more setup. For more information follow the corresponding readme file.
