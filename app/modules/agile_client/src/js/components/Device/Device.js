import React, { Component, PropTypes } from 'react'
import { Card } from 'material-ui/Card'
import DeviceBasicInfo from './DeviceBasicInfo'
import Loading from '../Loading/Loading'
import DeviceStream from './DeviceStream'
import DeviceActions from './DeviceActions'

export default class Device extends Component {

  static propTypes = {
    loading: PropTypes.string,
    actions: PropTypes.array,
    device: PropTypes.object
  }

  renderStreams(streams) {
    // renders each devices stream
    if (streams)
      return streams.map((stream, index) =>
        (
          <DeviceStream
            key={index}
            id={stream.id}
            unit={stream.unit}
            limit={stream.limit}
            lastUpdate={stream.lastUpdate}
            series={stream.series ?  stream.series: []}
            deviceStreamFetch={this.props.deviceStreamFetch}
            device={this.props.device}
            />
        )
      )
  }
  render () {
    return (
      <div>
        <Card>
          <Loading loading={this.props.loading} />
          <DeviceBasicInfo
            id={this.props.device.id}
            name={this.props.device.name}
            path={this.props.device.path}
          />
          <DeviceActions
            device={this.props.device}
            actions={this.props.actions}
          />
        </Card>
      {this.renderStreams(this.props.device.streams)}
      </div>
    )
  }
}
