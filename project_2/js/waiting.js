
// Модуль для листа ожидания
class WaitingModalManager {
    constructor() {
        this.modal = document.getElementById("waitingModal");
        this.waitingLessonInfo = document.getElementById("waitingLessonInfo");
        this.waitingName = document.getElementById("waitingName");
        this.waitingPhone = document.getElementById("waitingPhone");
        this.waitingEmail = document.getElementById("waitingEmail");
        this.submitBtn = document.getElementById("submitWaiting");
        this.selectedLesson = null;

        this.initEventListeners();
    }

    initEventListeners() {

        if (this.submitBtn) {
            this.submitBtn.addEventListener("click", () => this.saveWaiting());
        }

        if (this.modal) {

            const closeBtn = this.modal.querySelector(".modal-close");

            if (closeBtn) {
                closeBtn.addEventListener("click", () => this.close());
            }

            this.modal.addEventListener("click", (e) => {
                if (e.target === this.modal) {
                    this.close();
                }
            });

        }

        document.addEventListener("keydown", (e) => {

            if (
                e.key === "Escape" &&
                this.modal &&
                this.modal.style.display === "flex"
            ) {
                this.close();
            }

        });

    }

    open(lesson) {

        if (!this.modal) {
            alert("Ошибка: модальное окно не найдено");
            return;
        }

        if (!lesson) return;

        this.selectedLesson = lesson;

        if (this.waitingLessonInfo) {

            this.waitingLessonInfo.innerHTML = `
                <strong>${lesson.name}</strong><br>
                ${lesson.dayRu}, ${lesson.time} |
                Преподаватель: ${lesson.teacher}
            `;

        }

        if (this.waitingName) this.waitingName.value = "";
        if (this.waitingPhone) this.waitingPhone.value = "";
        if (this.waitingEmail) this.waitingEmail.value = "";

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

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);
    }

    validatePhone(phone) {

        const cleaned = phone.replace(/\D/g, "");

        return cleaned.length >= 10;
    }

    saveWaiting() {

        const name = this.waitingName
            ? this.waitingName.value.trim()
            : "";

        const phone = this.waitingPhone
            ? this.waitingPhone.value.trim()
            : "";

        const email = this.waitingEmail
            ? this.waitingEmail.value.trim()
            : "";

        if (!name) {
            alert("Пожалуйста, укажите ваше имя");
            return;
        }

        if (name.length < 2) {
            alert("Имя должно содержать минимум 2 символа");
            return;
        }

        if (!phone) {
            alert("Пожалуйста, укажите номер телефона");
            return;
        }

        if (!this.validatePhone(phone)) {
            alert("Введите корректный номер телефона");
            return;
        }
        if (email && !this.validateEmail(email)) {
            alert("Введите корректный email");
            return;
        }

        if (!this.selectedLesson) {

            alert(
                "Ошибка: данные занятия потеряны. Попробуйте снова."
            );

            return;
        }

        let waitingList = JSON.parse(
            localStorage.getItem("elan_dance_waiting") || "[]"
        );

    
        waitingList.push({

            id: Date.now(),

            lessonId: this.selectedLesson.id,

            lessonName: this.selectedLesson.name,

            date:
                `${this.selectedLesson.dayRu} ${this.selectedLesson.time}`,

            teacher: this.selectedLesson.teacher,

            userName: name,

            userPhone: phone,

            userEmail: email,

            timestamp: new Date().toISOString()

        });

        localStorage.setItem(
            "elan_dance_waiting",
            JSON.stringify(waitingList)
        );

        alert(
            `✅ Вы успешно добавлены в лист ожидания!

Занятие:
${this.selectedLesson.name}

Дата:
${this.selectedLesson.dayRu}, ${this.selectedLesson.time}

Как только появится место — мы сразу свяжемся с вами.`
        );

        this.close();
    }
}

// Глобальный экземпляр
window.waitingModalManager =
    new WaitingModalManager();
