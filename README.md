## How to run server-side code

    npm install
    tsc
    npm start

## Running ng app locally

	ng server
	
	* Note.  In order for services to run locally, you must use a browser with disabled web security to ignore CORS.  
	* For Chrome in Windows, append the following parameters when initializing:
		* <path/to/chrome.exe> --user-data-dir="C:/Chrome dev session" --disable-web-security
    
## How to build and run in a docker container locally

Step 1. Install Docker and ensure the engine is running
Step 2. Run the commands or the commands listed in the scripts/run-container.sh file

