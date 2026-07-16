#include "telemetry.h"

void sendTelemetry(const TelemetryData& data)
{
    Serial.print(data.pressure, 2);
    Serial.print(",");

    Serial.print(data.temperature, 2);
    Serial.print(",");

    Serial.print(data.altitude, 2);
    Serial.print(",");

    Serial.print(data.accelX, 3);
    Serial.print(",");

    Serial.print(data.accelY, 3);
    Serial.print(",");

    Serial.print(data.accelZ, 3);
    Serial.print(",");

    Serial.print(data.gyroX, 3);
    Serial.print(",");

    Serial.print(data.gyroY, 3);
    Serial.print(",");

    Serial.print(data.gyroZ, 3);
    Serial.print(",");

    Serial.println(data.imuTemperature, 2);
}