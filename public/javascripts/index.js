$(document).ready(function () {
	
	//variables declaration
    var tableData=[], tableDataReverse=[]; timeData = []; waterData=[];
    var flag1=true;

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
    
    
            
        
    
		
	//updating table (live)
    function refreshGird() {
        var grid = $("#grid").swidget(),
            options  = grid.initialOptions;
        options.dataSource = {
            data: tableDataReverse
        };
        grid.refresh(options);
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
			label: 'Water Meter Reading',
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
			text: 'Live Water Data',
			fontSize: 36
		},
		scales: {
			yAxes: [{
				id: 'WaterData',
				type: 'linear',
				scaleLabel: {
					labelString: 'Water reading',
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
            
            if(flag1){
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
                        tableData.push({
							key: "Low Flow Alarm",
							value: obj.lowFlowAlarm
                        });
                        tableData.push({
							key: "High Flow Alarm",
							value: obj.highFlowAlarm
                        });
                        tableData.push({
							key: "Tamper Alarm",
							value: obj.tamperAlarm
                        });
                        tableData.push({
							key: "Low Battery Alarm",
							value: obj.lowBatteryAlarm
                        });
                        tableData.push({
							key: "Battery Run Out Alarm",
							value: obj.batteryRunOutAlarm
                        });
                        tableData.push({
							key: "High Internal Temperature",
							value: obj.highInternalTemperature
                        });
                        tableData.push({
							key: "Reverse Flow Alarm",
							value: obj.reverseFlowAlarm
                        });
                        tableData.push({
							key: "High Pressure Alarm",
							value: obj.highPressureAlarm
                        });
                        tableData.push({
							key: "Low Pressure Alarm",
							value: obj.lowPressureAlarm
                        });
                        tableData.push({
							key: "High Temperature Alarm",
							value: obj.highTemperatureAlarm
                        });
                        tableData.push({
							key: "Low Temperature Alarm",
							value: obj.lowTemperatureAlarm
                        });
                        tableData.push({
							key: "Inner Error Alarm",
							value: obj.innerErrorAlarm
                        });
                        tableData.push({
							key: "Storage Fault",
							value: obj.storageFault
                        });
                        tableData.push({
							key: "Water Temprature Sensor Fault",
							value: obj.waterTempratureSensorFault
                        });
                        tableData.push({
							key: "Pressure Sensor Fault",
							value: obj.pressureSensorFault
                        });
                        tableData.push({
							key: "Vibration Sensor Fault",
							value: obj.vibrationSensorFault
                        });
                        tableData.push({
							key: "Stray Current",
							value: obj.strayCurrent
                        });
                        tableData.push({
							key: "Inner Temprature Sensor Fault",
							value: obj.innerTempratureSensorFault
                        });                
					
								
			tableDataReverse = tableData.slice(0);
		
			
			
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
            $("#grid").swidget().hideColumn("key1");
            $("#grid").swidget().hideColumn("value1");
            flag1=false;
            
            }
            timeData.push(obj.currentTime);
            waterData.push(parseFloat(obj.water[0].Value));             
            
            // only keep no more than 50 points in the line chart
				var len = timeData.length;
				if (len > 100) {
                    timeData.shift();			
                    waterData.shift();		
                }
                
            //Update line & pie chart with new received values
				myLineChart.update();
			
			}
		catch (err) {
		  console.error(err);
		}
	}
});