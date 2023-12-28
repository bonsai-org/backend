#!/bin/bash

max_attempts=40
attempt_counter=0

echo "Polling for deployment status"

deploy() {
    cd ../../
    RAILWAY_TOKEN=$RAILWAY_TOKEN railway up --service back-end 1> /dev/null
    cd ./.github/scripts
}

deploy & 

while [[ $attempt_counter -lt $max_attempts ]]
do

    response=$( curl -s -o - -w "%{http_code}" -H "Authorization: Bearer $AUTH_SECRET" "$SERVER_URL?name=$NAME"  )


    # Separate the response body and the status code
    http_code="${response:(-3)}"
    response_body="${response:0:${#response}-3}"

    echo 
    echo

    if [[ $http_code != 200  ]]; then
        echo $http_code
    fi 

    is_deployed=$(echo $response_body | jq -r '.isDeployed')

    if [[ $is_deployed == 'DEPLOYING' ]]; then 
        echo "DEPLOYING" 
    fi 

    if [[ $is_deployed == 'SUCCESS' ]] ; then 
        echo "SUCCESS"
        exit 0 
    fi 

    if [[ $is_deployed == 'FAILED' ]] ; then 
        echo "FAILED" 
        exit 1 
    fi 

    attempt_counter=$((attempt_counter + 1))
    echo Poll Attempt $attempt_counter
    echo Trying again in 10 seconds...
    sleep 10
done

echo "Polling Timed Out"
exit 1

