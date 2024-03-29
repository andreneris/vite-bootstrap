import React from 'react';
import ReactDOM from 'react-dom';
import Form from '@rjsf/bootstrap-4';
import * as Grouped from './GroupedSchema';
import * as Templates from './GroupedRegistry';
import * as UiTemplate from './UiTemplate';
import validator from '@rjsf/validator-ajv8';
//import "./styles.css";

const schema = {
  title: 'Todo',
  type: 'object',
  properties: {
    title: { type: 'string', title: 'Title', default: 'A new task' },
    done: { type: 'boolean', title: 'Done?', default: false },
    a: { title: 'Field A', type: 'string' },
    b: { title: 'Field B', type: 'string' },
    c: { title: 'Field C', type: 'string' },
    d: { title: 'Field D', type: 'string' },
    e: { title: 'Field E', type: 'string' },
    f: { title: 'Field F', type: 'string' },
    g: { title: 'Field G', type: 'string' },
    h: { title: 'Field H', type: 'string' },
    i: { title: 'Field I', type: 'string' },
    j: { title: 'Field J', type: 'string' },
  },
};

const groups = [
  'g',
  {
    'Important Fields': ['a', 'b'],
    'Less Important': [
      'g',
      {
        'Much Less Important': ['c', 'd'],
        'Only Kind of Less Important': ['e', 'f'],
        'ui:template': 'grid',
      },
    ],
    'ui:template': 'tabs',
  },
  {
    _: ['done', 'title'],
    'ui:template': 'well',
  },
  {
    'Advanced Fields': ['h', 'i'],
    Others: ['j'],
    'ui:template': 'table',
  },
];
const uiSchema = {
  'ui:groups': groups,
  'ui:template': (props) => <Grouped.ObjectFieldTemplate {...props} />,
  done: {
    'ui:template': CustomFieldTemplate,
  },
};

function CustomFieldTemplate(props) {
  const {
    id,
    classNames,
    label,
    help,
    required,
    description,
    errors,
    children,
  } = props;
  return (
    <div className={classNames}>
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
const log = (type) => console.log.bind(console, type);

export default function Example(props) {
  return;
  <>
    <Form
      schema={schema}
      uiSchema={uiSchema}
      onChange={log('changed')}
      onSubmit={log('submitted')}
      onError={log('errors')}
      validator={validator}
      //transformErrors={log("transformErrors")}
      // liveValidate={true}
      formContext={{
        templates: Templates.GroupTemplates,
      }}
      {...UiTemplate}
    />
    ,
  </>;
}
