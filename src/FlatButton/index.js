import React from 'react'
import classnames from 'classnames'
import './index.css'

const noop = () => {}

export default (({ href, onClick = noop, color = "blue", children}) => {
    const classes = classnames([
        'btn',
        color
    ])

    return (
        <a href={href} onClick={onClick} className={classes}>{children}</a>
    )
})