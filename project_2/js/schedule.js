// Данные расписания для танцевальной студии
const scheduleData = [
    { 
        id: 1, 
        day: "monday", 
        dayRu: "Понедельник", 
        dayShort: "ПН",
        time: "10:00", 
        name: "Contemporary (современный танец)", 
        teacher: "Анна Волкова", 
        level: "Начинающие",
        totalSeats: 12, 
        bookedSeats: 5 
    },
    { 
        id: 2, 
        day: "monday", 
        dayRu: "Понедельник", 
        dayShort: "ПН",
        time: "18:30", 
        name: "Hip-Hop", 
        teacher: "Максим Орлов", 
        level: "Средний",
        totalSeats: 15, 
        bookedSeats: 12 
    },
    { 
        id: 3, 
        day: "tuesday", 
        dayRu: "Вторник", 
        dayShort: "ВТ",
        time: "11:00", 
        name: "Ballet (классический)", 
        teacher: "Екатерина Морозова", 
        level: "Все уровни",
        totalSeats: 10, 
        bookedSeats: 8 
    },
    { 
        id: 4, 
        day: "tuesday", 
        dayRu: "Вторник", 
        dayShort: "ВТ",
        time: "19:00", 
        name: "Zumba", 
        teacher: "Ольга Смирнова", 
        level: "Начинающие",
        totalSeats: 20, 
        bookedSeats: 18 
    },
    { 
        id: 5, 
        day: "wednesday", 
        dayRu: "Среда", 
        dayShort: "СР",
        time: "10:30", 
        name: "Jazz-Funk", 
        teacher: "Анна Волкова", 
        level: "Средний",
        totalSeats: 12, 
        bookedSeats: 10 
    },
    { 
        id: 6, 
        day: "wednesday", 
        dayRu: "Среда", 
        dayShort: "СР",
        time: "19:30", 
        name: "Tango", 
        teacher: "Дмитрий Белов", 
        level: "Начинающие",
        totalSeats: 8, 
        bookedSeats: 8 
    },
    { 
        id: 7, 
        day: "thursday", 
        dayRu: "Четверг", 
        dayShort: "ЧТ",
        time: "12:00", 
        name: "Dancehall", 
        teacher: "Максим Орлов", 
        level: "Все уровни",
        totalSeats: 14, 
        bookedSeats: 9 
    },
    { 
        id: 8, 
        day: "thursday", 
        dayRu: "Четверг", 
        dayShort: "ЧТ",
        time: "20:00", 
        name: "Contemporary", 
        teacher: "Анна Волкова", 
        level: "Продвинутые",
        totalSeats: 10, 
        bookedSeats: 10 
    },
    { 
        id: 9, 
        day: "friday", 
        dayRu: "Пятница", 
        dayShort: "ПТ",
        time: "17:00", 
        name: "Hip-Hop (дети 7-12 лет)", 
        teacher: "Максим Орлов", 
        level: "Начинающие",
        totalSeats: 12, 
        bookedSeats: 4 
    },
    { 
        id: 10, 
        day: "friday", 
        dayRu: "Пятница", 
        dayShort: "ПТ",
        time: "20:30", 
        name: "Salsa", 
        teacher: "Дмитрий Белов", 
        level: "Средний",
        totalSeats: 10, 
        bookedSeats: 6 
    },
    { 
        id: 11, 
        day: "saturday", 
        dayRu: "Суббота", 
        dayShort: "СБ",
        time: "11:00", 
        name: "Ballet (растяжка)", 
        teacher: "Екатерина Морозова", 
        level: "Начинающие",
        totalSeats: 15, 
        bookedSeats: 11 
    },
    { 
        id: 12, 
        day: "saturday", 
        dayRu: "Суббота", 
        dayShort: "СБ",
        time: "15:00", 
        name: "Мастер-класс: Street Dance", 
        teacher: "Приглашенный хореограф", 
        level: "Все уровни",
        totalSeats: 20, 
        bookedSeats: 19 
    },
    { 
        id: 13, 
        day: "sunday", 
        dayRu: "Воскресенье", 
        dayShort: "ВС",
        time: "12:00", 
        name: "Zumba (семейная)", 
        teacher: "Ольга Смирнова", 
        level: "Для всей семьи",
        totalSeats: 18, 
        bookedSeats: 10 
    },
    { 
        id: 14, 
        day: "sunday", 
        dayRu: "Воскресенье", 
        dayShort: "ВС",
        time: "17:00", 
        name: "Contemporary (открытый класс)", 
        teacher: "Анна Волкова", 
        level: "Все уровни",
        totalSeats: 12, 
        bookedSeats: 5 
    }
];

