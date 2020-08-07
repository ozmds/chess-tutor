## Composes project using docker-compose
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

## projectID.web.app/helloworld 
## projectID.firebaseapp.com/helloworld
## custom-domain/helloworld

## gcloud run deploy SERVICE --image gcr.io/PROJECT-ID/helloworld --platform managed --port 5000

## remove docker image and docker container
## docker rmi [IMAGE_ID] [IMAGE_ID]
## docker rm [IMAGE_ID] [IMAGE_ID]
## docker image ls
## docker ps -a

## https://minymal-chess.web.app