spawn telnet ${deviceIP}
sleep 1

expect {
        "*sername*" {
                send "${username}\r"
                sleep 1
                exp_continue
        }
        "*assword*" {
                send "${password}\r"
                sleep 1
                exp_continue
        }
        "*${prompt}*" {
                sleep 1
        }
}

expect "*${prompt}*"
send "configure\r"
sleep 1

expect "*${prompt}*config*"
send "load tftp://${sourceFilename}\r"
sleep 1

expect "Address*"
send "${portalIP}\r"
sleep 1

expect "Source filename*"
send "${sourceFilename}\r"
sleep 4

expect "*${prompt}*config*"
send "commit replace\r"
sleep 1

expect "Do you wish to proceed*"
send "yes\r"
sleep 4

expect "*${prompt}*config*"
send "exit\r"
sleep 1

expect "*${prompt}*config*"
send "exit\r"
sleep 1
