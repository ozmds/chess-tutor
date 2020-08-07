FROM python:3.7-alpine
ADD chessapi/ /app
WORKDIR /app
RUN pip install -r requirements/base.txt
CMD python app.py