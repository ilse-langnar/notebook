#!/bin/bash

cd ..

echo "dev branch"
git add  .
git commit -m "$1"
git push

echo "dev pages"
git branch -d pages
git branch pages
git checkout pages
git push
