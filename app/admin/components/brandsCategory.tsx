import React, { useEffect, useState } from 'react';
import { Box, H3 , Text, CheckBox, DrawerContent, Drawer, SelectAsync, FormGroup, Label, Header, Button, Icon,  Table, TableBody, TableCell, TableCaption, TableHead, TableRow } from '@adminjs/design-system';
import { BasePropertyProps } from 'adminjs';
import { ApiClient } from 'adminjs';

const DontTouchThis = (props: BasePropertyProps) => {
  const { record } = props;
  const params = record.params;
  const populated = record.populated.name;
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)

  const [data, setData] = useState(null)
  const [currentValue, setValue] = useState(null)
  const api = new ApiClient()
  let charac = []
  useEffect(() => {
   api.searchRecords({resourceId: 'manufacturers', query: ''})
    .then((response) => {       
      setData(response) // { message: 'Hello World' }
    })
    .catch((error) => {
     // handle any errors
    });
  }, []);
  // var characteristics = api.searchRecords({resourceId: 'category_characteristics', query: ''})
  if(data) {
    data.map(item => {
      charac.push({value: item.params.id, label: item.params.name})
    })
  }

  const addCharacteristics = () => {
    api.resourceAction({resourceId: 'category_manufacturers', actionName: 'new', data: {categoryId: params.id, manufacturerId: currentValue.value}})
    setIsDrawerVisible(false)   
  }
  console.log(params);
  
  return (
    <Box flex>
      {isDrawerVisible && (
        <Drawer>
          <DrawerContent>
            <Header.H3>
              <Button size="icon" rounded mr="lg" onClick={() => setIsDrawerVisible(false)}>
                <Icon icon="ChevronRight" />
              </Button>
              Добавить бренда к категорий
            </Header.H3>
            <Label>Выберите бренда из списка</Label>
            <FormGroup>
              <SelectAsync
                cacheOptions
                value={currentValue}
                defaultOptions = {charac}
                isClearable
                onChange={(e) => {setValue(e)}}
              />
            </FormGroup>
            <Text mt="xl" textAlign="center">
              <Button size="md" ml="md" variant="secondary"  onClick={() => addCharacteristics()}>
                <Icon icon="Add" />
                Добавить
              </Button>
            </Text>
          </DrawerContent>
        </Drawer>
      )}
      <Box variant="white" width={1} boxShadow="card" mr="xxl" flexShrink={0}>
        <Box flex>
          <Box flexGrow={1}>
            <span style={{fontSize: "22px", fontWeight: 600}}>{populated.params.ru}</span>
            <H3>Список всех брендов</H3>
            <Text mb="xxl">Выберите из списка брендов, которая доступна для категорий</Text>
          </Box>
          <Box>
            <a href="/admin/resources/manufacturers">
              <Button size="md" ml="md" variant="secondary">
                <Icon icon="Save" />
                Список брендов
              </Button>
            </a>
            {/* <a href="/admin/resources/category_brands/actions/new"> */}
              <Button size="md" ml="md" variant="info" onClick={() => setIsDrawerVisible(true)}>
                <Icon icon="Save" />
                Добавить бренд к категорий
              </Button>
            {/* </a> */}
          </Box>
        </Box> 
        <Box>
          <Table>
 {/* *   <TableCaption>
 *     <Text as="span">Monthly savings</Text>
 *     <Button variant="text" size="sm">
 *       <Icon icon="Delete" />
 *       Remove
 *     </Button>
 *   </TableCaption> */}
            <TableHead>
              <TableRow>
                <TableCell><CheckBox /></TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Наименование бренда</TableCell>
                <TableCell>Описание</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!params.brands.length && (
                <TableRow>
                  <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                    Нет записи
                  </TableCell>
                </TableRow>
              )}
              {params.brands.length > 0 &&
                params.brands.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell><CheckBox /></TableCell>
                    <TableCell>{item.manufacturer.id}</TableCell>
                    <TableCell><a href={"/admin/resources/manufacturers/records/"+item.manufacturer.id+"/show"}>{item.manufacturer.name}</a></TableCell>
                    <TableCell>{item.manufacturer.description}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default DontTouchThis;
