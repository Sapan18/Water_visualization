$(document).ready(function () {
	
	//variables declaration
	var tableData=[], tableDataReverse=[];
	
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
                    data: [630, 400, 743, 503, 702, 383]
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
	
});