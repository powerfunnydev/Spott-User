import React, { Component, PropTypes } from 'react';
import { Button, pinkButtonStyle, Modal, smallDialogStyle, greyButtonStyle } from '../../../_common/buildingBlocks';
import localized from '../../../_common/localized';
import Radium from 'radium';
import { reduxForm, Field } from 'redux-form/immutable';
import { st } from '../styles';
import { renderSelectField } from '../selectInput';

@reduxForm({
  form: 'basketAddressForm'
})
@localized
@Radium
export class ModalAddressForm extends Component {
  static propTypes = {
    addressId: PropTypes.string,
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.any,
    isEditForm: PropTypes.bool,
    removeAddress: PropTypes.func,
    submitFailed: PropTypes.bool,
    submitting: PropTypes.bool,
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  render () {
    const { handleSubmit, onSubmit, onClose, error, submitting, submitFailed, isEditForm, removeAddress, initialValues } = this.props;

    return (
      <Modal
        isOpen
        style={smallDialogStyle}
        onClose={onClose}>
        <div style={st.modal}>
          <div style={st.modal.title}>
            {isEditForm ? 'Edit Address' : 'Add New Address'}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={st.modal.form}>
              <div style={st.modal.formRow}>
                <label style={st.modal.label}>Country</label>
                <Field
                  component={renderSelectField}
                  disabled={submitting}
                  name='countryId'
                  options={[ { value: 8, label: 'Belgium' } ]}
                  submitFailed={submitFailed} />
              </div>
              <div style={st.modal.formCols}>
                <div style={{ width: '73px' }}>
                  <label style={st.modal.label}>Title</label>
                  <Field
                    component={renderSelectField}
                    disabled={submitting}
                    name='title'
                    options={[ { value: 'Mr.', label: 'Mr.' }, { value: 'Ms.', label: 'Ms.' } ]}
                    submitFailed={submitFailed} />
                </div>
                <div style={{ width: '144px' }}>
                  <label style={st.modal.label}>First name</label>
                  <Field
                    component='input'
                    name='firstname'
                    props={{ required: true, type: 'text' }}
                    style={st.modal.input}/>
                </div>
                <div style={{ width: '144px' }}>
                  <label style={st.modal.label}>Last name</label>
                  <Field
                    component='input'
                    name='lastname'
                    props={{ required: true, type: 'text' }}
                    style={st.modal.input}/>
                </div>
              </div>
              <div style={st.modal.formRow}>
                <label style={st.modal.label}>Company</label>
                <Field
                  component='input'
                  name='company'
                  props={{ required: false, type: 'text' }}
                  style={st.modal.input}/>
              </div>
              <div style={st.modal.formRow}>
                <label style={st.modal.label}>Street Address</label>
                <Field
                  component='input'
                  name='line1'
                  props={{ required: true, type: 'text' }}
                  style={st.modal.input}/>
              </div>
              <div style={st.modal.formRow}>
                <label style={st.modal.label}>Additional Info</label>
                <Field
                  component='input'
                  name='note'
                  props={{ type: 'text' }}
                  style={st.modal.input}/>
              </div>
              <div style={st.modal.formCols}>
                <div style={{ width: '229px' }}>
                  <label style={st.modal.label}>City</label>
                  <Field
                    component='input'
                    name='city'
                    props={{ required: true, type: 'text' }}
                    style={st.modal.input}/>
                </div>
                <div style={{ width: '144px' }}>
                  <label style={st.modal.label}>Postal Code</label>
                  <Field
                    component='input'
                    name='postcode'
                    props={{ required: true, type: 'text' }}
                    style={st.modal.input}/>
                </div>
              </div>
              <div style={st.modal.formRow}>
                <label style={st.modal.label}>Mobile number</label>
                <Field
                  component='input'
                  name='phone'
                  props={{ required: true, type: 'text' }}
                  style={st.modal.input}/>
              </div>
              {isEditForm &&
              <Field
                component='input'
                name='id'
                style={st.modal.input}
                type='hidden'/>}
              {error && typeof error.message === 'string' && <div style={st.modal.error}>{error.message}</div>}
            </div>
            <div style={st.modal.buttons}>
              {isEditForm &&
              <div style={st.modal.buttons.remove} onClick={removeAddress.bind(this, initialValues.get('id'))}>
                Remove Address
              </div>}
              <button key='cbtn' style={[ greyButtonStyle, st.modal.btn, st.modal.buttons.btn ]} onClick={onClose}>
                Cancel
              </button>
              <Button key='sbtn' style={[ pinkButtonStyle, st.modal.btn, st.modal.buttons.btn ]}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

@reduxForm({
  form: 'basketAddressSelectForm'
})
@localized
@Radium
export class ModalAddressSelectForm extends Component {
  static propTypes = {
    addNewAddress: PropTypes.func.isRequired,
    addresses: PropTypes.any,
    editAddress: PropTypes.func.isRequired,
    error: PropTypes.any,
    handleSubmit: PropTypes.func.isRequired,
    submitFailed: PropTypes.bool,
    submitting: PropTypes.bool,
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  render () {
    const { handleSubmit, onSubmit, onClose, error, submitting, addresses, addNewAddress, editAddress } = this.props;

    return (
      <Modal
        isOpen
        style={smallDialogStyle}
        onClose={onClose}>
        <div style={st.modal}>
          <div style={st.modal.title}>Shipping Address</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={st.modal.items}>
              <div style={st.modal.item}>
                <div style={st.modal.addNewLink} onClick={addNewAddress}>Add New Address</div>
              </div>
              {addresses.map((address) =>
                <div key={address.get('id')} style={st.modal.item}>
                  <label style={st.modal.label}>
                    <Field
                      component='input'
                      disabled={submitting}
                      name='addressId'
                      type='radio'
                      value={address.get('id')}/>
                    <div style={st.modal.radioContent}>
                      <div style={st.modal.radioContent.title}>
                        {address.get('title')} {address.get('firstname')} {address.get('lastname')}
                      </div>
                      <div style={st.modal.radioContent.dscr}>
                        {address.get('line1')}<br/>
                        {address.get('postcode')} {address.get('city')}, {address.get('country')}<br/>
                        {address.get('phoneCountry')}{address.get('phone')}
                      </div>
                    </div>
                    <div style={st.modal.radioEdit} onClick={editAddress.bind(this, address.get('id'))}>Edit</div>
                  </label>
                </div>
              )}
              {error && typeof error.message === 'string' && <div style={st.modal.error}>{error.message}</div>}
            </div>
            <div style={st.modal.buttons}>
              <Button style={[ pinkButtonStyle, st.modal.btn ]}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}