const ModbusRTU = require('modbus-serial');

class SmartHomeDataProvider {
    constructor() {
        this.client = new ModbusRTU();
    }

    async init(host, port, id = 1) {
        await this.client.connectTCP(host, { port });

        return this.client.setID(id);
    }

    async getTemperatureSensors() {
        return new Promise((resolve, reject) => {
            this.client.readInputRegisters(0, 8, function (error, data) {
                if (error) {
                    return reject(error);
                }

                return resolve(data && data.data);
            })
        });
    }

    async getCoils() {
        return new Promise((resolve, reject) => {
            client.readCoils(512, 50, function (err, data) {
                if (error) {
                    return reject(error);
                }

                return resolve(data && data.data);
            });
        });
    }

    async setCoils(index, values) {
        return client.writeCoils(index, values);
    }

    async setRegisters(index, values){
        return client.writeRegister(index, values);
    }
}

module.exports = SmartHomeDataProvider;
