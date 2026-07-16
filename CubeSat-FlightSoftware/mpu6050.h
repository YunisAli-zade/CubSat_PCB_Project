#ifndef MPU6050_H
#define MPU6050_H

#include <Arduino.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>

#include "telemetry.h"

bool initializeMPU6050();

bool readMPU6050(TelemetryData &telemetry);

#endif