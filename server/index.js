const SmartHomeDataProvider = require('app/smartHomeDataProvider');
const mongoose = require('mongoose');
const { Schema } = mongoose;


mongoose.connect('mongodb://localhost/smartHome');
const TemperatureSensorsSchema = new Schema({ values: [Number] }, { timestamps: true });

const TemperatureSensorsModel = mongoose.model('TemperatureSensors', TemperatureSensorsSchema);

const smartHomeDataProvider = new SmartHomeDataProvider();

async function storeTemperatureSensorsValues(){
    const values = await smartHomeDataProvider.getTemperatureSensors();

    const temperatureSensors = new TemperatureSensorsModel({values});
    await temperatureSensors.save();

    console.log(values);
}

async function init() {
    await smartHomeDataProvider.init('192.168.100.60', 502);

    setInterval(storeTemperatureSensorsValues, 10000)
}

init();


const express = require('express');
const app = express();

app.use(express.static('../client'));

app.get('/temperatureSensors', async function (req, res) {
    const temperatureSensorsData = await TemperatureSensorsModel.find().lean();

    res.send(temperatureSensorsData);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

