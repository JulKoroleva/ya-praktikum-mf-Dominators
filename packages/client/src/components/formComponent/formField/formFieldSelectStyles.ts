import { StylesConfig } from 'react-select';
import { GroupBase } from 'react-select/dist/declarations/src/types';

interface OptionType {
  value: string | number | null;
  label: string;
}

export const formFieldSelectStyles: StylesConfig<
  OptionType,
  false,
  GroupBase<OptionType>
> = {
  control: (provided, state) => {
    const hasError = state.selectProps['aria-invalid'];
    const isDisabled = state.isDisabled;

    return {
      ...provided,
      borderRadius: '4px',
      backgroundColor: isDisabled ? '#e9ecef' : '#ffffff',
      borderColor: isDisabled
        ? '#ced4da'
        : hasError
        ? '#dc3545'
        : state.isFocused
        ? 'rgba(25, 109, 60, 0.5)'
        : '#dce0e4',
      boxShadow: state.isFocused
        ? hasError
          ? '0 0 0 0.2rem rgba(220,53,69,.25)'
          : '0 0 0 0.2rem rgba(25, 109, 60, 0.25)'
        : '',
      '&:hover': {
        borderColor: isDisabled
          ? '#ced4da'
          : hasError
          ? '#dc3545'
          : state.isFocused
          ? '#007bff'
          : '#dce0e4',
      },
      opacity: isDisabled ? 0.7 : 1,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ...(window.innerWidth <= 768 && {
        fontSize: 'inherit',
      }),
    };
  },
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#D5EAFF'
      : state.isFocused
      ? '#e7f3ff'
      : '#ffffff',
    color: '#495057',
    '&:hover': {
      backgroundColor: state.isSelected ? 'rgba(25, 109, 60, 0.25)' : '#e7f3ff',
      color: '#495057',
    },
    cursor: state.isDisabled ? 'not-allowed' : 'default',
    opacity: state.isDisabled ? 0.7 : 1,

    ...(window.innerWidth <= 768 && {
      fontSize: 'inherit',
    }),
  }),
  menu: provided => ({
    ...provided,
    marginTop: 0,
    boxShadow: '0 5px 10px rgba(0,0,0,.1)',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? '#6c757d' : '#6c757d',

    ...(window.innerWidth <= 768 && {
      fontSize: 'inherit',
    }),
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    opacity: state.isDisabled ? 0.5 : 1,
    cursor: state.isDisabled ? 'not-allowed' : 'default',
  }),
  valueContainer: provided => ({
    ...provided,
    padding: '0 8px',
  }),
  input: provided => ({
    ...provided,
    margin: '0px',

    ...(window.innerWidth <= 768 && {
      fontSize: 'inherit',
    }),
  }),
  singleValue: (provided, state) => ({
    ...provided,
    margin: '0px',
    color: state.isDisabled ? '#6c757d' : '#495057',

    ...(window.innerWidth <= 768 && {
      fontSize: 'inherit',
    }),
  }),
};
