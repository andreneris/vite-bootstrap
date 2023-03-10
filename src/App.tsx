import { useState } from 'react';

import validator, { schema, uischema } from './schemas/Form1';
import Form, { Templates } from '@rjsf/mui';

import {
  ObjectFieldTemplateProps,
  BaseInputTemplateProps,
  getUiOptions
} from '@rjsf/utils';
//import './App.css';
import { Grid, Box } from '@mui/material/';

export function FluidFormLayout(props: ObjectFieldTemplateProps): JSX.Element {
  const { properties, description, title, uiSchema } = props;

  return (
    <Box marginBottom={2}>
      <Box component="h2" marginBottom={2}>
        {title}
      </Box>
      <Grid container spacing={2}>
        {properties.map((prop) => {
          const fieldName = prop.name;
          if (uiSchema && fieldName && fieldName in uiSchema) {
            var uiOptions = getUiOptions(uiSchema[fieldName]);
            const { xs = 12, md = 12, lg = 12 } = uiOptions;
            return (
              <Grid
                item
                key={prop.content.key}
                xs={xs as number}
                md={md as number}
                lg={lg as number}
              >
                {prop.content}
              </Grid>
            );
          }
          return (
            <Grid xs={12} md={12} lg={12} item key={prop.content.key}>
              {prop.content}
            </Grid>
          );
        })}
      </Grid>
      {description}
    </Box>
  );
}

const MyBaseInputTemplate = (props: BaseInputTemplateProps) => {
  const { registry, uiOptions } = props;
  const { BaseInputTemplate } = Templates;
  //const { templates: { BaseInputTemplate } } = getDefaultTemplates();
  /*const BaseInputTemplate = getTemplate(
    'BaseInputTemplate',
    registry,
    uiOptions
  );*/
  return <BaseInputTemplate {...props} size="small" />;
};

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
          BaseInputTemplate: MyBaseInputTemplate,
        }}
      />
    </div>
  );
}

export default App;
