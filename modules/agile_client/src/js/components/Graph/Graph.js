import React, { Component, PropTypes } from 'react'
import {AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts'
export default class Graph extends Component {

  static propTypes = {
    series: PropTypes.array,
    color: PropTypes.string,
    streamid: PropTypes.string
  }

  renderGraph(series) {
    if (series.length > 0) {
      return (
        <AreaChart width={730} height={250} data={series} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <Area isAnimationActive={false} type="monotone" dataKey="value" stroke={this.props.color} fillOpacity={.5} fill={this.props.color} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </AreaChart>
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
