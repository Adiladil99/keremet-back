import React, { useEffect, useState } from 'react'
import { ApiClient } from 'adminjs'
import styled from 'styled-components'
import {
 Box,
 H2,
 H5,
 H6,
 H4,
 Icon,
 Text,
 Table, TableBody, TableCell, TableHead, TableRow,
 Illustration,
 IllustrationProps,
 Button,
} from '@adminjs/design-system'

// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const pageHeaderHeight = 284
const pageHeaderPaddingY = 74
const pageHeaderPaddingX = 250

export const DashboardHeader: React.FC = () => {
 return (
  <Box position="relative" overflow="hidden" data-css="default-dashboard">
   <Box
    position="absolute"
    top={50}
    left={-10}
    opacity={[0.2, 0.4, 1]}
    animate
   >
    <img style={{width: "250px"}} src="/phar1.png" />
    {/* <Illustration variant="FileSearch" /> //  'Moon' | 'Rocket' | 'Astronaut' | 'DocumentCheck' | 'DocumentSearch' | 'FileSearch' | 'FlagInCog' | 'Folders' | 'Launch' | 'Planet' | 'AdminJSLogo' | 'GithubLogo' | 'SlackLogo' | */}
   </Box>
   <Box
    position="absolute"
    top={10}
    right={15}
    opacity={[0.2, 0.4, 1]}
    animate
   >
   <img style={{width: "250px"}} src="/phar2.png" />
   </Box>
   <Box
    bg="grey100"
    height={pageHeaderHeight}
    py={pageHeaderPaddingY}
    px={['default', 'lg', pageHeaderPaddingX]}
   >
    <Text textAlign="center" color="white">
     <H2>Админ-панель Keremet Logistics</H2>
     <Text opacity={0.8}>
      Админ-панель для Keremet Logistics позволяет управлять настройками проекта, управление со всеми данными, удобный интерфейс для отслеживание и управление заказами.
     </Text>
    </Text>
   </Box>
  </Box>
 )
}

type BoxType = {
 variant: string;
 title: string;
 subtitle: string;
 href: string;
}

const Card = styled(Box)`
  display: ${({ flex }): string => (flex ? 'flex' : 'block')};
  color: ${({ theme }): string => theme.colors.grey100};
  text-decoration: none;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid ${({ theme }): string => theme.colors.primary100};
    box-shadow: ${({ theme }): string => theme.shadows.cardHover};
  }
`

Card.defaultProps = {
 variant: 'white',
 boxShadow: 'card',
}

export const Dashboard: React.FC = () => {
  const datas = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
 const [data, setData] = useState(null)
 const api = new ApiClient()
 useEffect(() => {
  api.getDashboard()
   .then((response) => {  
    console.log(response.data);
    
    setData(response.data.length) // { message: 'Hello World' }
   })
   .catch((error) => {
    // handle any errors
   });
 }, []);
 return (
  <Box>
   <DashboardHeader />
   <Box
    mt={['xl', 'xl', '-50px']}
    mb="xl"
    mx={[0, 0, 0, 'auto']}
    px={['default', 'lg', 'xxl', '0']}
    position="relative"
    flex
    flexDirection="row"
    flexWrap="wrap"
    width={[1, 1, 1, 1024]}
   >
    <Box width={[1, 1, 1 / 3]} p="lg">
     <Card as="a" flex href="https://adminjs.page.link/slack" target="_blank">
      <Box ml="sm">
       <H5>Количество товаров</H5>
       <Box flex alignItems={'center'}>
        <Icon size={24} icon={'InventoryManagement'}/>
        <Text fontSize={20} pl={5}>10567</Text>
       </Box>
      </Box>
     </Card>
    </Box>
    <Box width={[1, 1, 1 / 3]} p="lg">
     <Card as="a" flex href="https://github.com/SoftwareBrothers/adminjs/issues" target="_blank">
      <Box ml="sm">
       <H5>Количество клиентов</H5>
       <Box flex alignItems={'center'}>
        <Icon size={24} icon={'Group'}/>
        <Text fontSize={20} pl={5}>9782</Text>
       </Box>
      </Box>
     </Card>
    </Box>
    <Box width={[1, 1, 1 / 3]} p="lg">
     <Card as="a" flex href="https://adminjs.page.link/slack" target="_blank">
      <Box ml="sm">
       <H5>Количество магазинов</H5>
       <Box flex alignItems={'center'}>
        <Icon size={24} icon={'Store'}/>
        <Text fontSize={20} pl={5}>38</Text>
       </Box>
      </Box>
     </Card>
    </Box>
    <Box variant="white" boxShadow="card" width={1} m="lg">
     <Text textAlign="center">      
      {/* <H5>Динамика продаж</H5>
      <Box flex justifyContent={'center'}>
        <LineChart
          width={1000}
          height={300}
          data={datas}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </Box> */}
      <Box 
        position="relative"
        flex
        flexDirection="row"
        flexWrap="wrap"
        mt={20}
        width={[1, 1, 1, 920]}
        >        
        <Box width={[1, 1, 1 / 2]} p="lg">
          <Card as="a" flex href="https://adminjs.page.link/slack" target="_blank">
            <div style={{width: "100%"}}>
              <H5>Часто продаваемые продукты</H5>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Тип характеристики</TableCell>
                    <TableCell>Значение</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                      Нет записи
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>
        </Box>
        <Box width={[1, 1, 1 / 2]} p="lg">
          <Card as="a" flex href="https://github.com/SoftwareBrothers/adminjs/issues" target="_blank">
            <div style={{width: "100%"}}>
              <H5>Топ магазины</H5>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Тип характеристики</TableCell>
                    <TableCell>Значение</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                        Нет записи
                      </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>
        </Box>
      </Box>
      <Text mt="xxl">
       <Button
        as="a"
        variant="primary"
        href="/admin/resources/pr_products"
       >
        Перейти к продуктам
       </Button>
      </Text>
     </Text>
    </Box>
   </Box>
  </Box>
 )
}


export default Dashboard