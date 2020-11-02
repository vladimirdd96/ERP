input="../auth/endpoints.txt"
curl -X DELETE "$HOST":"$PORT"/service-endpoints/auth-service
while IFS= read -r endpoint || [[ -n "$endpoint" ]];
do
curl -X DELETE "$HOST":"$PORT"/api-endpoints/auth-"$endpoint"
curl -X DELETE "$HOST":"$PORT"/pipelines/auth-"$endpoint"
  echo "$endpoint"
done < "$input"