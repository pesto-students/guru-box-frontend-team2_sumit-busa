import { useState } from 'react';
import BaseCreatableSelect from 'react-select/creatable';

import type { ActionMeta, OnChangeValue } from 'react-select';

type Option = {
  label: string;
  value: string | number;
  isNew?: boolean;
};

type Props = {
  name: string;
  options: Option[];
  onChange: Function;
};

const CreatableSelect = ({
  name,
  options,
  onChange: externalOnChange,
}: Props) => {
  const [allOptions, setAllOptions] = useState<Option[]>(options);

  const handleChange = (
    newValue: OnChangeValue<Option, true>,
    actionMeta: ActionMeta<Option>
  ) => {
    if (actionMeta.action === 'create-option') {
      const newestOption = {
        label: actionMeta.option.label,
        value: actionMeta.option.value,
        // @ts-ignore
        isNew: !!actionMeta.option['__isNew__'],
      };
      setAllOptions([...allOptions, newestOption]);
    }

    externalOnChange(
      newValue.map(option => ({
        label: option.label,
        value: option.value,
        // @ts-ignore
        isNew: !!option['__isNew__'],
      }))
    );
  };

  return (
    <BaseCreatableSelect
      isMulti
      name={name}
      options={allOptions}
      onChange={handleChange}
      noOptionsMessage={() => 'Type to add more'}
    />
  );
};

export default CreatableSelect;