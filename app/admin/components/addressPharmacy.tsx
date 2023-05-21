
import React from 'react'
import { Box, BasePropertyProps } from '@adminjs/design-system'

const AddressPharmacy: React.FC<BasePropertyProps> = (props) => {
  const { record } = props

  return (
    <Box position="relative" overflow="hidden" data-css="default-dashboard">
      <input placeholder="new page" />
    </Box>
  )
}

export default AddressPharmacy