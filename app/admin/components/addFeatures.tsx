import React, { useEffect, useState } from 'react';
import { Box, FormGroup, SelectAsync, Label, Table, TableBody, TableCell, TableHead, TableRow } from '@adminjs/design-system';
import { flat, useTranslation, BasePropertyProps, ApiClient } from 'adminjs';

const AddFeatures = (props: BasePropertyProps) => {
  const { translateLabel } = useTranslation();
  const params = flat.unflatten(props.record.params);
  const [data, setData] = useState(null)
  const [features, setFeatures] = useState([])
  const api = new ApiClient()

  useEffect(() => {
    api.searchRecords({ resourceId: 'category_characteristics', query: '' })
      .then((response) => {
        setData(response) // { message: 'Hello World' }
      })
      .catch((error) => {
        // handle any errors
      });
  }, []);

  const checkFeatures = async (event) => {
    const idx = features.findIndex(element => element.id === event.id)
    idx < 0 ? setFeatures(oldArray => [...oldArray, event]) : setFeatures(features.filter(elem => elem.id !== idx))
    console.log(idx);
    // return idx < 0 ? oldArray.push({id: item.id, value: elem.id}) : oldArray[idx].value = elem.id ])
  }

  console.log('paramsFeatures', features)

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
            {!params.character?.length && (
              <TableRow>
                <TableCell>
                  1
                </TableCell>
                <TableCell>
                  Дисплей
                </TableCell>
                <TableCell>
                  <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </TableCell>
              </TableRow>
            )}
            {params.character?.length > 0 &&
              params.character.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                      <SelectAsync
                        cacheOptions
                        value={item.attribute_values[0]}
                        onChange={(e) => checkFeatures({id: item.id, value: e.value})}
                        defaultOptions = {item.attribute_values.map(item => {return {value: item.id, label: item.name} })}
                        isClearable
                      />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </FormGroup>
  );
};

export default AddFeatures;
