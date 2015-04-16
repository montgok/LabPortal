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
        "C2951*" {
		send "enable\r"
		sleep 1
		expect "*assword*"
		send "${password}\r"
                sleep 1
        }
}

expect "C2951*" 
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
sleep 1

expect {
        "*OK*" {
		expect "C2951*"
		send "reload\r"
		sleep 1

		expect "Proceed*"
		send "\r"
		sleep 1
        }
}

