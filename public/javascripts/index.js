$(document).ready(function () {
	
	//variables declaration
var tableData=[], tableDataReverse=[];



//Axis marker for interval flow
    $(document).ready(function () {
        $("#chart").shieldChart({
            theme: "light",
            primaryHeader: {
                text: "Interval Flow"
            },
            exportOptions: {
                image: false,
                print: false
            },
            axisX: {
                categoricalValues: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009"]
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
                data: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48"]
            }]
        });
    });
});