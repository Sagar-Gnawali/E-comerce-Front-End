import { notify } from "./toaster.js";

export const handleError = (error)=>{
    debugger;
    let errMsg = 'Something went wrong !';
    let err = error && error.response;
    let serverResponse = err.data;
    if(serverResponse.msg){
        errMsg = serverResponse.msg;
    }
    notify.showError(errMsg);
}