
function renderTeachers() {
    const grid = document.getElementById("teachersGrid");
    if (!grid) return;

    grid.innerHTML = teachersData.map(teacher => `
        <div class="teacher-card">
            <div class="teacher-icon">
                <span class="material-symbols-rounded">${teacher.icon}</span>
            </div>
            <h3>${teacher.name}</h3>
            <p class="teacher-specialty">${teacher.specialty}</p>
            <p class="teacher-desc">${teacher.description}</p>
        </div>
    `).join("");
}

function renderDirections() {
    const grid = document.getElementById("directionsGrid");
    if (!grid) return;

    grid.innerHTML = directionsData.map(dir => `
        <div class="direction-card">
            <div class="direction-icon">
                <span class="material-symbols-rounded">${dir.icon}</span>
            </div>
            <h3>${dir.name}</h3>
            <p>${dir.description}</p>
        </div>
    `).join("");
}

function renderSchedule(filter = "all") {
    const container = document.getElementById("scheduleContainer");
    if (!container) return;

    const filtered = filter === "all"
        ? scheduleData
        : scheduleData.filter(item => item.day === filter);

    if (filtered.length === 0) {
        container.innerHTML = '<p class="no-lessons">Нет занятий в этот день</p>';
        return;
    }

    container.innerHTML = filtered.map(lesson => {
        const available = getAvailableSeats(lesson);
        const seatsClass = getSeatsClass(available, lesson.totalSeats);
        const seatsText = getSeatsText(available, lesson.totalSeats);
        const isFull = available === 0;

        return `
            <div class="schedule-card ${isFull ? 'schedule-card--full' : ''}">
                <div class="schedule-card-header">
                    <div class="schedule-time">
                        <span class="material-symbols-rounded time-icon">schedule</span>
                        ${lesson.time}
                    </div>
                    <div class="schedule-day-badge">${lesson.dayShort}</div>
                </div>

                <h3 class="schedule-name">${lesson.name}</h3>

                <div class="schedule-meta">
                    <span class="schedule-teacher">
                        <span class="material-symbols-rounded meta-icon">person</span>
                        ${lesson.teacher}
                    </span>

                    <span class="schedule-level">
                        <span class="material-symbols-rounded meta-icon">signal_cellular_alt</span>
                        ${lesson.level}
                    </span>
                </div>

                <div class="schedule-seats ${seatsClass}">
                    ${seatsText}
                </div>

                <button class="schedule-btn ${isFull ? 'schedule-btn--waiting' : ''}"
                        onclick="${isFull
                            ? `window.waitingModalManager.open(scheduleData.find(l => l.id === ${lesson.id}))`
                            : `window.bookingModalManager.open(scheduleData.find(l => l.id === ${lesson.id}))`
                        }">

                    ${isFull
                        ? '<span class="material-symbols-rounded btn-icon">hourglass_top</span> В лист ожидания'
                        : '<span class="material-symbols-rounded btn-icon">edit_calendar</span> Записаться'
                    }

                </button>
            </div>
        `;
    }).join("");
}

function initFilters() {
    const filterContainer = document.getElementById("filterButtons");
    if (!filterContainer) return;

    filterContainer.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter-btn");
        if (!btn) return;

        filterContainer.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        renderSchedule(btn.dataset.day);
    });
}

// ===== БУРГЕР =====
function initBurger() {
    const burgerBtn = document.getElementById("burgerBtn");
    const nav = document.getElementById("mobileNav");

    if (!burgerBtn || !nav) return;

    burgerBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    });
}
function initValidation() {

    document.addEventListener("input", (e) => {

        if (e.target.type === "tel") {
            e.target.value = e.target.value.replace(/[^\d+\-\(\)\s]/g, "");
        }

        if (e.target.type === "text") {
            e.target.value = e.target.value.replace(/[0-9]/g, "");
        }

    });

}
document.addEventListener("DOMContentLoaded", () => {

    renderTeachers();
    renderDirections();
    renderSchedule();

    initFilters();
    initBurger();
    initValidation();

});
