#!/bin/bash

# Link PM2 to Keymetrics.io
if [ "$PM2_SECRET_ID" ]
then
    pm2 link $PM2_SECRET_ID $PM2_PUBLIC_ID || true
fi

# Ensure mopidy folders are there
mkdir /data/grafana > /dev/null 2>&1 || true
mkdir /data/grafana/data > /dev/null 2>&1 || true
mkdir /data/grafana/logs > /dev/null 2>&1 || true
ls /data/grafana/logs/grafana.log > /dev/null 2>&1 || touch /data/grafana/logs/grafana.log > /dev/null 2>&1
# Enable i2c
modprobe i2c-dev || true

# Special procedure invoked only on rpi3 revision
REV=`cat /proc/cmdline | awk -v RS=" " -F= '/boardrev/ { print $2 }'`
if [ "$REV" = "0xa02082" ]
  then
    if ! /usr/bin/hciattach /dev/ttyAMA0 bcm43xx 921600 noflow -; then
        /usr/bin/hciattach /dev/ttyAMA0 bcm43xx 921600 noflow - || true
    fi
fi
# Enable Bluetooth
hciconfig hci0 up || true

# Start application loop
pm2 start /app/pm2.json && pm2 save && pm2 logs
