const REQUIRED_FIELD = 'Обязательно для заполнения';

export const nameValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.length === null) {
            return false;

        }
    }
};
export const loginValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.match(/[а-яА-Я]/)) {
            return 'Почта не может содержать русские буквы'
        }
        return true;
    }
};

export const passwordValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.length < 6) {
            return 'Пароль должен длиннее 6-ти символов'
        }

        return true;
    }
};
export const FirstValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.length === null) {
            return false;

        }
    }
};
export const DataValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.length === null) {
            return false;

        }
    }
};

export const phoneValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
            return true
        }

        return 'Номер не может содержать буквы';
    }
};


export const gpsValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.length === null) {
            return false;

        }
    }
};
export const MatherNameValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.length === null) {
            return false;

        }
    }
};

export const MatherNumberValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
            return true
        }

        return 'Номер не может содержать буквы';
    }
};


export const FatherNameValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.length === null) {
            return false;

        }
    }
};

export const FatherNumberValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)) {
            return true
        }

        return 'Номер не может содержать буквы';
    }
};



export const MatherTelegramValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.length === null) {
            return false;

        }
    }
};

export const MatherWhatsAppValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.length === null) {
            return false;

        }
    }
};

export const FatherTelegramValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.length === null) {
            return false;

        }
    }
};

export const FatherWhatsAppValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.length === null) {
            return false;

        }
    }
};