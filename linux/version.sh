#!/bin/bash

mkdir "2.0"

for file in `ls -l 1.0 | grep ^- | awk '{print $8}'`; do
	sed 's/version:1.0/version:2.0/' $file > 2${file:1}
	mv 2${file:1} "2.0"
done
