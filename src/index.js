import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { Grid, TextField, InputAdornment, Button } from '@material-ui/core'

export default class SendText extends Component {
  constructor(props) {
    super(props)

    this.state = {
      number: '',
      message: '',
      numberError: false,
      messageError: false
    }

    const { numberProps, messageProps } = this.props

    this.numberProps = {
      label: numberProps.label !== undefined ? numberProps.label : 'Number',
      errorMessage:
        numberProps.errorMessage !== undefined
          ? numberProps.errorMessage
          : 'Number is required.'
    }

    this.messageProps = {
      label: messageProps.label !== undefined ? messageProps.label : 'Message',
      errorMessage:
        messageProps.errorMessage !== undefined
          ? messageProps.errorMessage
          : 'Message is required.',
      placeholder:
        messageProps.placeholder !== undefined
          ? messageProps.placeholder
          : 'Enter message..'
    }
  }

  handleSend = () => {
    const { number, message } = this.state

    const { onSubmit } = this.props

    this.setState({ numberError: number === '', messageError: message === '' })

    onSubmit()
  }

  render() {
    const { numberProps, messageProps } = this

    const { countryCode } = this.props

    const { number, message, numberError, messageError } = this.state

    return (
      <>
        <Grid container alignItems='flex-start' spacing={3}>
          <Grid item>
            <TextField
              required
              label={numberProps.label}
              defaultValue={number}
              variant='outlined'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    +{countryCode}
                  </InputAdornment>
                )
              }}
              color='lightBlue'
              error={numberError}
              helperText={numberError ? numberProps.errorMessage : ''}
              onChange={(e) =>
                this.setState({ number: `+${countryCode}${e.target.value}` })
              }
            />
          </Grid>
        </Grid>
        <Grid container alignItems='flex-start' spacing={3}>
          <Grid item xs sm={8} md={6} lg={4} xl={2}>
            <TextField
              required
              label={messageProps.label}
              defaultValue={message}
              multiline
              rows={6}
              placeholder={messageProps.placeholder}
              variant='outlined'
              color='lightBlue'
              fullWidth
              error={messageError}
              helperText={messageError ? messageProps.errorMessage : ''}
              onChange={(e) => this.setState({ message: e.target.value })}
            />
          </Grid>
        </Grid>
        <Grid container alignItems='flex-start' spacing={3}>
          <Grid item xs={2}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => this.handleSend()}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

SendText.defaultProps = {
  numberProps: {
    label: 'Number',
    errorMessage: 'Number is required.'
  },
  messageProps: {
    label: 'Message',
    errorMessage: 'Message is required.',
    placeholder: 'Enter message..'
  }
}

SendText.propTypes = {
  onSend: PropTypes.func.isRequired
}
