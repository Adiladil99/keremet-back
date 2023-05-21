import React, { useEffect, useState } from 'react'
import { Label, Box, DropZone, BasePropertyProps } from '@adminjs/design-system'
import { ApiClient } from 'adminjs'

const Edit = (props: BasePropertyProps) => {
  const { property, onChange, record, msg } = props
  const [data, setData] = useState(null)
  const [parentId, setParentId] = useState(null)
  const api = new ApiClient()
  
  if(record?.populated?.parentId?.params.name) {

    useEffect(() => {
    api.resourceAction({
      resourceId: 'translates', 
      actionName: 'search',
      params: {
        'filters.id': record?.populated?.parentId?.params.name
      }
    })
      .then((response) => {       
        setData(response.data.records[0].params) // { message: 'Hello World' }
      })
      .catch((error) => {
       // handle any errors
      });
    }, [record?.populated?.parentId?.params.name])

  }
  console.log(data);
  
  return (
    <Box marginBottom="xxl">
      <Label>Родительская категория</Label>
      <a className='reference-value__StyledLink-sc-1ujousf-0 hjMVLh' href={"/admin/resources/categories/records/"+record?.populated?.parentId?.params.id+"/show"}>{data?.ru}</a>
    </Box> 
  )
}

export default Edit