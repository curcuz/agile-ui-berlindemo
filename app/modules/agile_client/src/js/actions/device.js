// Any deviceList triggers go here
import * as types from '../constants/ActionTypes'
import { BASE_API, DATA_API } from '../constants/Endpoints'

// these function act as trigger functions to run sagas. They should only be called when a user interacts with the page.
// route handling triggers only occur when

export function deviceFetch(deviceId) {
  return {
    type: types.DEVICE_FETCH,
    method: 'GET',
    url: `${BASE_API}/devices/${deviceId}`,
    body: null
  }
}

export function deviceDelete(device) {
  return {
    type: types.DEVICE_DELETE,
    method: 'DELETE',
    url: `${BASE_API}/devices/${device.id}`,
    body: null,
    confirm: true,
    confirmation: 'Device successfully Deleted'
  }
}

export function deviceStreamFetch(device, stream, limit) {
  console.log('ACTIONS', limit)
  return {
    type: types.DEVICE_STREAM_FETCH,
    method: 'GET',
    url: `${DATA_API}/buckets/${device.id}/${stream.id}/data/${limit}`,
    body: null,
    stream: stream.id, // this is so we don't have to extract the id from the url in the reducer
    limit: limit
  }
}
