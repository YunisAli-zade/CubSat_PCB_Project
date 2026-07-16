#include "config.h"
#include "telemetry.h"

TelemetryData telemetry;

void setup()
{
    Serial.begin(SERIAL_BAUDRATE);
}

void loop()
{
    telemetry.pressure = 1013.25;
    telemetry.temperature = 25.60;
    telemetry.altitude = 15.20;

    telemetry.accelX = 0.10;
    telemetry.accelY = -0.05;
    telemetry.accelZ = 9.81;

    telemetry.gyroX = 0.01;
    telemetry.gyroY = 0.02;
    telemetry.gyroZ = -0.01;

    telemetry.imuTemperature = 26.40;

    sendTelemetry(telemetry);

    delay(1000);
}