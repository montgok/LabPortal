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
        "*EX4550a*" {
		send "configure\r"
		sleep 1
        }
}

expect "*EX4550a#"
send "load override scp://${portalIP}/home/cisco/${sourceFilename}\r"
sleep 5

expect "*assword*" 
send "${username}\r"
sleep 5

expect {
	"*100%*" {
		expect "*EX4550a#"
		send "commit\r"
		sleep 1

		expect "*EX4550a#"
		send "exit\r"
		sleep 1
		
		expect "*EX4550a#"
		send "exit\r"
		sleep 1
	}
}
