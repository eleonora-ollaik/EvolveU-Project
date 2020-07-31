import json
import os
import psycopg2
from datetime import datetime

def lambda_handler(event, context):
    
    try:

        conn = psycopg2.connect(host=os.environ['rds_host'], port=os.environ['rds_port'], dbname=os.environ['rds_dbname'], user=os.environ['rds_username'], password=os.environ['rds_password'])
        conn.autocommit = True

        cur = conn.cursor()
        cur.execute(event["query"])

        colnames = [desc[0] for desc in cur.description]
        records = []
        if (event['haspayload']):
            colnames = [desc[0] for desc in cur.description]
            records = []        
            for row in cur.fetchall():
                line = []
                for x in row:
                    if type(x) is datetime:
                        line.append(x.strftime('%Y-%m-%d %X %Z%z'))
                    else:
                        line.append(x)

                records.append(dict(zip(colnames, line)))                            
        else:
            line = []  
            colnames = [desc[0] for desc in cur.description]          
            row = cur.fetchone()         
            for x in row:
                if type(x) is datetime:
                    line.append(x.strftime('%Y-%m-%d %X %Z%z'))
                else:
                    line.append(x)

            records.append(dict(zip(colnames, line)))

        cur.close()        
        conn.close()

        return {
            'statusCode': 200,
            'body': json.dumps('Query executed successfully'),
            'payload': json.dumps(records)
        }

    except:
        return {
            'statusCode': 400,
            'body': json.dumps('An error occurred')
        }