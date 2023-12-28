max_attempts=30
attempt_counter=0

echo "Polling for deployment status"

while [[ $attempt_counter -lt $max_attempts ]]
do

response=$( curl -s -o -w "%{http_code}" -H "Authorization: Bearer ${{ secrets.SECURE_PAYLOAD }}" "${{ secrets.RAILWAY_WEBHOOK_PROXY }}?name=${{ github.event.pusher.name }}"  )

# Separate the response body and the status code
http_code="${response:(-3)}"
response_body="${response:0:${#response}-3}"

if [[ $http_code != 200  ]]; then
    echo $http_code
fi 

echo Deployment Status $response_body

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
