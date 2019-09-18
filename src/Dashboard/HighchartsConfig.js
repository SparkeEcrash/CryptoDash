//https://www.highcharts.com/demo/line-basic
//Click the "Edit in JSFiddle" to access the Javascript files where you can
//see the configuration object like the one listed below

//do "yarn add react-highcharts" to install the package

//ACCESS THEMES WITH 
//https://www.highcharts.com/docs/
//Click CHART DESIGN AND STYLE in left nav menu
//Click THEMES

//OR CHECK GITHUBPAGE
//https://github.com/highcharts/highcharts/tree/master/js/themes

//Make sure to set 
/*	credits: {
	enabled: false
},*/
//in HighchartsTheme.js to remove the HighCharts credit tag at bottom right of graph

export default function(historical) {
	return {
    title: {
        text: ''
    },

    yAxis: {
        title: {
            text: 'Price'
        }
		},
		xAxis: {
			type: 'datetime'
		},
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },

    series: historical,

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
		}
	};
}