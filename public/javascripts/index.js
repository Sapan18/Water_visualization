$(document).ready(function () {
	
	$("#chart").shieldChart({
                theme: "light",
                exportOptions: {
                    image: false,
                    print: false
                },
                primaryHeader: {
                    text: "Pressure, vibration and termperature statistics over six interval"
                },
                zoomMode: "xy",
                seriesSettings: {
                    bar: {
                        barOffset: 0
                    }
                },
                axisX: {
                    categoricalValues: ["1st", "2nd", "3rd", "4th", "5th", "6th"]
                },
                axisY: {
                    title: {
                        text: "Value statistics"
                    }
                },
                dataSeries: [{
                    seriesType: "bar",
                    collectionAlias: "Pressure",
                    data: [630, 400, 743, 503, 702, 383]
                }, {
                    seriesType: "bar",
                    collectionAlias: "Vibration",
                    data: [152, 234, 123, 348, 167, 283]
                }, {
                    seriesType: "bar",
                    collectionAlias: "Temperature",
                    data: [72, 90, 84, 78, 67, 83]
                }]
            });
});