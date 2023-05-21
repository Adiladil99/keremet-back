
import React from 'react'
import { Box, BasePropertyProps } from '@adminjs/design-system'

const MyInput: React.FC<BasePropertyProps> = (props) => {
  const { record } = props

  return (
    <Box position="relative" overflow="hidden" data-css="default-dashboard">
      <input placeholder="new page" />
    </Box>
  )
}

export default MyInput