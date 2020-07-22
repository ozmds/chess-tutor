FROM python:3
ADD chessapi/ /app
WORKDIR /app
RUN apt-get update
RUN pip install -r requirements/base.txt
CMD python app.py