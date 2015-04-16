#!/usr/bin/expect -f
set timeout 10
set deviceIP [lindex $argv 0]
set deviceHostname [lindex $argv 1]
set portalIP [lindex $argv 2]
set username [lindex $argv 3]
set password [lindex $argv 4]
set sourceFilename [lindex $argv 5]
set prompt "${deviceHostname}*"


switch ${deviceHostname} {
    	tsa {
		source expectRestore-tsa.tcl
	}
        tsb {
		source expectRestore-tsb.tcl
        }
        tsc {
		source expectRestore-tsc.tcl
        }
	c3750a {
		source expectRestore-c3750a.tcl
	}
	c5548a {
		source expectRestore-c5548a.tcl
	}
        c5548b {
		source expectRestore-c5548b.tcl
        }
        c3750c {
		source expectRestore-c3750c.tcl
        }
        c3750d {
		source expectRestore-c3750d.tcl
        }
	c3750e {
		source expectRestore-c3750e.tcl
        }
	c3750f {
		source expectRestore-c3750f.tcl
        }
	c3750g {
		source expectRestore-c3750g.tcl
        }
	c3750b {
		source expectRestore-c3750b.tcl
        }
	metronodea {
		source expectRestore-metronodea.tcl
        }
	metronodeb {
		source expectRestore-metronodeb.tcl
        }
	metronodec { 
		source expectRestore-metronodec.tcl
	}
	metronida {
		source expectRestore-metronida.tcl
        }
	metronidb {
		source expectRestore-metronidb.tcl
        }
	metronidc {
		source expectRestore-metronidc.tcl
        }
	metronidd {
		source expectRestore-metronidd.tcl
        }
	metronide {
		source expectRestore-metronide.tcl
        }
	metronidf {
		source expectRestore-metronidf.tcl
        }
	metronidg {
		source expectRestore-metronidg.tcl
        }
	qfxa {
		source expectRestore-qfxa.tcl
        }
	qfxb {
		source expectRestore-qfxb.tcl
        }
	ex4550a {
		source expectRestore-ex4550a.tcl
        }
	ex4550b {
		source expectRestore-ex4550b.tcl
        }
	c2951b {
		source expectRestore-c2951b.tcl
        }
	asr1002 {
		source expectRestore-asr1002.tcl
        }
	asr1001 {
		source expectRestore-asr1001.tcl
        }
	C7606B {
		source expectRestore-c7606b.tcl
        }
	c7606b {
		source expectRestore-c7606b.tcl
        }
	C7606A {
		source expectRestore-c7606a.tcl
        }
	c7606a {
		source expectRestore-c7606a.tcl
        }
	crsa-rp0 {
        }
	crsa-rp1 {
        }
	crsa-drp0 {
        }
	crsa-drp1 {
        }
	c2951a {
		source expectRestore-c2951a.tcl
        }
	c2951a-esm {
        }
	c6503a {
		source expectRestore-c6503a.tcl
        }
	6503a {
		source expectRestore-c6503a.tcl
        }
	c6503b {
		source expectRestore-c6503b.tcl
        }
	6503b {
		source expectRestore-c6503b.tcl
        }
	c7206a {
		source expectRestore-c7206a.tcl
        }
	c7206b {
        }
	srx550a {
		source expectRestore-srx550a.tcl
        }
	srx550b {
		source expectRestore-srx550b.tcl
        }
	c7606c {
		source expectRestore-c7206c.tcl
        }
	C7606C {
		source expectRestore-c7206c.tcl
        }
	asr9001a {
		source expectRestore-asr9001a.tcl
        }
	c4900m {
		source expectRestore-c4900m.tcl
        }
	mx240-rp0 {
        }
	asr9006a {
		source expectRestore-asr9006a.tcl
        }
	asr9001b {
		source expectRestore-asr9001b.tcl
        }
	mx240-rp1 {
        }
	c4948a {
        }
	c4948b {
        }
	c4924a {
        }
	c4924b {
        }
	mx240 {
        }
	c7206c {
		source expectRestore-c7206c.tcl
        }
	c7206d {
        }
	c7201a {
        }
	crsb-rp0 {
		source expectRestore-crsb-rp0.tcl
        }
	crsb-rp1 {
		source expectRestore-crsb-rp1.tcl
        }
	c2951e {
		source expectRestore-c2951e.tcl
        }
	C2951E {
		source expectRestore-c2951e.tcl
        }
	c2951f {
		source expectRestore-c2951f.tcl
        }
	C2951F {
		source expectRestore-c2951f.tcl
        }
	c2951d-esm {
		source expectRestore-c2951d-esm.tcl
        }
	c2951c-esm {
		source expectRestore-c2951c-esm.tcl
        }
	c2811a {
		source expectRestore-c2811a.tcl
        }
    	default {
		send_user "\n*** Error, the host ${deviceHostname} does not have a command sequence defined! ***\r\n"
    	}
}

expect eof
exit
