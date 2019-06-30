import consts from './userComments.consts';

export default class Utils {
    static generateEmailHash = (email) => {
        return email.trim().toLowerCase()
    }

    static validateEmailInput = (input) => {
        const expression = consts.emailRegx;
        return expression.test(String(input).toLowerCase());
    }
}
