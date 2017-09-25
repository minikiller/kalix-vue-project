module.exports = {
  bar: {
    chart: {
      type: 'column',
      options3d: {
        enabled: false,
        alpha: 0,
        beta: 0
      }
    },
    title: {
      text: '展示不同类型作品数量'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      allowDecimals: false,
      title: {
        text: '数量'
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y}'
        }
      }
    },
    series: [
    ],
    pointInterval: 1
  }
}
