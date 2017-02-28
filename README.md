## How to run

    npm install
    tsc
    npm start
    
## How to build and deploy on GCE

In order for the api to interact with GCE's Datastore document db, you must authenticate against their api's. Here's how to get setup:

1. Go [here](https://cloud.google.com/sdk/downloads) and download/install the appropriate sdk for your operating system.
2. Once successfully installed, run the following command to authenticate

    gcloud auth application-default login

3. You're all set! you can run the app and test google api integrations.
4. ???