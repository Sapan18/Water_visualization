$(document).ready(function () {
	
	//variables declaration
	var gridData=[];
	
	$("#grid").shieldGrid({
            dataSource: {
				data: gridData
			},
			events: {
			dataBound: gridDataBound
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
		
	gridData.push({
		key: "internalTemperature",
		value: "128"
	});
});