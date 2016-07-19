import React, { Component, PropTypes } from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import randomMC from 'random-material-color'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Graph from '../Graph/Graph'

export default class DeviceStream extends Component {

  static propTypes = {
    id: PropTypes.string,
    unit: PropTypes.string,
    color: PropTypes.string,
    limit: PropTypes.number,
    series: PropTypes.array
  }

  componentWillMount() {
    this.setState({color: randomMC.getColor()})
  }

  render () {
    const childNode = <p>Last updated {this.props.lastUpdate ?  this.props.lastUpdate.date: '' }:  unit: {this.props.unit}</p>
    return (
      <Card>
        <CardHeader
          title={this.props.id}
          subtitle={childNode}
          avatar={<Avatar backgroundColor={this.state.color}>
          {this.props.lastUpdate ?  this.props.lastUpdate.value: '' }</Avatar>}
        />
      <CardText>
        <SelectField value={this.props.limit}
          onChange={(event, index, value) => this.props.deviceStreamFetch(this.props.device, this.props, value)}>
            <MenuItem value={10} primaryText="Hour" />
            <MenuItem value={50} primaryText="Day" />
            <MenuItem value={100} primaryText="Week" />
          </SelectField>
        <Graph series={this.props.series} streamid={this.props.id} color={this.state.color} />
      </CardText>
      </Card>
    )
  }
}
