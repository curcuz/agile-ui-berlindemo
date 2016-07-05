#!/bin/bash

# Enable i2c
modprobe i2c-dev || true

while true; do
    node /app/index.js
done
