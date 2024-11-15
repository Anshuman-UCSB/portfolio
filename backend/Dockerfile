FROM python:3.10-slim-bookworm

WORKDIR /app

COPY pyproject.toml poetry.lock /app/

RUN pip install --no-cache-dir poetry

RUN poetry install --no-dev --no-interaction --no-ansi

COPY . /app

EXPOSE 5004

CMD ["poetry", "run", "gunicorn", "-k", "geventwebsocket.gunicorn.workers.GeventWebSocketWorker", "--bind", "0.0.0.0:5004", "run:app"]
