#!/usr/bin/expect -f
set timeout 10
set deviceIP [lindex $argv 0]
set deviceHostname [lindex $argv 1]
set portalIP [lindex $argv 2]
set username [lindex $argv 3]
set password [lindex $argv 4]
set timestamp [lindex $argv 5]
set prompt "${deviceHostname}*"
set filename "${timestamp}_${deviceHostname}_Cfg"

switch ${deviceHostname} {
    	tsa {
		source expectBackup-tsa.tcl
	}
        tsb {
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
        }
        tsc {
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
        }
	c3750a {
		spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
		send "enable\r"
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
	}
	c5548a {
		spawn telnet ${deviceIP}
                sleep 1

                expect "login*"
		send "${username}\r"
		sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "copy running-config tftp:\r"
                sleep 1

		expect "Enter destination*"
                send "${filename}\r"
                sleep 1

                expect "Enter vrf*"
                send "\r"
                sleep 1

                expect "Enter hostname*"
                send "${portalIP}\r"
                sleep 1

                expect "${prompt}"
                send "exit\r"
	}
        c5548b {
                spawn telnet ${deviceIP}
                sleep 1

                expect "login*"
                send "${username}\r"
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "copy running-config tftp:\r"
                sleep 1

                expect "Enter destination*"
                send "${filename}\r"
                sleep 1

                expect "Enter vrf*"
                send "\r"
                sleep 1

                expect "Enter hostname*"
                send "${portalIP}\r"
                sleep 1

                expect "${prompt}"
                send "exit\r"
        }
	consrv2 {
		spawn telnet ${deviceIP}
                sleep 1

		expect "*login*" 
		send "${username}\r"
		sleep 1

		expect "Password:*" 
		send "${password}\r"
		sleep 1
		
		#.....

		expect "${prompt}"
                send "exit\r"
	}
        c3750c {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
        c3750d {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
	c3750e {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
	c3750f {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
	c3750g {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
	c3750b {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
	metronodea { 
		spawn ssh -l ${username} ${deviceIP}
                sleep 1

                expect "*assword*"
                send "${password}\r"
                sleep 1

                expect "*Central*"
                send "configuration export tftp://${portalIP}:/${filename}\r"
                sleep 5

                expect "*Central*"
                send "exit\r"
	}
	metronodeb {
		spawn ssh -l ${username} ${deviceIP}
                sleep 1

                expect "*assword*"
                send "${password}\r"
                sleep 1

                expect "*NODE-CORE*"
                send "configuration export tftp://${portalIP}:/${filename}\r"
                sleep 5

                expect "*NODE-CORE*"
                send "exit\r"
        }
	metronodec {
		spawn ssh -l ${username} ${deviceIP}
                sleep 1

                expect "*assword*"
                send "${password}\r"
                sleep 1

                expect "*MetroNODE-C*"
                send "configuration export tftp://${portalIP}:/${filename}\r"
                sleep 5

                expect "*MetroNODE-C*"
                send "exit\r"
        }
	metronida {
		spawn ssh -l ${username} ${deviceIP}
                sleep 1

                expect "*assword*"
                send "${password}\r"
                sleep 1

                expect "*NID-A*"
                send "configuration export tftp://${portalIP}:/${filename}\r"
                sleep 5

                expect "*NID-A*"
                send "exit\r"
        }
	metronidb {
		spawn ssh -l ${username} ${deviceIP}
                sleep 1

                expect "*assword*"
                send "${password}\r"
                sleep 1

                expect "*NID-B*"
                send "configuration export tftp://${portalIP}:/${filename}\r"
                sleep 5

                expect "*NID-B*"
                send "exit\r"
        }
	metronidc {
		spawn ssh -l ${username} ${deviceIP}
                sleep 1

                expect "*assword*"
                send "${password}\r"
                sleep 1

                expect "*NID-C*"
                send "configuration export tftp://${portalIP}:/${filename}\r"
                sleep 5

                expect "*NID-C*"
                send "exit\r"
        }
	metronidd {
		spawn ssh -l ${username} ${deviceIP}
                sleep 1

                expect "*assword*"
                send "${password}\r"
                sleep 1

                expect "*NID-D*"
                send "configuration export tftp://${portalIP}:/${filename}\r"
                sleep 5

                expect "*NID-D*"
                send "exit\r"
        }
	metronide {
		spawn ssh -l ${username} ${deviceIP}
                sleep 1

                expect "*assword*"
                send "${password}\r"
                sleep 1

                expect "*NID-E*"
                send "configuration export tftp://${portalIP}:/${filename}\r"
                sleep 5

                expect "*NID-E*"
                send "exit\r"
        }
	metronidf {
		spawn ssh -l ${username} ${deviceIP}
		sleep 1

		expect "*assword*" 
		send "${password}\r"
		sleep 1

		expect "*NID-F*"
		send "configuration export tftp://${portalIP}:/${filename}\r"
		sleep 5

		expect "*NID-F*"
		send "exit\r"
	}
        metronidg {
                spawn ssh -l ${username} ${deviceIP}
                sleep 1

                expect "*assword*"
                send "${password}\r"
                sleep 1

                expect "*NID-G*"
                send "configuration export tftp://${portalIP}:/${filename}\r"
                sleep 5

                expect "*NID-G*"
                send "exit\r"
        }
	qfxa {
		spawn scp ${username}@${deviceIP}:/config/juniper.conf.gz /tftpboot/${timestamp}_${deviceHostname}_juniper_Cfg
                sleep 1

		expect "*assword*"
		send "${password}\r"
		sleep 2

		expect "*100%*"
		sleep 1
        }
	qfxb {
		spawn scp ${username}@${deviceIP}:/config/juniper.conf.gz /tftpboot/${timestamp}_${deviceHostname}_juniper_Cfg
                sleep 1

		expect "*assword*"
                send "${password}\r"
                sleep 2

                expect "*100%*"
                sleep 1
        }
	ex4550a {
		spawn scp ${username}@${deviceIP}:/config/juniper.conf.gz /tftpboot/${timestamp}_${deviceHostname}_juniper_Cfg
                sleep 1

		expect "*assword*"
                send "${password}\r"
                sleep 2

                expect "*100%*"
                sleep 1
        }
	ex4550b {
		spawn scp ${username}@${deviceIP}:/config/juniper.conf.gz /tftpboot/${timestamp}_${deviceHostname}_juniper_Cfg
                sleep 1

		expect "*assword*"
                send "${password}\r"
                sleep 2

                expect "*100%*"
                sleep 1
        }
	ex4550vc {
		spawn telnet ${deviceIP}
                sleep 1
        }
	ex9208-re0 {
		spawn telnet ${deviceIP}
                sleep 1
        }
	ex9208-re1 {
		spawn telnet ${deviceIP}
                sleep 1
        }
	ex9208 {
		spawn telnet ${deviceIP}
                sleep 1
        }
	mx80a {
		spawn telnet ${deviceIP}
                sleep 1
        }
	mx80b {
                spawn telnet ${deviceIP}
                sleep 1
	}
	c2951b {
                spawn telnet ${deviceIP}
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
        }
	c2951b-esm {
                spawn telnet ${deviceIP}
                sleep 1
        }
	asr1002 {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
	consrv2 {
                spawn telnet ${deviceIP}
                sleep 1
        }
	asr1001 {
                spawn telnet ${deviceIP}
                sleep 1

		expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
	c7606b {
                spawn telnet ${deviceIP}
                sleep 1

		expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
        C7606B {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
	c7606a {
                spawn telnet ${deviceIP}
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
        }
	crsa-rp0 {
                spawn telnet ${deviceIP}
                sleep 1
        }
	crsa-rp1 {
                spawn telnet ${deviceIP}
                sleep 1
        }
	crsa-drp0 {
                spawn telnet ${deviceIP}
                sleep 1
        }
	crsa-drp1 {
                spawn telnet ${deviceIP}
                sleep 1
        }
	c2951a {
                spawn telnet ${deviceIP}
                sleep 1

		expect "Username*"
                send "${username}\r"
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "copy running-config tftp:\r"
                sleep 1

                expect "Address or name*"
                send "${portalIP}\r"
                sleep 1

                expect "Destination filename*"
                send "${filename}\r"
                sleep 1

                expect "${prompt}"
                send "exit\r"
        }
	c2951a-esm {
                spawn telnet ${deviceIP}
                sleep 1
        }
	6503a {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
	6503b {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
	c7206a {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
	c7206b {
                spawn telnet ${deviceIP}
                sleep 1
        }
	srx550a {
		spawn scp ${username}@${deviceIP}:/config/juniper.conf.gz /tftpboot/${timestamp}_${deviceHostname}_juniper_Cfg
                sleep 1

                expect "*assword*"
                send "${password}\r"
                sleep 2

                expect "*100%*"
                sleep 1
        }
	srx550b {
		spawn scp ${username}@${deviceIP}:/config/juniper.conf.gz /tftpboot/${timestamp}_${deviceHostname}_juniper_Cfg
                sleep 1

                expect "*assword*"
                send "${password}\r"
                sleep 2

                expect "*100%*"
                sleep 1
        }
	c7606c {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
	asr9001a {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Username*"
                send "${username}\r"
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "*${prompt}*"
                send "copy running-config tftp:\r"
                sleep 1

		expect "Host name or IP addres*"
                send "${portalIP}\r"
                sleep 1

                expect "Destination file name*"
                send "${filename}\r"
                sleep 1

                expect "${prompt}"
                send "exit\r"
        }
	c4900m {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
	mx240-rp0 {
                spawn telnet ${deviceIP}
                sleep 1
        }
	asr9006a {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Username*"
                send "${username}\r"
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "copy running-config tftp:\r"
                sleep 1

                expect "Address or name*"
                send "${portalIP}\r"
                sleep 1

                expect "Destination filename*"
                send "${filename}\r"
                sleep 1

                expect "${prompt}"
                send "exit\r"
        }
	asr9001b {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Username*"
                send "${username}\r"
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "*${prompt}*"
                send "copy running-config tftp:\r"
                sleep 1

                expect "Host name or IP addres*"
                send "${portalIP}\r"
                sleep 1

                expect "Destination file name*"
                send "${filename}\r"
                sleep 1

                expect "${prompt}"
                send "exit\r"
        }
	mx240-rp1 {
                spawn telnet ${deviceIP}
                sleep 1
        }
	c4948a {
                spawn telnet ${deviceIP}
                sleep 1
        }
	c4948b {
                spawn telnet ${deviceIP}
                sleep 1
        }
	c4924a {
                spawn telnet ${deviceIP}
                sleep 1
        }
	c4924b {
                spawn telnet ${deviceIP}
                sleep 1
        }
	mx240 {
                spawn telnet ${deviceIP}
                sleep 1
        }
	c7206c {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
	c7206d {
                spawn telnet ${deviceIP}
                sleep 1
        }
	c7201a {
                spawn telnet ${deviceIP}
                sleep 1
        }
	crsb-rp0 {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Username*"
                send "${username}\r"
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "copy running-config tftp:\r"
                sleep 1

                expect "Address or name*"
                send "${portalIP}\r"
                sleep 1

                expect "Destination filename*"
                send "${filename}\r"
                sleep 1

                expect "${prompt}"
                send "exit\r"
        }
	crsb-rp1 {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Username*"
                send "${username}\r"
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "copy running-config tftp:\r"
                sleep 1

                expect "Address or name*"
                send "${portalIP}\r"
                sleep 1

                expect "Destination filename*"
                send "${filename}\r"
                sleep 1

                expect "${prompt}"
                send "exit\r"
        }
	c4924c {
                spawn telnet ${deviceIP}
                sleep 1
        }
	c2951c {
                spawn telnet ${deviceIP}
                sleep 1
        }
	c2951d {
                spawn telnet ${deviceIP}
                sleep 1
        }
	c2951e {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
	C2951E {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
	c2951f {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
	C2951F {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
	srx550c {
                spawn telnet ${deviceIP}
                sleep 1
        }
	srx550d {
                spawn telnet ${deviceIP}
                sleep 1
        }
	c2951d-esm {
                spawn telnet ${deviceIP}
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
        }
	c2951c-esm {
                spawn telnet ${deviceIP}
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
        }
	c2811a {
                spawn telnet ${deviceIP}
                sleep 1

                expect "Password:*"
                send "${password}\r"
                sleep 1

                expect "${prompt}"
                send "enable\r"
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
        }
    	default {
		send_user "\n*** Error, the host ${deviceHostname} does not have a command sequence defined! ***\r\n"
    	}
}

expect eof
exit
