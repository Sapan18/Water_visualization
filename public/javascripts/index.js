$(document).ready(function () {
	
	$("#chart").shieldChart({
                theme: "light",
                exportOptions: {
                    image: false,
                    print: false
                },
                primaryHeader: {
                    text: "Internet usage statistics"
                },
                zoomMode: "xy",
                seriesSettings: {
                    bar: {
                        barOffset: 0
                    }
                },
                axisX: {
                    categoricalValues: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
                },
                axisY: {
                    title: {
                        text: "Visitor statistics"
                    }
                },
                dataSeries: [{
                    seriesType: "bar",
                    collectionAlias: "Total Visits",
                    data: [565000, 630400, 743000, 910200, 1170200, 1383000]
                }, {
                    seriesType: "bar",
                    collectionAlias: "Unique Visits",
                    data: [152000, 234000, 123000, 348000, 167000, 283000]
                }]
            });
});