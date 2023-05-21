import React, { useEffect, useState } from 'react'
import { Label, Box, FormGroup, BasePropertyProps, RichTextEditor, StoryWrapper, Button, Input } from '@adminjs/design-system'
import { ApiClient } from 'adminjs'

const Edit: React.FC<BasePropertyProps> = (props) => {
  const { property, record, onChange, msg } = props
  let nameTranslate = record.populated[property.name]?.params || {}
  console.log(property);
  
  const [kzText, setValueKz] = useState(null)
  const [value, setValue] = useState()
  const [enText, setValueEn] = useState(null)
  const [ruText, setValueRu] = useState(null)
  const [activeTab, setActiveTab] = useState("kz");

  useEffect(() => {
    setValueKz(nameTranslate.kz || '')
    setValueEn(nameTranslate.en || '')
    setValueRu(nameTranslate.ru || '')
    // console.log({kz: kzText, ru: ruText, en: enText});
    
    // onChange(property.name, {kz: kzText, ru: ruText, en: enText})
   }, []);
   console.log({kz: kzText, ru: ruText, en: enText});
   const handleDropZoneChange = () => {
    onChange(property.name+'Translate', {kz: kzText, ru: ruText, en: enText})
  }
  //  onChange(property.name, {kz: kzText, ru: ruText, en: enText})  
  console.log('activeTab', activeTab);
  
  return (
    <Box marginBottom="xxl">
      <FormGroup>
        <Label>{property.name === 'name' ? 'Наименование' : 'Описание'}</Label>
        <Box flex width={[1, 1, 1, 1]}>
          <Box width={[1, 1, 1, 1]}>
            <Button type={'button'} mr={5} mb={20} variant={activeTab === 'kz' ? 'primary': 'default'} onClick={() => {setActiveTab('kz')}} >
              Қазақша
            </Button>
            <Button type={'button'} mr={5} mb={20} variant={activeTab === 'ru' ? 'primary': 'default'} onClick={() => {setActiveTab('ru')}} >
              Русский
            </Button>
            <Button type={'button'} mr={5} mb={20} variant={activeTab === 'en' ? 'primary': 'default'} onClick={() => {setActiveTab('en')}} >
              English
            </Button>
            <Input
              style={activeTab === 'kz' && property.name === 'name' ? {display: 'block'} : {display: 'none'}}
              width={1}
              type={'text'}
              value={kzText || ''}
              placeholder={nameTranslate['kz']}
              onChange={(e) => {(setValueKz(e.target.value)), handleDropZoneChange()}}
            />
            <Input
              style={activeTab === 'ru' && property.name === 'name' ? {display: 'block'} : {display: 'none'}}
              width={1}
              type={'text'}
              value={ruText || ''}
              placeholder={nameTranslate['ru']}
              onChange={(e) => {(setValueRu(e.target.value)), handleDropZoneChange()}}
            />
            <Input
              style={activeTab === 'en' && property.name === 'name' ? {display: 'block'} : {display: 'none'}}
              width={1}
              type={'text'}
              value={enText || ''}
              placeholder={nameTranslate['en']}
              onChange={(e) => {(setValueEn(e.target.value)), handleDropZoneChange()}}
            />
            <Box
              style={activeTab === 'kz' && property.name === 'description' ? {display: 'block'} : {display: 'none'}}
              width={1}
            >
              <RichTextEditor
                onChange={(e) => {(setValueKz(e.target.value)), handleDropZoneChange()}}
                value={value}
              />
            </Box>
            <Box
              style={activeTab === 'ru' && property.name === 'description' ? {display: 'block'} : {display: 'none'}}
              width={1}
            >
              <RichTextEditor
                onChange={(e) => {(setValueRu(e.target.value)), handleDropZoneChange()}}
                value={value}
              />
            </Box>
            <Box
              style={activeTab === 'en' && property.name  === 'description' ? {display: 'block'} : {display: 'none'}} 
              width={1}
            >
              <RichTextEditor
                onChange={(e) => {(setValueEn(e.target.value)), handleDropZoneChange()}}
                value={value}
              />
            </Box>
          </Box>
        </Box>
      </FormGroup>
    </Box>
  )
}

export default Edit