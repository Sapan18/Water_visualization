$(document).ready(function () {
	
	//variables declaration
	var tableData=[], tableDataReverse=[];
	
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