import React from 'react'
import {StyledP} from './styles' 
import PropTypes from 'prop-types'

export const P = (props) => {
    return <StyledP>
        {props.children}
    </StyledP>
}

P.defaultProps = {
    bold: false
}

P.propTypes = {
    bold: PropTypes.bool
}