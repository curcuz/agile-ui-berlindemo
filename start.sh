#!/bin/bash

# Ensure mopidy folders are there
mkdir /data/grafana || true
mkdir /data/grafana/data || true
mkdir /data/grafana/logs || true

# Enable i2c
modprobe i2c-dev || true
# Enable Bluetooth
if ! /usr/bin/hciattach /dev/ttyAMA0 bcm43xx 921600 noflow -; then
    /usr/bin/hciattach /dev/ttyAMA0 bcm43xx 921600 noflow - || true
fi
hciconfig hci0 up || true

# Start application loop
while true; do
    node /app/index.js
done
