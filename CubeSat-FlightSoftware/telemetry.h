#ifndef TELEMETRY_H
#define TELEMETRY_H

#include <Arduino.h>

/************************************************
 * CubeSat Telemetry Structure
 ***********************************************/

struct TelemetryData
{
    // ===========================
    // MS5803
    // ===========================

    float pressure;
    float temperature;
    float altitude;

    // ===========================
    // MPU6050
    // ===========================

    float accelX;
    float accelY;
    float accelZ;

    float gyroX;
    float gyroY;
    float gyroZ;

    float imuTemperature;

    // ===========================
    // GPS (Future)
    // ===========================

    float latitude;
    float longitude;
    float gpsAltitude;

    float speed;

    uint8_t satellites;

    // ===========================
    // Power (Future)
    // ===========================

    float batteryVoltage;

    // ===========================
    // Flight
    // ===========================

    unsigned long uptime;
};

void sendTelemetry(const TelemetryData& data);

#endif