import { API } from '../config';
export default class Helpers {

    static isNullOrEmpty(str) {
        return (!str || 0 === str.length);
    }
    static isEmailValid(email) {
        var re = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
        return re.test(email);
    }
    static isPasswordValid(psw) {
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
        return regex.test(psw);
    }

    static getImageUrl(url) {
        let image = 'https://www.achievesuccesstutoring.com/wp-content/uploads/2019/05/no-photo-icon-22.jpg-300x300.png';
        if (url && url !== '') {
            image = `${API.BaseURL.replace('api', '')}${url}`
        }
        return image;
    }
}