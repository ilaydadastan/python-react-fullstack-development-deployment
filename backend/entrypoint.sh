#!/bin/sh

pwd
ls -la

if [ ! -d "migrations/versions" ]; then
  flask db init
fi

flask db migrate
flask db upgrade
python run.py