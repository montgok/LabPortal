spawn telnet ${deviceIP}
sleep 1

expect {
        "*ogin*" {
                send "${username}\r"
                sleep 1
                exp_continue
        }
        "*assword*" {
                send "${password}\r"
                sleep 1
                exp_continue
        }
        "*HBA-B*" {
		send "configure\r"
		sleep 1
        }
}

expect "*HBA-B*" 
send "load override scp://${portalIP}/home/cisco/${sourceFilename}\r"
sleep 5

expect "*assword*" 
send "${username}\r"
sleep 5

expect {
	"*100%*" {
		expect "*HBA-B*" 
		send "commit\r"
		sleep 1

		expect "*HBA-B*" 
		send "exit\r"
		sleep 1
		
		expect "*HBA-B*" 
		send "exit\r"
		sleep 1
	}
}
