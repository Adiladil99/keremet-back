import React from 'react';
import { Box, FormGroup, Label, Table, TableBody, TableCell, TableHead, TableRow } from '@adminjs/design-system';
import { flat, useTranslation, BasePropertyProps } from 'adminjs';

const CharacteristicsList = (props: BasePropertyProps) => {
  const { translateLabel } = useTranslation();
  const params = flat.unflatten(props.record.params);
  console.log('asdsad', params);
  

  return (
    <FormGroup mb={24}>
      <Label>Характеристики продукта</Label>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{translateLabel('ID')}</TableCell>
              <TableCell>{translateLabel('Тип характеристики')}</TableCell>
              <TableCell>{translateLabel('Значение')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!params.features?.length && (
              <TableRow>
                <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                  Нет записи
                </TableCell>
              </TableRow>
            )}
            {params.features?.length > 0 &&
              params.features.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.attribute.name}</TableCell>
                  <TableCell>{item.attribute_value.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </FormGroup>
  );
};

export default CharacteristicsList;
