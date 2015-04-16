spawn ssh -l ${username} ${deviceIP}
sleep 1

expect "*assword*" 
send "${password}\r"
sleep 1

expect "*NID-G*"
send "configuration import tftp://${portalIP}:/${sourceFilename}\r"
sleep 5

expect "*NID-G*"
send "reboot\r"
