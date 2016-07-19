import React, { Component, PropTypes } from 'react'
import NVD3Chart from 'react-nvd3'

export default class Graph extends Component {

  static propTypes = {
    series: PropTypes.array,
    color: PropTypes.string,
    streamid: PropTypes.string
  }

  renderGraph(series) {
    let datum = [{
          key: this.props.streamid,
          values: series
        }]
    if (series.length > 0) {
      return (
      <NVD3Chart
      id="barChart"
      type="barChart"
      showValues="true"
      datum={datum}
      x="date"
      y="value"
      tooltip={{enabled: true}}
      containerStyle={'width: 100% !important'}
      />
      )
    }
  }
  render () {
    return (
      <div>
      {this.renderGraph(this.props.series)}
      </div>
    )
  }
}
