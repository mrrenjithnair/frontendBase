import { toast } from "react-toastify";

export const REGISTER = 'REGISTER';
export const ON_REGISTER_SUCCESS = 'ON_REGISTER_SUCCESS';
export const ON_REGISTER_FAILURE = 'ON_REGISTER_FAILURE';
export const INPUT_VALUE_CHANGED_REGISTER = 'INPUT_VALUE_CHANGED_REGISTER';


export function onRegister() {
    return {
        type: REGISTER,
    };
}
export function onRegisterSuccess(data) {
    toast.success("Register Successfully");
    return {
        type: ON_REGISTER_SUCCESS,
        data: data
    };
}
export function onRegisterFailure(err) {
    console.log('err',err)
    toast.error(err);
    return {
        type: ON_REGISTER_FAILURE,
    };
}
export function onChangeValueRegister(evt) {
    return {
      type: INPUT_VALUE_CHANGED_REGISTER,
      id: (!evt.target.id) ? evt.target.name : evt.target.id,
      value: evt.target.value,
      };
  }