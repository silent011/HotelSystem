import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

export default {
    notify: (message, type="info") => {
        toastr[type](message)
    },
    notifyMany: (errors, type="info") => {
        for(let key of Object.keys(errors)){
            toastr[type](errors[key]) 
        }
    }
}