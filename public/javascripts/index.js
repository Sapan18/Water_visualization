$(document).ready(function () {
	
	//variables declaration
	var tableData=[], tableDataReverse=[]; timeData = []; waterData=[];
	
	//Display empty chart initially
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
                    data: [0, 0, 0, 0, 0, 0]
                }, {
                    seriesType: "bar",
                    collectionAlias: "Temperature",
                    data: [0, 0, 0, 0, 0, 0]
                }, {
                    seriesType: "bar",
                    collectionAlias: "Vibration",
                    data: [0, 0, 0, 0]
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
			columns: [{ field: "key", title: "Key", attributes: {style: "text-align: center; font-size: 14px"}, headerAttributes: { style: "text-align: center; font-size: 16px"}},
                { field: "value", title: "Value", attributes: {style: "text-align: center; font-size: 14px"}, headerAttributes: { style: "text-align: center; font-size: 16px"}}]
        });
        
    //Axis marker for interval flow   
	$("#line").shieldChart({
            theme: "light",
            primaryHeader: {
                text: "Interval Flow"
            },
            exportOptions: {
                image: false,
                print: false
            },
            axisX: {
                categoricalValues: []
            },
            tooltipSettings: {
                chartBound: true,
                axisMarkers: {
                    enabled: true,
                    mode: 'xy'
                }                    
            },
            dataSeries: [{
                seriesType: 'area',
                collectionAlias: "Budget in Thousands",
                data: []
            }]
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
		
    //data for line chart
	var data = {
		labels: timeData,
		datasets: [
		{
			fill: false,
			label: 'Water Reading',
			yAxisID: 'WaterData',
			borderColor: "rgba(255, 204, 0, 1)",
			pointBoarderColor: "rgba(255, 204, 0, 1)",
			backgroundColor: "rgba(255, 204, 0, 0.4)",
			pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",
			pointHoverBorderColor: "rgba(255, 204, 0, 1)",
			data: waterData
		}
		]
    }
    
    //options for line chart
	var basicOption = {
		title: {
			display: true,
			text: 'Flash Test Live Water Data',
			fontSize: 36
		},
		scales: {
			yAxes: [{
				id: 'WaterData',
				type: 'linear',
				scaleLabel: {
					labelString: 'Water Interval',
					display: true
				},
				position: 'left',
			}]
		}
	}
    
    //Get the context of the canvas element for line chart
	var ctx = document.getElementById("myChart").getContext("2d");
	var optionsNoAnimation = { animation: false }
	var myLineChart = new Chart(ctx, {
		type: 'line',
		data: data,
		options: basicOption
	});

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
                    data: [parseInt(obj.pressure[0].Value), parseInt(obj.pressure[1].Value), parseInt(obj.pressure[2].Value), parseInt(obj.pressure[3].Value), parseInt(obj.pressure[4].Value), parseInt(obj.pressure[5].Value)]
                }, {
                    seriesType: "bar",
                    collectionAlias: "Temperature",
                    data: [parseInt(obj.temp[0].Value), parseInt(obj.temp[1].Value), parseInt(obj.temp[2].Value), parseInt(obj.temp[3].Value), parseInt(obj.temp[4].Value), parseInt(obj.temp[5].Value)]
                }, {
                    seriesType: "bar",
                    collectionAlias: "Vibration",
                    data: [parseInt(obj.vibration[0].Value), parseInt(obj.vibration[1].Value), parseInt(obj.vibration[2].Value), parseInt(obj.vibration[3].Value)]
                }]
            });
						
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
						
			//Axis marker for interval flow   
			$("#line").shieldChart({
            theme: "light",
            primaryHeader: {
                text: "Interval Flow"
            },
            exportOptions: {
                image: false,
                print: false
            },
            axisX: {
                categoricalValues: []
            },
            tooltipSettings: {
                chartBound: true,
                axisMarkers: {
                    enabled: true,
                    mode: 'xy'
                }                    
            },
            dataSeries: [{
                seriesType: 'area',
                collectionAlias: "Budget in Thousands",
                data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]
            }]
        });
						
								
			tableDataReverse = tableData.slice(0);
		
			//refreshGird();
			
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
                { field: "key", title: "Key", attributes: {style: "text-align: center; font-size: 14px"}, headerAttributes: { style: "text-align: center; font-size: 16px"}},
                { field: "value", title: "Value", attributes: {style: "text-align: center; font-size: 14px"}, headerAttributes: { style: "text-align: center; font-size: 16px"}}
            ]
            });
        
            timeData.push(obj.timeOfReading);
            waterData = parseFloat(obj.water[0].Value);
            
            // only keep no more than 50 points in the line chart
				var len = timeData.length;
				if (len > 50) {
                    timeData.shift();			
                    waterData.shift();		
                }
                
            //Update line & pie chart with new received values
				myLineChart.update();
			refreshGird();
			}
		catch (err) {
		  console.error(err);
		}
	}
});