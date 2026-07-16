#ifndef MS5803_H
#define MS5803_H

#include <Arduino.h>
#include <Wire.h>

#include "telemetry.h"
#include "config.h"

bool initializeMS5803();

bool readMS5803(TelemetryData &telemetry);

#endif