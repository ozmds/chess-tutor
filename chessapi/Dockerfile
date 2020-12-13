FROM python:3.7-alpine
WORKDIR /app
COPY /chessapi/ /app/
RUN pip install -r requirements/base.txt
CMD python app.py