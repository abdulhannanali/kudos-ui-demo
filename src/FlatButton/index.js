import React from 'react'
import classnames from 'classnames'
import './index.css'

const defaultClickEvent = (event) => event.preventDefault()

export default (({ href, onClick = defaultClickEvent, color = "blue", children}) => {
    const classes = classnames([
        'btn',
        color
    ])

    return (
        <a href="#" onClick={onClick} className={classes}>{children}</a>
    )
})