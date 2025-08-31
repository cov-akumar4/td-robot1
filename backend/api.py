import os
import re
import pandas as pd
import logging
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow React to access the API

df = pd.DataFrame()

# Setup console logging
logging.basicConfig(
    stream=sys.stdout,
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

def parse_thread_dump(file_path):
    logging.info(f"Parsing thread dump file: {file_path}")
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()

    block_pattern = r'(".*?"\s+#\d+[\s\S]*?)(?=(\n".*?"\s+#\d+)|\Z)'
    blocks = re.findall(block_pattern, content)

    threads = []
    for block, _ in blocks:
        header_pattern = r'"(.+?)"\s+#(\d+)\s+prio=(\d+)\s+os_prio=(\d+)\s+cpu=([\d.]+)ms\s+elapsed=([\d.]+)s\s+tid=(0x[0-9a-f]+)\s+nid=(0x[0-9a-f]+)\s+(.+?)\s+\[(.*?)\]\s+java.lang.Thread.State:\s+(.+?)\n'
        m = re.search(header_pattern, block)
        if m:
            threads.append({
                "name": m[1],
                "id": m[2],
                "priority": m[3],
                "os_priority": m[4],
                "cpu_ms": float(m[5]),
                "elapsed_s": float(m[6]),
                "tid": m[7],
                "nid": m[8],
                "status": m[9],
                "memory": m[10],
                "state": m[11],
                "full_trace": block.strip()
            })

    logging.info(f"Parsed {len(threads)} threads from file")
    return pd.DataFrame(threads)

@app.route('/api/upload', methods=['POST'])
def upload_file():
    global df
    logging.info("Upload API triggered")
    
    if 'file' not in request.files:
        logging.warning("No file uploaded")
        return jsonify({"error": "No file uploaded"}), 400

    f = request.files['file']
    os.makedirs("uploads", exist_ok=True)
    file_path = os.path.join("uploads", f.filename)
    f.save(file_path)
    logging.info(f"File saved: {file_path}")

    df = parse_thread_dump(file_path)
    logging.info(f"Dataframe updated with {len(df)} threads")

    # Return the parsed thread data immediately
    threads_data = df.drop(columns=["full_trace"]).to_dict(orient="records")
    return jsonify({
        "message": "File processed successfully",
        "thread_count": len(df),
        "threads": threads_data
    })

if __name__ == '__main__':
    app.run(debug=True)
