import { useState } from 'react';

import validator, { schema, uischema } from './schemas/Form1';
import Form, { Templates } from '@rjsf/bootstrap-4';

import {
  ObjectFieldTemplateProps,
  FieldTemplateProps,
  getUiOptions,
} from '@rjsf/utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Card } from 'react-bootstrap';

function CustomFieldTemplate(props: FieldTemplateProps) {
  const {
    id,
    classNames,
    style,
    label,
    help,
    required,
    description,
    errors,
    children,
  } = props;
  console.log(classNames);
  return (
    <div className="form-group field fieldstring col-md-12" style={style}>
      <label htmlFor={id}>
        {label}
        {required ? '*' : null}
      </label>
      {description}
      {children}
      {errors}
      {help}
    </div>
  );
}

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
          return <div className={`col-${xs}`}>{prop.content}</div>;
        }
        return <div className={`col-12`}>{prop.content}</div>;
      })}
      
      {description}
    </fieldset>
  );
}
/*
const MyBaseInputTemplate = (props: BaseInputTemplateProps) => {
  const { registry, uiOptions } = props;
  const { BaseInputTemplate } = Templates;
  //const { templates: { BaseInputTemplate } } = getDefaultTemplates();
  /*const BaseInputTemplate = getTemplate(
    'BaseInputTemplate',
    registry,
    uiOptions
  );* /
  return <BaseInputTemplate {...props} size="small" />;
};


*/
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Form
        schema={schema}
        uiSchema={uischema}
        validator={validator}
        liveValidate
        templates={{
          ObjectFieldTemplate: FluidFormLayout,
          //FieldTemplate: CustomFieldTemplate
        }}
      />
    </div>
  );
}

export default App;
