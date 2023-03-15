import React, { useState, useEffect } from 'react';
import { RJSFSchema, UiSchema, FieldProps, RegistryFieldsType } from '@rjsf/utils';

const LookupSelectField = ({ formData, onChange }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (formData.category !== 'loading') {
      // Make an API call to fetch the available options based on the formData
      // Set the options using setOptions()
    }
  }, [formData.category]);

  return (
    <select value={formData.category} onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const LookupSelectFieldTemplate = (props) => {
  console.log(props)
  return (
    <div>
      <label>{props.label}</label>
      <LookupSelectField {...props} />
    </div>
  );
};
/*
const LookupSelectFieldFactory = ({ schema, uiSchema }) => {
  return {
    lookupSelectField: (props) => <LookupSelectFieldTemplate {...props} />,
  };
};*/

const LookupSelectFieldFactory:RegistryFieldsType = 
{
  SchemaField: (props) => <LookupSelectFieldTemplate {...props}/>
}
//(props) => <LookupSelectFieldTemplate {...props}/>;

const LookupSelectFieldTransformer = (errors) => {
  return errors.map((error) => {
    if (error.params && error.params.dependentRequired) {
      error.message = 'Loading options...';
    }
    return error;
  });
};



export const LookupSelectFieldConfig = {
  fields: LookupSelectFieldFactory,
  transformErrors: LookupSelectFieldTransformer,
};


