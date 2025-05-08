document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('membershipForm');
    const fields = {
        name: {
            element: document.getElementById('name'),
            error: document.getElementById('nameError'),
            validate: function(value) {
                if (!value) return 'Nama tidak boleh kosong';
                if (value.length < 3) return 'Nama minimal 3 karakter';
                if (!/^[\p{L} ]+$/u.test(value)) return 'Nama hanya boleh berisi huruf';
                return '';
            }
        },
        email: {
            element: document.getElementById('email'),
            error: document.getElementById('emailError'),
            validate: function(value) {
                if (!value) return 'Email tidak boleh kosong';
                if (!value.includes('@') || !value.includes('.')) return 'Format email tidak valid';
                return '';
            }
        },
        gender: {
            element: document.getElementsByName('gender'),
            error: document.getElementById('genderError'),
            validate: function(value) {
                if (!Array.from(this.element).some(radio => radio.checked)) {
                    return 'Pilih jenis kelamin';
                }
                return '';
            }
        },
        birthdate: {
            element: document.getElementById('birthdate'),
            error: document.getElementById('birthdateError'),
            validate: function(value) {
                if (!value) return 'Tanggal lahir tidak boleh kosong';
                const birthDate = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                if (age < 17) return 'Usia minimal 17 tahun';
                return '';
            }
        },
        password: {
            element: document.getElementById('password'),
            error: document.getElementById('passwordError'),
            validate: function(value) {
                if (!value) return 'Password tidak boleh kosong';
                if (value.length < 8) return 'Password minimal 8 karakter';
                if (!/[A-Z]/.test(value)) return 'Password harus mengandung huruf besar';
                if (!/[0-9]/.test(value)) return 'Password harus mengandung angka';
                return '';
            }
        },
        confirmPassword: {
            element: document.getElementById('confirmPassword'),
            error: document.getElementById('confirmPasswordError'),
            validate: function(value) {
                if (!value) return 'Konfirmasi password tidak boleh kosong';
                if (value !== fields.password.element.value) return 'Password tidak cocok';
                return '';
            }
        },
        terms: {
            element: document.getElementById('terms'),
            error: document.getElementById('termsError'),
            validate: function(value) {
                if (!this.element.checked) return 'Anda harus menyetujui syarat dan ketentuan';
                return '';
            }
        }
    };

    // Validasi saat input berubah
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        if (field.element instanceof HTMLElement) {
            field.element.addEventListener('input', () => {
                validateField(fieldName);
            });
        }
    });

    // Fungsi validasi per field
    function validateField(fieldName) {
        const field = fields[fieldName];
        const value = field.element instanceof HTMLElement ? field.element.value : '';
        const errorMessage = field.validate(value);
        field.error.textContent = errorMessage;

        if (errorMessage) {
            field.element instanceof HTMLElement && field.element.classList.add('error');
            field.element instanceof HTMLElement && field.element.classList.remove('valid');
            return false;
        } else {
            field.element instanceof HTMLElement && field.element.classList.remove('error');
            field.element instanceof HTMLElement && field.element.classList.add('valid');
            return true;
        }
    }

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validasi semua field
        Object.keys(fields).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Simulasi pengiriman data
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Pendaftaran berhasil! Anda akan diarahkan ke halaman member.';
            form.insertBefore(successMessage, form.firstChild);
            successMessage.style.display = 'block';

            // Reset form setelah berhasil
            setTimeout(() => {
                form.reset();
                Object.keys(fields).forEach(fieldName => {
                    const field = fields[fieldName];
                    if (field.element instanceof HTMLElement) {
                        field.element.classList.remove('valid');
                    }
                });
                window.location.href = 'index.html';
            }, 2000);
        }
    });
});