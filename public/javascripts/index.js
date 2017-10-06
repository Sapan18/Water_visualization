$(document).ready(function () {
	
	//variables declaration
	var tableData=[], tableDataReverse=[];
	var pressure=[], pressurerev=[];
	
	
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
                    data: pressurerev
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
	
			
	$("#grid").shieldGrid({
            dataSource: {
				data: tableDataReverse
			},
			rowHover: false,			
            scrolling: {
                virtual: true
            },
            sorting: true,
            columnReorder: true,
            columns: [
                { field: "key", title: "Key" },
                { field: "value", title: "Value" }
            ]
        });
	
	//updating table (live)
    function refreshGird() {
        var grid = $("#grid").swidget(),
            initialOptions = grid.initialOptions;
        initialOptions.dataSource = {
            data: tableDataReverse
        };
        grid.refresh(initialOptions);
    }
	
	//styling table (assigning red/green colour)
	function gridDataBound(e) {
		var data = e.target.dataSource.view;
		var rows = e.target.contentTable.find(">tbody>tr");
		for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (item.message == thresholdMsg) {
                $(rows[i].cells[3]).addClass("red");
            }
            if (item.message == msg) {
                $(rows[i].cells[3]).addClass("green");
            }
        }
    }
		
	if(tableData.length == 5){
						for(var i=0; i<(tableData.length)-1; i++){
							tableData[i]= tableData[i+1];
						}
						tableData[4]={
							key: "internalTemperature",
							value: "128"
						};
					}
					else{
						tableData.push({
							key: "internalTemperature",
							value: "128"
						});
					}	
					
		tableDataReverse = tableData.slice(0);
		tableDataReverse.reverse();
		
		
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
						
						tableData.push({
							key: "Time of reading",
							value: obj.timeOfReading
						});
						tableData.push({
							key: "Internal temperature",
							value: obj.internalTemperature
						});
						tableData.push({
							key: "Daily flow",
							value: obj.dailyFlow
						});
						tableData.push({
							key: "Daily reverse flow",
							value: obj.dailyReverseFlow
						});
						tableData.push({
							key: "Peak flow rate",
							value: obj.peakFlowRate
						});
						tableData.push({
							key: "Peak flow rate time",
							value: obj.peakFlowRateTime
						});
						tableData.push({
							key: "Event time",
							value: obj.eventTime
						});
						
						pressure.push({
							parseInt("453")
						});
						pressure.push({
							parseInt("452")
						});
						pressure.push({
							parseInt("451")
						});
						pressure.push({
							parseInt("450")
						});
						pressure.push({
							parseInt("449")
						});
						pressure.push({
							parseInt("448")
						});
						
						
			pressurerev = pressure.slice(0)	;
			pressurerev.reverse;
			tableDataReverse = tableData.slice(0);
			tableDataReverse.reverse();
		
			refreshGird();
			}
		catch (err) {
		  console.error(err);
		}
	}
});