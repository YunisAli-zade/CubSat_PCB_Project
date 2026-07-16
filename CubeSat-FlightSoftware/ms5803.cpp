#include "ms5803.h"

#include <math.h>

static uint16_t calibration[7];

static void sendCommand(uint8_t command)
{
    Wire.beginTransmission(MS5803_ADDRESS);
    Wire.write(command);
    Wire.endTransmission();
}

static uint32_t readADC()
{
    Wire.requestFrom(MS5803_ADDRESS, 3);

    uint32_t value = 0;

    if (Wire.available() == 3)
    {
        value =
            ((uint32_t)Wire.read() << 16) |
            ((uint32_t)Wire.read() << 8) |
            Wire.read();
    }

    return value;
}

bool initializeMS5803()
{
    sendCommand(0x1E);

    delay(100);

    for (int i = 1; i <= 6; i++)
    {
        Wire.beginTransmission(MS5803_ADDRESS);
        Wire.write(0xA0 + (i * 2));
        Wire.endTransmission();

        Wire.requestFrom(MS5803_ADDRESS, 2);

        calibration[i] =
            ((uint16_t)Wire.read() << 8) |
            Wire.read();
    }

    return true;
}

bool readMS5803(TelemetryData &telemetry)
{
    // Pressure conversion
    sendCommand(0x48);
    delay(10);

    sendCommand(0x00);
    uint32_t D1 = readADC();

    // Temperature conversion
    sendCommand(0x58);
    delay(10);

    sendCommand(0x00);
    uint32_t D2 = readADC();

    int32_t dT = D2 - ((int32_t)calibration[5] << 8);

    int32_t TEMP =
        2000 + ((int64_t)dT * calibration[6]) / 8388608;

    int64_t OFF =
        ((int64_t)calibration[2] << 16) +
        ((int64_t)calibration[4] * dT) / 128;

    int64_t SENS =
        ((int64_t)calibration[1] << 15) +
        ((int64_t)calibration[3] * dT) / 256;

    int32_t P =
        (D1 * SENS / 2097152 - OFF) / 32768;

    telemetry.pressure = P / 100.0f;
    telemetry.temperature = TEMP / 100.0f;

    telemetry.altitude =
        44330.0f *
        (1.0f - pow(telemetry.pressure / 1013.25f, 0.1903f));

    return true;
}