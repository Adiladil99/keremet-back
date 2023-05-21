import React, { useState, useEffect, useMemo } from 'react'
import { FormGroup, FormMessage, SelectAsync } from '@adminjs/design-system'
import { ApiClient, RecordJSON, PropertyLabel, EditPropertyProps, SelectRecord, flat } from 'adminjs'


const Edit = (props: EditPropertyProps) => {
  const { onChange, property, record } = props
  const { reference: resourceId } = property
  type SelectRecordEnhanced = SelectRecord & {
    record: RecordJSON;
  }
  
  if (!resourceId) {
    throw new Error(`Cannot reference resource in property '${property.path}'`)
  }

  const handleChange = (selected: SelectRecordEnhanced): void => {
    if (selected) {
      console.log('this.props.location.state', selected);
      onChange(property.path, selected.value, selected.record)
    } else {
      onChange(property.path, null)
    }
  }

  const loadOptions = async (inputValue: string): Promise<SelectRecordEnhanced[]> => {
    const api = new ApiClient()

    const optionRecords = await api.searchRecords({
      resourceId,
      query: inputValue,
    })
    return optionRecords.map((optionRecord: RecordJSON) => ({
      value: optionRecord.id,
      label: optionRecord.title,
      record: optionRecord,
    }))
  }
  const error = record?.errors[property.path]

  const selectedId = useMemo(
    () => flat.get(record?.params, property.path) as string | undefined,
    [record],
  )
  const [loadedRecord, setLoadedRecord] = useState<RecordJSON | undefined>()
  const [loadingRecord, setLoadingRecord] = useState(0)

  useEffect(() => {
    if (selectedId) {
      setLoadingRecord((c) => c + 1)
      const api = new ApiClient()
      api.recordAction({
        actionName: 'show',
        resourceId,
        recordId: selectedId,
      }).then(({ data }: any) => {
        setLoadedRecord(data.record)
      }).finally(() => {
        setLoadingRecord((c) => c - 1)
      })
    }
  }, [selectedId, resourceId])

  const selectedValue = loadedRecord
  const selectedOption = (selectedId && selectedValue) ? {
    value: selectedValue.id,
    label: selectedValue.title,
  } : {
    value: '',
    label: '',
  }
  

  return (
    <FormGroup error={Boolean(error)}>
      <SelectAsync
        cacheOptions
        value={selectedOption}
        defaultOptions
        loadOptions={loadOptions}
        onChange={handleChange}
        isClearable
        isDisabled={property.isDisabled}
        isLoading={!!loadingRecord}
        {...property.props}
      />
      <FormMessage>{error?.message}</FormMessage>
    </FormGroup>
  )
}

export default Edit