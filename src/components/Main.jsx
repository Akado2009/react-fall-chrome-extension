/*global chrome*/

import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'

import { moduleName, changeType, start, stop, changeBackgroundColor, changeColor } from '../ducks/main'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'

import ColorPicker from 'material-ui-color-picker'


import Switch from '@material-ui/core/Switch'

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    listItem: {
        padding: 10
    },
    button: {
        margin: theme.spacing.unit
    }
})

const mapStateToProps = state => {
    return {
        types: state[moduleName].types,
        currentType: state[moduleName].currentType,
        backgroundColor: state[moduleName].backgroundColor,
        color: state[moduleName].color
    }
}
const Main = (props) => {

    const { classes } = props

    const handleChange = name => event => {
        props.changeType(event.target.value)
    }

    const changeColor = color => {
        props.changeColor(color)
    }

    const changeBackgroundColor = color => {
        props.changeBackgroundColor(color)
    }

    const start = () =>{
        chrome.tabs.query({
            active: true,
            currentWindow: true,
          }, (tabs) => {
            // Send message to script file
            chrome.tabs.sendMessage(
              tabs[0].id,
              { startApp: true,
                backgroundColor: props.backgroundColor,
                color: props.color
              },
              response => window.close()
            );
        });
    }

    const stop = () =>{
        chrome.tabs.query({
            active: true,
            currentWindow: true,
          }, (tabs) => {
            // Send message to script file
            chrome.tabs.sendMessage(
              tabs[0].id,
              { stopApp: true
              },
              response => window.close()
            );
        });
    }

    return (
        <div className={classes.root}>
            <List>
            {
                props.types.map((type, i) => {
                    return (
                        <ListItem key={type} dense divider={true} className={classes.listItem}>
                            {/* <Avatar alt="Remy Sharp" src="/static/images/remy.jpg" /> */}
                            <ListItemText primary={`${type}`} />
                            <ListItemSecondaryAction>
                            <Switch
                                checked={props.currentType === type}
                                onChange={handleChange(type)}
                                value={type}
                                color="primary"
                            />
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                })
            }
            </List>
            <div style={{ textAlign: 'center' }}>
                <ColorPicker
                    name='color'
                    value={props.color}
                    onChange={changeColor}
                />
                <ColorPicker
                    name='color'
                    value={props.backgroundColor}
                    onChange={changeBackgroundColor}
                />
            </div>
            <div style={{ textAlign: 'center' }}>
                <Button id="stop" onClick={stop} variant="contained" color="primary" className={classes.button}>
                    Stop
                </Button>
                <Button id="start" onClick={start} variant="contained" color="primary" className={classes.button}>
                    Start
                </Button>
            </div>
        </div>
    )
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(
    connect(mapStateToProps, { changeType, start, stop, changeColor, changeBackgroundColor })(Main)
)