spawn ssh -l ${username} ${deviceIP}
sleep 1

expect "*assword*" 
send "${password}\r"
sleep 1

expect "*MetroNODE-C*"
send "configuration import tftp://${portalIP}:/${sourceFilename}\r"
sleep 5

expect "*MetroNODE-C*"
send "reboot\r"
