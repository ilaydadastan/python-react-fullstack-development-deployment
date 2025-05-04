FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh
COPY . .

EXPOSE 5001

ENTRYPOINT ["/entrypoint.sh"]
