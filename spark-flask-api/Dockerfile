FROM python:3.9
WORKDIR /home/flask_api/
RUN apt-get update && apt-get upgrade -y && apt-get install openjdk-11-jdk -y
RUN pip install Flask pyspark flask_cors
RUN ls -la
COPY . /home/flask_api/
CMD [ "python3", "app.py" ]