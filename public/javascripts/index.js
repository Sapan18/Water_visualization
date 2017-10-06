$(document).ready(function () {
	
	//variables declaration
	var tableData=[], tableDataReverse=[];
	
	
			
		
	//websocket connection
	var ws = new WebSocket('wss://' + location.host);
	
	ws.onopen = function () {
		console.log('Successfully connect WebSocket');
	}
	
	//websocket receiving messages
	ws.onmessage = function (message) {
		console.log('Receive message via websocket in client side: ' + message.data);
		try {
			var obj = JSON.parse(message.data);
						
						
			$("#chart").shieldChart({
                theme: "light",
                exportOptions: {
                    image: false,
                    print: false
                },
                primaryHeader: {
                    text: "Pressure, termperature and vibration statistics over six interval"
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
                    data: [obj.pressure[0].Value, 400, 743, 503, 702, 383]
                }, {
                    seriesType: "bar",
                    collectionAlias: "Temperature",
                    data: [72, 90, 84, 78, 67, 83]
                }, {
                    seriesType: "bar",
                    collectionAlias: "Vibration",
                    data: [152, 234, 123, 348]
                }]
            });
						
		
			}
		catch (err) {
		  console.error(err);
		}
	}
});