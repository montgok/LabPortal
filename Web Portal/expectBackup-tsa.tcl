spawn telnet ${deviceIP}
sleep 1

expect "Password:*"
send "${password}\r"
sleep 1

expect "${prompt}"
send "copy running-config tftp:\r"
sleep 1

expect "Address*"
send "${portalIP}\r"
sleep 1

expect "Destination*"
send "${filename}\r"
sleep 1

expect "${prompt}"
send "exit\r"
