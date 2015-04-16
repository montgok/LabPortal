expect "*${prompt}*"
send "reload\r"
sleep 1

expect "Proceed*"
send "\r"
sleep 1
