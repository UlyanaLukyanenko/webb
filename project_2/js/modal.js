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

        if (this.submitBtn) {

            this.submitBtn.addEventListener(
                "click",
                () => this.saveBooking()
            );

        }

        if (this.modal) {

            const closeBtn =
                this.modal.querySelector(".modal-close");

            if (closeBtn) {

                closeBtn.addEventListener(
                    "click",
                    () => this.close()
                );

            }

            window.addEventListener("click", (e) => {

                if (e.target === this.modal) {
                    this.close();
                }

            });

        }

    }

    open(lesson) {

        if (!lesson || !this.modal) return;

        this.selectedLesson = lesson;

        this.modalLessonInfo.innerHTML = `
            <strong>${lesson.name}</strong><br>
            ${lesson.dayRu}, ${lesson.time}
            | Преподаватель: ${lesson.teacher}<br>
            Уровень: ${lesson.level}
        `;

        this.userNameInput.value = "";
        this.userPhoneInput.value = "";
        this.userEmailInput.value = "";
        this.userCommentInput.value = "";

        this.modal.style.display = "flex";
    }

    close() {

        if (this.modal) {
            this.modal.style.display = "none";
        }

        this.selectedLesson = null;
    }

    validateEmail(email) {

        if (!email) return true;

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);
    }

    validatePhone(phone) {

        const cleaned = phone.replace(/\D/g, "");

        return cleaned.length >= 10;
    }

    saveBooking() {

        const name =
            this.userNameInput.value.trim();

        const phone =
            this.userPhoneInput.value.trim();

        const email =
            this.userEmailInput.value.trim();

        if (!name) {

            alert(
                "Пожалуйста, укажите имя"
            );

            return;
        }

        if (name.length < 2) {

            alert(
                "Имя должно содержать минимум 2 символа"
            );

            return;
        }

        if (!phone) {

            alert(
                "Пожалуйста, укажите телефон"
            );

            return;
        }

        if (!this.validatePhone(phone)) {

            alert(
                "Введите корректный номер телефона"
            );

            return;
        }

        if (email && !this.validateEmail(email)) {

            alert(
                "Введите корректный email"
            );

            return;
        }

        if (!this.selectedLesson) return;

        const lessonIndex =
            window.scheduleData.findIndex(
                l => l.id === this.selectedLesson.id
            );

        if (
            lessonIndex !== -1 &&
            window.hasAvailableSeats(
                window.scheduleData[lessonIndex]
            )
        ) {

            window.scheduleData[
                lessonIndex
            ].bookedSeats += 1;

            let bookings = JSON.parse(
                localStorage.getItem(
                    "elan_dance_bookings"
                ) || "[]"
            );

            bookings.push({

                lessonId: this.selectedLesson.id,

                lessonName: this.selectedLesson.name,

                date:
                    `${this.selectedLesson.dayRu} ${this.selectedLesson.time}`,

                teacher: this.selectedLesson.teacher,

                userName: name,

                userPhone: phone,

                userEmail: email,

                comment:
                    this.userCommentInput.value,

                timestamp:
                    new Date().toISOString()

            });

            localStorage.setItem(
                "elan_dance_bookings",
                JSON.stringify(bookings)
            );

            alert(
                `✅ Вы записаны на "${this.selectedLesson.name}"!`
            );

            this.close();

            if (window.renderSchedule) {
                window.renderSchedule();
            }

        } else {

            alert(
                "Свободных мест больше нет"
            );

            this.close();

        }

    }

}

// Глобальный экземпляр
window.bookingModalManager =
    new ModalManager();
