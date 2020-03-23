#!/bin/sh
cd /Users/liuqi/Desktop/qinode/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log