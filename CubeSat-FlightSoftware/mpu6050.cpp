#include "mpu6050.h"

static Adafruit_MPU6050 mpu;

bool initializeMPU6050()
{
    if (!mpu.begin())
    {
        return false;
    }

    return true;
}

bool readMPU6050(TelemetryData &telemetry)
{
    sensors_event_t accel;
    sensors_event_t gyro;
    sensors_event_t temp;

    mpu.getEvent(&accel, &gyro, &temp);

    telemetry.accelX = accel.acceleration.x;
    telemetry.accelY = accel.acceleration.y;
    telemetry.accelZ = accel.acceleration.z;

    telemetry.gyroX = gyro.gyro.x;
    telemetry.gyroY = gyro.gyro.y;
    telemetry.gyroZ = gyro.gyro.z;

    telemetry.imuTemperature = temp.temperature;

    return true;
}