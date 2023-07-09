#!/bin/bash

# Server root folder
SERVER_ROOT=./api

# GitHub repository URL
SERVER_URL=https://github.com/ronniery/solid-sniffle.git

# Receive the api port as parameter or use default
export APP_PORT=${1:-46000}

get_project () {
  echo "Fetching project from GitHub..."
  git clone --quiet --no-hardlinks $SERVER_URL $SERVER_ROOT > /dev/null
}

build_project () {
  cd $SERVER_ROOT

  echo "Installing all necessary dependencies, then building the project..."
  npm install --silent > /dev/null && npm run build > /dev/null
}

run_server () {
  echo "Running server locally..."
  node ./api/dist/server.js & disown
}

setup_api () {
  get_project
  build_project
  run_server
}

should_run_server () {
  status_code=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:${APP_PORT}/tickets)

  if [[ "$status_code" -ne 200 ]] ; then
    # Server is not running, run it again!
    rm -rf $SERVER_ROOT

    setup_api
  fi
}

# should_run_server

run_server