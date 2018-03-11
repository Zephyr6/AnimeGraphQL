if [ "$NODE_ENV" = "development" ]; then
  nodemon ./src/ --exec babel-node
else
  node ./dist
fi