// Данные преподавателей (Material Symbols иконки)
const teachersData = [
    {
        name: "Анна Волкова",
        specialty: "Contemporary, Jazz-Funk",
        description: "Хореограф с 10-летним опытом, участница международных конкурсов. Вдохновляет учеников на самовыражение через танец.",
        icon: "auto_awesome"
    },
    {
        name: "Максим Орлов",
        specialty: "Hip-Hop, Dancehall",
        description: "Чемпион России по уличным танцам. Заряжает энергией и учит чувствовать ритм.",
        icon: "music_note"
    },
    {
        name: "Екатерина Морозова",
        specialty: "Ballet, Растяжка",
        description: "Артистка балета, педагог с 15-летним стажем. Помогает обрести грацию и правильную осанку.",
        icon: "spa"
    },
    {
        name: "Дмитрий Белов",
        specialty: "Tango, Salsa",
        description: "Мастер латиноамериканских танцев. Создает романтическую и страстную атмосферу на занятиях.",
        icon: "favorite"
    },
    {
        name: "Ольга Смирнова",
        specialty: "Zumba, Фитнес",
        description: "Сертифицированный инструктор Zumba. Заряжает позитивом и делает тренировки веселыми.",
        icon: "bolt"
    }
];

// Данные направлений танцев (Material Symbols иконки)
const directionsData = [
    {
        icon: "spa",
        name: "Классический балет",
        description: "Грация, осанка и дисциплина. Для тех, кто мечтает о благородстве движений."
    },
    {
        icon: "favorite",
        name: "Латина",
        description: "Страстная сальса, чувственное танго и зажигательная бачата."
    },
    {
        icon: "music_note",
        name: "Hip-Hop / Street",
        description: "Уличные ритмы, свобода движения и современная хореография."
    },
    {
        icon: "auto_awesome",
        name: "Contemporary",
        description: "Танец души, эмоции через движение и пластика тела."
    },
    {
        icon: "bolt",
        name: "Zumba",
        description: "Фитнес в ритме танца. Весело, полезно и для любого возраста."
    },
    {
        icon: "child_care",
        name: "Детские группы",
        description: "От 4 до 12 лет. Развитие координации, музыкальности и уверенности."
    }
];

// Вспомогательные функции
function getAvailableSeats(lesson) {
    return lesson.totalSeats - lesson.bookedSeats;
}

function hasAvailableSeats(lesson) {
    return getAvailableSeats(lesson) > 0;
}

// Функция для получения класса статуса мест
function getSeatsClass(available, total) {
    if (available === 0) return "full";
    if (available <= 2) return "low";
    return "available";
}

// Функция для получения текста статуса мест (Material Symbols вместо эмодзи)
function getSeatsText(available, total) {
    if (available === 0) return '<span class="material-symbols-rounded seats-icon seats-full">block</span> Мест нет';
    if (available <= 2) return `<span class="material-symbols-rounded seats-icon seats-low">warning</span> Осталось ${available} места`;
    return `<span class="material-symbols-rounded seats-icon seats-ok">check_circle</span> Свободно: ${available}/${total}`;
}

// Экспорт
window.scheduleData = scheduleData;
window.teachersData = teachersData;
window.directionsData = directionsData;
window.getAvailableSeats = getAvailableSeats;
window.hasAvailableSeats = hasAvailableSeats;
window.getSeatsClass = getSeatsClass;
window.getSeatsText = getSeatsText;
