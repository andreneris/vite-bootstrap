import validator, {schema, uiSchema } from './schemas/Task';
import Form from '@rjsf/bootstrap-4';


import {
  ObjectFieldTemplateProps,
  FieldTemplateProps,
  getUiOptions,
} from '@rjsf/utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Card } from 'react-bootstrap';


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



function App() {

  return (
    <div className="App">

      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        liveValidate
        templates={{
          ObjectFieldTemplate: FluidFormLayout,
        }}

      />
    </div>
  );
}

export default App;
