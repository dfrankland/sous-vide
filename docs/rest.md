# Anova REST API

These commands and notes have been extracted from the Anova Culinary app v2.1.0
APK after sniffing traffic from the app.

## API Endpoints

### `api.anovaculinary.com/cookers/${idCard}`

```js
`https://api.anovaculinary.com/cookers/${idCard}?secret=${secretKey}&requestKey=${unixTimeStamp}`
```

#### API Calls

##### GET

Returns the current status of the Anova device.

Example response body, without a job running:

```json
{
  "status": {
    "cooker_id": "anova f00-00000000000",
    "is_running": false,
    "current_temp": 70.6,
    "target_temp": 145,
    "temp_unit": "f",
    "speaker_mode": true,
    "alarm_active": false
  }
}
```

Example response body, with a job running:

```json
{
  "status": {
    "cooker_id": "anova f00-00000000000",
    "is_running": true,
    "current_temp": 160,
    "target_temp": 160,
    "temp_unit": "f",
    "speaker_mode": true,
    "current_job_id": "f0000000-0000-0000-0000-000000000000",
    "current_job": {
      "job_id": "f0000000-0000-0000-0000-000000000000",
      "job_type": "manual_cook",
      "job_stage": "cooking",
      "is_running": true,
      "target_temp": 160,
      "temp_unit": "f",
      "timer_length": 2880,
      "job_start_time": "2017-04-24T04:21:19.750381Z",
      "job_update_time": "2017-04-24T04:21:20.750383Z",
      "max_circulation_interval": 600,
      "threshold_temp": 40,
      "job_info": null
    },
    "alarm_active": true
  }
}
```

##### POST

Sets the status of the Anova device to that of the properties sent. Returns the
newly updated status in the response.

Example request body:

```json
{
  "target_temp": 150.0,
  "temp_unit": "f"
}
```

Example response body:

```json
{
  "status": {
    "cooker_id": "anova f00-00000900000",
    "is_running": false,
    "current_temp": 70.6,
    "target_temp": 150,
    "temp_unit": "f",
    "speaker_mode": true,
    "alarm_active": false
  }
}
```

### `api.anovaculinary.com/cookers/${idCard}/jobs`

```js
`https://api.anovaculinary.com/cookers/${idCard}/jobs?secret=${secretKey}&requestKey=${unixTimeStamp}`
```

#### API Calls

##### GET

Returns a list of all jobs run.

Example:

```json
{
  "jobs": [
    {
      "job_id": "f0000000-0000-0000-0000-000000000000",
      "job_type": "manual_cook",
      "job_stage": "preheating",
      "is_running": true,
      "target_temp": 129,
      "temp_unit": "f",
      "timer_length": 3600,
      "job_start_time": "2017-04-20T05:10:35.414946Z",
      "job_update_time": "2017-04-20T05:10:36.414948Z",
      "max_circulation_interval": 600,
      "threshold_temp": 40,
      "job_info": {
        "display_item_identifier": "668",
        "duration": 3600,
        "job_type": "manual_cook",
        "source": "1",
        "source_identifier": "668",
        "temperature": 129,
        "temperature_unit": "F"
      }
    },
    {
      "job_id": "f0000000-0000-0000-0000-000000000001",
      "job_type": "manual_cook",
      "job_stage": "completed",
      "is_running": false,
      "completion_type": "canceled",
      "target_temp": 100,
      "temp_unit": "f",
      "job_start_time": "2017-04-20T05:03:01.904247Z",
      "job_update_time": "2017-04-20T05:03:02.90425Z",
      "max_circulation_interval": 600,
      "threshold_temp": 40,
      "job_info": null
    }
  ]
}
```

##### POST

Send a request to start a new job.

*   `job_info`: An object with any number of custom properties. **These will be
    saved to the job history so be careful what you put in there!** Typically
    used to set a specific recipe by the Anova app (the
    `display_item_identifier` / `source_identifier` is the ID of the recipe and
    one could assume that `source` is where the recipe ID came from). The value
    will default to `null` if no object is given.

    Example object:

    ```json
    {
      "duration": 3600,
      "display_item_identifier": "668",
      "job_type": "manual_cook",
      "source": "1",
      "temperature": 129.0,
      "temperature_unit": "F",
      "source_identifier": "668"
    }
    ```

*   `job_type`: A required value which doesn't seem to ever be different than
    `manual_cook`.

*   `target_temp`: A temperature to preheat and cook at. Can be a float with one
    decimal place of precision (rounds up small decimals).

*   `temp_unit`: A temperature unit `f` or `c` for Fahrenheit or Celsius
    respectively. This is usually sent along with `target_temp` by the Anova
    app.

*   `timer_length`: The length of time in seconds to cook after the water has
    been preheated. Required.

*   `threshold_temp`: Not really sure what this is, but it's a configurable
    integer.

*   `max_circulation_interval`: Not really sure what this is either, but it's
    also a configurable integer.

Example request body:

```json
{
  "job_info": {
    "display_item_identifier": "668",
    "duration": 3600,
    "job_type": "manual_cook",
    "source": "1",
    "source_identifier": "668",
    "temperature": 129,
    "temperature_unit": "F"
  },
  "job_type": "manual_cook",
  "target_temp": 129.0,
  "temp_unit": "f",
  "timer_length": 3600
}
```

Example response body:

```json
{
  "job": {
    "job_id": "f0000000-0000-0000-0000-000000000002",
    "job_type": "manual_cook",
    "job_stage": "preheating",
    "is_running": true,
    "target_temp": 129,
    "temp_unit": "f",
    "timer_length": 3600,
    "job_start_time": "2017-04-20T05:10:35.414946Z",
    "job_update_time": "2017-04-20T05:10:36.414948Z",
    "max_circulation_interval": 600,
    "threshold_temp": 40,
    "job_info": {
      "display_item_identifier": "668",
      "duration": 3600,
      "job_type": "manual_cook",
      "source": "1",
      "source_identifier": "668",
      "temperature": 129,
      "temperature_unit": "F"
    }
  }
}
```

*   `job_stage`: indicates the status of the job. So far the possible values
    are:

    *   `preheating`

    *   `cooking`

    *   `completed`

Bad response, if required values are not sent:

```json
{
  "job": null
}
```

## GET / POST Error

If the Anova device is not connected to wifi the, the response will not include
a `status`, `job`, `jobs` or another other normal property, instead it will give
you JSON with an `error` property with an accompanying `code`.

Example error response body:

```json
{
  "error": {
    "code": 404
  }
}
```

## API URL Variables

*   `idCard`: the ID response from the BLE `GET_ID_CARD` command. Should look
    something similar to: `anova f00-a0000d00000`.

*   `secretKey`: the secret key sent from the BLE `SET_NUMBER` command. The
    secret key must be a string of 10 lowercase alphanumeric character. Setting
    this will make your phone "unsync" itself because it will no longer have the
    secret key. It's best to get the secret key from your phone so everything
    works nicely.

*   `unixTimeStamp`: an optional query string parameter using the current Unix
    timestamp.

> NOTE: HTTPS is not enforced or redirected, please make sure to only use HTTPS
> otherwise you are exposing people to prying eyes.
