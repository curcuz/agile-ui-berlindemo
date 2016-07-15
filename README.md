# agile-ui-berlindemo
A **[resin.io](https://resin.io)** application that aims to showcase the *Agile-IoT* potential.

Protocols covered:
* BLE

Devices covered:
* rpi (zero), rpi2, rpi3
* [TI Sensor TAG 2 (SimpleLink)](http://www.ti.com/tool/cc2650stk)


[Agile-IoT](http://www.agile-project-iot.eu/) + [InfluxDB](https://influxdata.com/) + [Grafana](http://grafana.org/)

## Required configuration environment variables
Name | Value
------------ | -------------
**RESIN_SUPERVISOR_DELTA** | `1`
**RESIN_HOST_CONFIG_disable_splash** | `1`
**RESIN_HOST_CONFIG_disable_overscan** | `1`

## Environment variables
Name | Default | description
------------ | ------------- | -------------
**AGILE_CLIENT_PORT** | `1337` | the port on which is exposed the static server for the **Agile UI**
**AGILE_SERVER_PORT** | `8000` | the port on which is exposed the **Agile** gateway server.
**DATA_SERVER_PORT** | `3000` | the port on which is exposed the **Data** (InfluxDB) middleware server.

## License

Copyright 2016 Rulemotion Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
