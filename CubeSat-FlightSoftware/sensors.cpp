#include "sensors.h"

#include <Wire.h>

#include "config.h"
#include "ms5803.h"
#include "mpu6050.h"

bool initializeSensors()
{
    Wire.begin();

    bool ok = true;

    if (!initializeMS5803())
    {
        ok = false;
    }

    if (!initializeMPU6050())
    {
        ok = false;
    }

    return ok;
}

bool readSensors(TelemetryData &telemetry)
{
    bool ok = true;

    if (!readMS5803(telemetry))
    {
        ok = false;
    }

    if (!readMPU6050(telemetry))
    {
        ok = false;
    }

    return ok;
}