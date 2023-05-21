import React, { useEffect, useMemo, useState } from 'react';
import { Box, H3, Drawer, SelectAsync, FormGroup, DrawerContent, FormMessage, Label, Header, Text, CheckBox, Button, Icon,  Table, TableBody, TableCell, TableCaption, TableHead, TableRow } from '@adminjs/design-system';
import { BasePropertyProps, ApiClient } from 'adminjs';

const DontTouchThis = (props: BasePropertyProps) => {
  const { record } = props;
  const params = record.params;
  const populated = record.populated.name;
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)

  const [data, setData] = useState(null)
  const [currentValue, setValue] = useState(null)
  const [check, setCheck] = useState(null)
  const api = new ApiClient()
  let charac = []
  useEffect(() => {
   api.searchRecords({resourceId: 'attributes', query: ''})
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

  console.log('check', check)

  const addCharacteristics = () => {
    api.resourceAction({resourceId: 'category_characteristics', actionName: 'new', data: {categoryId: params.id, attributeId: currentValue.value}})
    setIsDrawerVisible(false)   
  }
  
  return (
    <Box flex>
      {isDrawerVisible && (
        <Drawer>
          <DrawerContent>
            <Header.H3>
              <Button size="icon" rounded mr="lg" onClick={() => setIsDrawerVisible(false)}>
                <Icon icon="ChevronRight" />
              </Button>
              Добавить характеристику
            </Header.H3>
            <Label>Выберите характеристику из списка</Label>
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
            <H3>Список характеристики</H3>
            <Text mb="xxl">Выберите типов характеристики для добавление к категорий</Text>
          </Box>
          <Box>
            <a href="/admin/resources/attributes">
              <Button size="md" ml="md" variant="secondary">
                <Icon icon="List" />
                Список характеристик
              </Button>
            </a>
            {/* <a href="/admin/resources/category_characteristics/actions/new"> */}
              <Button size="md" ml="md" variant="info"  onClick={() => setIsDrawerVisible(true)}>
                <Icon icon="Save" />
                Добавить характеристику к категорий
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
                <TableCell>Тип характеристики</TableCell>
                <TableCell>Значении</TableCell>
                {/* <TableCell>Действие</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {!params.characteristics.length && (
                <TableRow>
                  <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                    Нет записи
                  </TableCell>
                </TableRow>
              )}
              {params.characteristics.length > 0 &&
                params.characteristics.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell><CheckBox onChange={e => setCheck(e)} value={item.id} id={"checkbox1"+item.id} /></TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell><a href={"/admin/resources/attributes/records/"+item.attribute.id+"/show"}>{item.attribute.name}</a></TableCell>
                    <TableCell>{item.attribute.attribute_values.length > 0 && item.attribute.attribute_values.map((item) => (item.name + ', '))}</TableCell>
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
