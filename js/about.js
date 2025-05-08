// Fungsi untuk menambahkan kelas 'visible' saat elemen muncul di viewport
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Berhenti mengamati setelah animasi pertama
        }
    });
}

// Konfigurasi Intersection Observer
const observerOptions = {
    threshold: 0.2, // Elemen akan terlihat ketika 20% terlihat di viewport
    rootMargin: '0px'
};

// Membuat observer
const observer = new IntersectionObserver(handleIntersection, observerOptions);

// Menambahkan observer ke semua section dan timeline items
document.addEventListener('DOMContentLoaded', () => {
    // Mengamati sections
    const sections = document.querySelectorAll('.mission-section, .values-section, .history-section');
    sections.forEach(section => observer.observe(section));

    // Mengamati timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));
});