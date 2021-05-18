export default (gradientFill) => ({
  type: 'line',
  data: {
    labels: ['Team Red', 'Team Blue', 'Team Yellow', 'Team Green', 'Team Purple', 'Team Orange'],
    datasets: [{
      label: 'Daily',
      fill: true,
      backgroundColor: gradientFill,
      fillColor: 'rgba(220,220,220,0.2)',
      borderColor: '#a3a0fb',
      pointBackgroundColor: '#b1aff9',
      pointBorderColor: '#a3a0fb',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(220,220,220,1)',
      data: [2, 3, 5, 7, 11, 13, 17, 19, 23, 5]
    },
    {
      label: 'Month',
      fillColor: 'rgba(151,187,205,0.2)',
      borderColor: '#55d7fc',
      pointColor: 'rgba(151,187,205,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(151,187,205,1)',
      data: [5, 4, 3, 2, 3, 5, 8, 13, 21, 25]
    },
    {
      label: 'Target',
      fillColor: 'rgba(151,187,205,0.2)',
      borderColor: '#b456b5',
      pointColor: 'rgba(151,187,205,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(151,187,205,1)',
      data: [10, 5, 3, 2, 3, 9, 13, 7, 6, 3]
    },
    {
      label: 'Total',
      fillColor: 'rgba(151,187,205,0.2)',
      borderColor: '#57b639',
      pointColor: 'rgba(151,187,205,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(151,187,205,1)',
      data: [22, 4, 2, 5, 15, 20, 16, 13, 12, 5]
    }]

  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
})
