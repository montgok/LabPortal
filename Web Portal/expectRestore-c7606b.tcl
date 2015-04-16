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
        "${prompt}*>" {
		send "enable\r"
		sleep 1
		expect "*assword*"
		send "${password}\r"
                sleep 1
        }
}

expect "${prompt}"
send "copy /erase tftp: startup-config\r"
sleep 1

expect "Address*"
send "${portalIP}\r"
sleep 1

expect "Source filename*"
send "${sourceFilename}\r"
sleep 1

expect "Destination filename*"
send "\r"
sleep 1

expect "Erasing*"
send "\r"
sleep 5

expect {
        "*OK*" {
		expect "${prompt}"
		send "reload\r"
		sleep 1

		expect "System configuration has been modified*"
		send "yes\r"
		sleep 1

		expect "Proceed*"
		send "\r"
		sleep 1
        }
}

