export const ADMIN_ROUTE = '/admin';
export const CLIENT_ROUTE = '/client/:hash';
// export const VIEW_ROUTE = '/view/:hash';
export const LOGIN_ROUTE = '/';
export const LOGINCLIENT_ROUTE = '/qr/:hash';
export const ARHIVE_ROUTE = '/admin/archive';
export const PRINT_ROUTE = '/admin/print';
export const REFACTOR_ROUTE = '/refactor-client/:hash';



export const tableHeadTexts = ['Хэш', 'QR', 'Имя', 'Фамилия', 'Дата Рождения', 'Номер телефона', 'Место проживания', 'ФИО Мамы', 'Номер Мамы', 'ФИО Папы', 'Номер Папы', 'Дата добавления'];



export const parentsInputForForm = [
    {
        title: 'Мама',
        firstControllerName: 'MomName',
        secondControllerName: 'MomPhone',
        dataForTgModal: {
            controllerName: "MomTelegram",
            inpLabel: "Ссылка на Телеграмм"
        },
        dataForWhatsAppModal: {
            controllerName: "MomWhats",
            inpLabel: "Ссылка на Вотсап"
        },
    },
    {
        title: 'Папа',
        firstControllerName: 'DadName',
        secondControllerName: 'DadPhone',
        dataForTgModal: {
            controllerName: "DadTelegram",
            inpLabel: "Ссылка на Телеграмм"
        },
        dataForWhatsAppModal: {
            controllerName: "DadWhats",
            inpLabel: "Ссылка на Вотсап"
        },
    }
]