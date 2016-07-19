import React, { Component, PropTypes } from 'react'
import {CardHeader} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import randomMC from 'random-material-color'

export default class DeviceBasicInfo extends Component {

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    path: PropTypes.string
  }

  componentWillMount() {
    this.setState({color: randomMC.getColor()})
  }

  render () {
    return (
      <CardHeader
        title={this.props.name}
        subtitle={this.props.path}
        avatar={<Avatar backgroundColor={this.state.color}>{this.props.name ?  this.props.name.charAt(0): '' }</Avatar>}
      />
    )
  }
}
