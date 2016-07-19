import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Device, NoResults } from '../../components'
import { bindActionCreators } from 'redux'
import { deviceDelete, deviceStreamFetch } from '../../actions/device'

class DeviceApp extends Component {

  static propTypes = {
    device: PropTypes.object.isRequired,
    actions: PropTypes.array.isRequired
  }

  render () {
    const { device: { item, loading, error }, actions, deviceStreamFetch } = this.props
    if (error) {
      return (<NoResults text='Something went wrong'/>)
    } else if (item.length < 1) {
      return (<NoResults text='No device found'/>)
    } else {
      return (<Device
        device={item}
        actions={actions}
        loading={loading}
        error={error}
        deviceStreamFetch={deviceStreamFetch}
        />)
    }
  }
}

function mapStateToProps(state) {
  return {
    device: state.device
  }
}

function mapDispatchToProps(dispatch) {
  let actions = [{
    text: 'Delete',
    func:  bindActionCreators(deviceDelete, dispatch)
  }]
  return {
    actions: actions,
    deviceStreamFetch: bindActionCreators(deviceStreamFetch, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceApp)
