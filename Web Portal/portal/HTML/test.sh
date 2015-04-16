#!/bin/bash

set EmptyFolderList = ""
for x in `find /var/www/portal/Projects/ -mindepth 1 -maxdepth 1 -type d`
do
	if [ `ls -1 ${x} | wc -l` -eq 0 ]
	then
		set EmptyFolderList = ${EmptyFolderList}|${x}
		echo $x is an empty directory
	else
		echo $x is not empty
	fi
done



#root@netdesign1:/var/www/portal/HTML# ls -1 /var/www/portal/Projects/project1/ | wc -l
#1
#root@netdesign1:/var/www/portal/HTML# ls -1 /var/www/portal/Projects/project2/ | wc -l
#0
#root@netdesign1:/var/www/portal/HTML# for x in `ls -1 /var/www/portal/Projects/`; do if [ $(ls -1 /var/www/portal/Projects/${x} | wc -l) -eq 0 ]; then echo "empty"; else echo "not empty"; fi; done


