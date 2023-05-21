
import React from 'react'
import { Box, BasePropertyProps, Label } from '@adminjs/design-system'

const Edit: React.FC<BasePropertyProps> = (props) => {
  const { record } = props

  const srcImg = record.params['image']
  return (
    <Box marginBottom="xxl">
      <Label>Иконка категорий</Label>
      {srcImg ? (
        <img src={srcImg} width="100px"/>
      ) : 'no image'}
    </Box>
  )
}

export default Edit