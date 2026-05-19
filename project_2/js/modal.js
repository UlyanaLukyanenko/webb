// Модуль управления модальным окном для записи
class ModalManager {
    constructor() {
        this.modal = document.getElementById("bookingModal");
        this.modalLessonInfo = document.getElementById("modalLessonInfo");
        this.userNameInput = document.getElementById("userName");
        this.userPhoneInput = document.getElementById("userPhone");
        this.userEmailInput = document.getElementById("userEmail");
        this.userCommentInput = document.getElementById("userComment");
        this.submitBtn = document.getElementById("submitBooking");
        this.selectedLesson = null;
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        this.submitBtn.addEventListener("click", () => this.saveBooking());
        
        // Закрытие по крестику
        const closeBtn = this.modal.querySelector(".modal-close");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => this.close());
        }
        
        // Закрытие по клику вне окна
        window.addEventListener("click", (e) => {
            if (e.target === this.modal) this.close();
        });
    }
    
    open(lesson) {
        this.selectedLesson = lesson;
        this.modalLessonInfo.innerHTML = `
            <strong>${lesson.name}</strong><br>
            ${lesson.dayRu}, ${lesson.time} | Преподаватель: ${lesson.teacher}<br>
            Уровень: ${lesson.level}
        `;
        
        this.userNameInput.value = "";
        this.userPhoneInput.value = "";
        this.userEmailInput.value = "";

        this.userCommentInput.value = "";
        
        this.modal.style.display = "flex";
    }
    
    close() {
        this.modal.style.display = "none";
        this.selectedLesson = null;
    }
    
    saveBooking() {
        const name = this.userNameInput.value.trim();
        const phone = this.userPhoneInput.value.trim();
        
        if (!name || !phone) {
            alert("Пожалуйста, укажите имя и телефон");
            return;
        }
        
        if (!this.selectedLesson) return;
        
        // Находим занятие в глобальном массиве
        const lessonIndex = window.scheduleData.findIndex(l => l.id === this.selectedLesson.id);
        
        if (lessonIndex !== -1 && window.hasAvailableSeats(window.scheduleData[lessonIndex])) {
            // Уменьшаем количество мест
            window.scheduleData[lessonIndex].bookedSeats += 1;
            
            // Сохраняем заявку в localStorage
            let bookings = JSON.parse(localStorage.getItem("elan_dance_bookings") || "[]");
            bookings.push({
                lessonId: this.selectedLesson.id,
                lessonName: this.selectedLesson.name,
                date: `${this.selectedLesson.dayRu} ${this.selectedLesson.time}`,
                teacher: this.selectedLesson.teacher,
                userName: name,
                userPhone: phone,
                userEmail: this.userEmailInput.value,
                comment: this.userCommentInput.value,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem("elan_dance_bookings", JSON.stringify(bookings));
            
            alert(`✅ Вы записаны на "${this.selectedLesson.name}"!\n\nЖдем вас в студии ÉLAN. Пожалуйста, приходите за 10 минут до начала занятия.`);
            this.close();
            
            // Обновляем отображение расписания
            if (window.renderSchedule) {
                window.renderSchedule();
            }
        } else {
            alert("Извините, места закончились в момент оформления. Вы можете добавиться в лист ожидания.");
            this.close();
            if (window.renderSchedule) {
                window.renderSchedule();
            }
        }
    }
}

// Создаем глобальный экземпляр модального окна
window.bookingModalManager = new ModalManager();
