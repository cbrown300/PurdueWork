#!/bin/bash

# arguments
testname=$1

# Create fifos
mkfifo testPipe
mkfifo expectedPipe

# Output test and solution output and error to the fifos
tests/$testname > testPipe 2>&1 &
tests/expected/$testname > expectedPipe 2>&1 &

# Diff the contents of the fifos and output the difference
timeout 5 diff testPipe expectedPipe || echo "Timeout Failure"

# Remove the fifos
rm -f testPipe expectedPipe
