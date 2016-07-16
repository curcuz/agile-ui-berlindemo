for dir in `ls modules`;
do
  echo "installing dependencies for modules/$dir"
  npm i --prefix modules/$dir
done
