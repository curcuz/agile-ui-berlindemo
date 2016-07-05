#!/bin/bash

# Ensure mopidy folders are there
mkdir /data/grafana > /dev/null 2>&1 || true
mkdir /data/grafana/data > /dev/null 2>&1 || true
mkdir /data/grafana/logs > /dev/null 2>&1 || true

# Enable i2c
modprobe i2c-dev || true
# Enable Bluetooth
if ! /usr/bin/hciattach /dev/ttyAMA0 bcm43xx 921600 noflow -; then
    /usr/bin/hciattach /dev/ttyAMA0 bcm43xx 921600 noflow - || true
fi
hciconfig hci0 up || true

# Start application loop
while true; do
    pm2 start /app/pm2.json
done
