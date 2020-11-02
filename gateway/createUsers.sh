#!/bin/sh

npm start &


echo "CONNECTING TO GATEWAY..."

while ! timeout 1 bash -c "echo > /dev/tcp/gateway/9876"; do sleep 1; done

echo "CREATING USERS..."
eg users create -p "username=admin" -p "firstname=admin" -p "lastname=admin"

echo "CREATING CREDENTIALS"
eg credentials create -t key-auth -c admin -p "keyId=adminKeyId" -p "keySecret=adminKeySecret"

echo "STARTING..."

exec "$@"
wait