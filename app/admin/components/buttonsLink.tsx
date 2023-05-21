import React, { useEffect, useState } from 'react'
import { Label, Box, FormGroup, BasePropertyProps, RichTextEditor, StoryWrapper, Button, Input } from '@adminjs/design-system'
import { ApiClient } from 'adminjs'
import { Link} from 'react-router-dom';

const Edit: React.FC<BasePropertyProps> = (props) => {
  const { record } = props
  console.log('property', record.params);
    
  return (
    <Box position={'absolute'} right={20}>
      <Link to={"/admin/resources/pharmacy_addresses?filters.pharmacyId="+record.params.id}>
        <Button type={'button'} mr={5} mb={20} >
          Адресы
        </Button>
      </Link>
      <Link to={"/admin/resources/pharmacy_inventories?filters.pharmacyAddressId="+record.params.id}>
        <Button type={'button'} mr={5} mb={20} >
          Товары
        </Button>
      </Link>
      <Link to={"/admin/resources/adv_pharmacies?filters.pharmacyId="+record.params.id}>
        <Button type={'button'} mr={5} mb={20} >
          Подписки
        </Button>
      </Link>
      <Link to={"/admin/resources/pharmacies_users?filters.pharmacyId="+record.params.id}>
        <Button type={'button'} mr={5} mb={20} >
          Сотрудники
        </Button>
      </Link>
    </Box>
  )
}

export default Edit