from flask import Flask, make_response, jsonify
from flask_cors import CORS
from flask import request
import logging
from pyspark.sql.types import StructType,StructField, StringType, IntegerType
from pyspark.sql import SparkSession
from pyspark.sql import Row
from datetime import datetime, date
from pyspark.sql.functions import *
from pyspark.sql.window import Window

app = Flask(__name__)
CORS(app, support_credentials=True)
app.config['TIMEOUT'] = 3600
app.logger.setLevel(logging.DEBUG)
stream_handler = logging.StreamHandler()
stream_handler.setLevel(logging.DEBUG)
app.logger.addHandler(stream_handler)

spark = SparkSession.builder.getOrCreate()

@app.route('/convertUsingSpark/', methods=['POST'])
def welcome():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        app.logger.info("##################")
        json_request = request.get_json()
        from_var = json_request.get("from")
        to_var = json_request.get("to")
        app.logger.info(":::::::::::" + from_var)
        app.logger.info(":::::::::::" + to_var)
        if from_var == "csv":
            if to_var == "json":
                spark.read.option("header", "true").csv("/home/flask_api/csv").coalesce(1).write.mode("append").json("/home/flask_api/Output/{}/".format(str(datetime.now().strftime('%Y%m%d%H%M%S%f'))))
            if to_var == "parquet":
                spark.read.option("header", "true").csv("/home/flask_api/csv").coalesce(1).write.mode("append").parquet("/home/flask_api/Output/{}/".format(str(datetime.now().strftime('%Y%m%d%H%M%S%f'))))
        elif from_var == "json":
            app.logger.info("json")
            if to_var == "csv":
                spark.read.json("/home/flask_api/json").coalesce(1).write.mode("append").option("header", "true").csv("/home/flask_api/Output/{}/".format(str(datetime.now().strftime('%Y%m%d%H%M%S%f'))))
            if to_var == "parquet":
                app.logger.info("##########" + "parquet")
                spark.read.json("/home/flask_api/json").coalesce(1).write.mode("append").parquet("/home/flask_api/Output/{}/".format(str(datetime.now().strftime('%Y%m%d%H%M%S%f'))))
        elif from_var == "parquet":
            if to_var == "csv":
                spark.read.parquet("/home/flask_api/parquet").coalesce(1).write.mode("append").option("header", "true").csv("/home/flask_api/Output/{}/".format(str(datetime.now().strftime('%Y%m%d%H%M%S%f'))))
            if to_var == "json":
                spark.read.parquet("/home/flask_api/parquet").coalesce(1).write.mode("append").json("/home/flask_api/Output/{}/".format(str(datetime.now().strftime('%Y%m%d%H%M%S%f'))))
        response = {
            "response": 200,
            "conversion": "success"
        }

        return jsonify(response)
    else:
        return 'Content-Type not supported!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10050)