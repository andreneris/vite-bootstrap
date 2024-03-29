import validator, { schema, uiSchema } from './schemas/Task';
import { JTable } from './table/JsonSchemaTable';

import Form from '@rjsf/bootstrap-4';
import { useState } from 'react';

import {
  ObjectFieldTemplateProps,
  FieldTemplateProps,
  getUiOptions,
} from '@rjsf/utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export function FluidFormLayout(props: ObjectFieldTemplateProps): JSX.Element {
  const { properties, description, title, uiSchema } = props;

  return (
    <fieldset className="form-row">
      <legend>{title}</legend>

      {properties.map((prop) => {
        const fieldName = prop.name;
        if (uiSchema && fieldName && fieldName in uiSchema) {
          var uiOptions = getUiOptions(uiSchema[fieldName]);
          const { xs = 12, md = 12, lg = 12 } = uiOptions;
          return (
            <div key={`divid-${prop.name}`} className={`col-${xs}`}>
              {prop.content}
            </div>
          );
        }
        return <div className={`col-12`}>{prop.content}</div>;
      })}

      {description}
    </fieldset>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const onSubmit = ({ formData }) => {
    setData([...data, formData]);
    setFormData({});
  };

  const handleFormData = (data) => {
    setFormData(data);
  };

  return (
    <div className="App">
      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        onSubmit={onSubmit}
        //liveValidate
        templates={{
          ObjectFieldTemplate: FluidFormLayout,
        }}
        formData={formData}
        //widgets={widget}
        //fields = {LookupSelectFieldConfig.fields}
        //{...LookupSelectFieldConfig}
      />
      <JTable
        defaultData={data}
        schema={schema}
        onActionClick={handleFormData}
      />
    </div>
  );
}

export default App;
