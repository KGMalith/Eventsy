import React from 'react'
import { toast } from 'react-toastify';
import {history} from '../../routes/Routes'; 

const errorHandler = (error) => {
    if (error.status === 401) {
        toast.error(<div><i className="fa fa-exclamation-triangle fa-lg"></i>&nbsp;&nbsp;{"Unauthorized Action"}</div>, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        setTimeout(function () {
            history.push('/signin');
            window.location.reload();
        }, 1000);

        return error.data

    } else if (error.status === 355) {
        toast.error(<div><i className="fa fa-exclamation-triangle fa-lg"></i>&nbsp;&nbsp;{error.data.msg}</div>, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        setTimeout(function () {
            history.push({
                pathname: '/email-verify',
                search: `?email=${error.data.data}`
            });
            window.location.reload();
        }, 1300);

        return error.data

    } else {
        toast.error(<div><i className="fa fa-exclamation-triangle fa-lg"></i>&nbsp;&nbsp;{error.data.msg}</div>, {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        return error.data
    }

}

const successHandler = (response) => {
    if (response.showMessage === true) {
        toast.success(<div><i className="fa fa-check fa-lg"></i>&nbsp;&nbsp;{response.msg}</div>, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    return response
}

export {
    errorHandler,
    successHandler,
}