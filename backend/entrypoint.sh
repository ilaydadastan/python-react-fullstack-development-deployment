#!/bin/sh

pwd
ls -la

if [ ! -d "migrations/versions" ]; then
  flask db init
  flask db migrate
fi

flask db upgrade
python run.py