input="../marketing/endpoints.txt"
curl -X DELETE "$HOST":"$PORT"/service-endpoints/marketing-service
while IFS= read -r endpoint || [[ -n "$endpoint" ]];
do
curl -X DELETE "$HOST":"$PORT"/api-endpoints/marketing-"$endpoint"
curl -X DELETE "$HOST":"$PORT"/pipelines/marketing-"$endpoint"
  echo "$endpoint"
done < "$input"