#ifndef SENSORS_H
#define SENSORS_H

#include "telemetry.h"

bool initializeSensors();

bool readSensors(TelemetryData &telemetry);

#endif