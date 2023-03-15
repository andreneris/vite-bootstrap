import { useEffect, useState } from 'react';
import {  WidgetProps } from '@rjsf/utils';

export const LookupWidget = (props:WidgetProps) => {
  console.log(props)
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function getLookupList() {
      const response = await fetch('https://example.com/lookup-list');
      const lookupList = await response.json();
      setOptions(lookupList);
    }
    getLookupList();
  }, []);

  return (
    <select
      value={props.value}
      onChange={(event) => props.onChange(event.target.value)}
    >
      <option value="">Select an item</option>
      {options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export const widget = {
  'custom-lookup': LookupWidget,
};
