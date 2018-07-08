function toogleDataSeries(e) {
    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    } else {
        e.dataSeries.visible = true;
    }
    e.chart.render();
}

const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
        text: "Temperature"
    },
    axisX: {
        valueFormatString: "hh:mm:ss"
    },
    axisY: {
        title: "Temperature",
        minimum: 21,
        maximum: 30
    },
    toolTip: {
        shared: true
    },
    legend: {
        cursor: "pointer",
        verticalAlign: "bottom",
        horizontalAlign: "left",
        dockInsidePlotArea: true,
        itemclick: toogleDataSeries
    },
    data: []
};

const sensorBasicOptions = {
    type: "line",
    showInLegend: true,
    markerType: "square",
    xValueFormatString: "hh:mm:ss"
};

const sensorKitchenOptions = { ...sensorBasicOptions, color: '#12F2F2', name: 'Kitchen', dataPoints: [] };
const sensorHallOptions = { ...sensorBasicOptions, color: '#F212F2', name: 'Hall', dataPoints: [] };
const sensorBathRoomOptions = { ...sensorBasicOptions, color: '#F2F212', name: 'BathRoom', dataPoints: [] };
const sensorRestRoomOptions = { ...sensorBasicOptions, color: '#1FF212', name: 'RestRoom', dataPoints: [] };
const sensorLogiaOptions = { ...sensorBasicOptions, color: '#FF1112', name: 'Logia', dataPoints: [] };

options.data.push(sensorKitchenOptions);
options.data.push(sensorHallOptions);
options.data.push(sensorBathRoomOptions);
options.data.push(sensorRestRoomOptions);
options.data.push(sensorLogiaOptions);

let lastDate = null;

const getOptions = async function () {
    const response = await fetch('/temperatureSensors');
    const data = await response.json();

    data
        .filter(item => lastDate < new Date(item.createdAt))
        .forEach(item => {
            lastDate = new Date(item.createdAt);
            sensorKitchenOptions.dataPoints.push({
                x: lastDate,
                y: parseFloat((item.values[0] / 10).toFixed(1))
            });
            sensorHallOptions.dataPoints.push({
                x: lastDate,
                y: parseFloat((item.values[5] / 10).toFixed(1))
            });
            sensorBathRoomOptions.dataPoints.push({
                x: lastDate,
                y: parseFloat((item.values[4] / 10).toFixed(1))
            });
            sensorRestRoomOptions.dataPoints.push({
                x: lastDate,
                y: parseFloat((item.values[2] / 10).toFixed(1))
            });
            sensorLogiaOptions.dataPoints.push({
                x: lastDate,
                y: parseFloat((item.values[1] / 10).toFixed(1))
            });
        });

    return options;
};

const $chart = $("#chartContainer").CanvasJSChart(options);

setInterval(() => {
    getOptions().then((options) => {
        $chart.CanvasJSChart().render();
    });
}, 10000);

