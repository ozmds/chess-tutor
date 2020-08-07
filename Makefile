dev:
	docker-compose -f deployments/docker-compose.yml build
	docker-compose -f deployments/docker-compose.yml down -v
	docker-compose -f deployments/docker-compose.yml up -d --force-recreate

live:
	docker-compose -f deployments/docker-compose.prod.yml build
	docker-compose -f deployments/docker-compose.prod.yml down -v
	docker-compose -f deployments/docker-compose.prod.yml up -d --force-recreate
	docker tag deployments_ui gcr.io/minymal-chess/chessui
	docker tag deployments_app gcr.io/minymal-chess/chessapi
	docker push gcr.io/minymal-chess/chessui
	docker push gcr.io/minymal-chess/chessapi

deploy:
	gcloud run deploy chessapi --image gcr.io/minymal-chess/chessapi --platform managed --port 5000 --region us-east1
	gcloud run deploy chessui --image gcr.io/minymal-chess/chessui --platform managed --port 80 --region us-east1

firebase: 
	firebase deploy

list_running_containers:
	docker ps -a

list_all_images:
	docker image ls

remove_image: 
	docker rmi $(image)

remove_container:
	docker rm $(container)

remove_all_images:
	docker rmi $(docker images -q)

stop_all_containers:
	docker stop $(docker ps -a -q)

delete_all_stopped_containers:
	docker rm $(docker ps -a -q)