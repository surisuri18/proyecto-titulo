// components/forms/FormBase.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { LabeledInput } from './LabelGenerico';
import Select from 'react-select'; // npm install react-select
import CreatableSelect from 'react-select/creatable';

const FormBase = ({ fields, onSubmit, submitLabel }) => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors }
  } = useForm({ mode: 'onBlur' });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {fields.map(field => (
        <div key={field.name} className="mb-3">
          <Controller
            name={field.name}
            control={control}
            rules={
              field.name === 'confirmClave'
                ? {
                    ...field.rules,
                    validate: value =>
                      value === getValues('clave') ||
                      'Las contraseñas no coinciden'
                  }
                : field.rules
            }
            render={({ field: controller }) => {
              // Select normal o creatable
              if (field.type === 'select') {
                const SelectComponent = field.creatable
                  ? CreatableSelect
                  : Select;
                return (
                  <SelectComponent
                    {...controller}
                    options={field.options}
                    isMulti={field.isMulti}
                    placeholder={field.placeholder}
                    onChange={controller.onChange}
                    onBlur={controller.onBlur}
                    classNamePrefix="react-select"
                  />
                );
              }
              // Inputs normales
              return (
                <LabeledInput
                  {...controller}
                  label={field.label}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={!!field.rules?.required}
                />
              );
            }}
          />
          {errors[field.name] && (
            <small className="text-danger">{errors[field.name].message}</small>
          )}
        </div>
      ))}

      <div className="d-grid">
        <button type="submit" className="btn btn-dark btn-lg">
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

FormBase.propTypes = {
  fields: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string
};

FormBase.defaultProps = {
  submitLabel: 'Enviar'
};

export default FormBase;