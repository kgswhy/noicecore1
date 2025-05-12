document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('membershipForm');
    const inputs = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        gender: document.getElementsByName('gender'),
        birthdate: document.getElementById('birthdate'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirmPassword'),
        terms: document.getElementById('terms')
    };

    const errors = {
        name: document.getElementById('nameError'),
        email: document.getElementById('emailError'),
        gender: document.getElementById('genderError'),
        birthdate: document.getElementById('birthdateError'),
        password: document.getElementById('passwordError'),
        confirmPassword: document.getElementById('confirmPasswordError'),
        terms: document.getElementById('termsError')
    };

    // Validation rules
    const validations = {
        name: (value) => {
            if (!value.trim()) return 'Nama harus diisi';
            if (value.length < 2) return 'Nama minimal 2 karakter';
            return '';
        },
        email: (value) => {
            if (!value) return 'Email harus diisi';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return 'Format email tidak valid';
            return '';
        },
        gender: (elements) => {
            const selected = Array.from(elements).some(radio => radio.checked);
            return selected ? '' : 'Pilih jenis kelamin';
        },
        birthdate: (value) => {
            if (!value) return 'Tanggal lahir harus diisi';
            const date = new Date(value);
            const now = new Date();
            if (date > now) return 'Tanggal lahir tidak valid';
            return '';
        },
        password: (value) => {
            if (!value) return 'Password harus diisi';
            if (value.length < 8) return 'Password minimal 8 karakter';
            if (!/[A-Z]/.test(value)) return 'Password harus mengandung huruf besar';
            if (!/[a-z]/.test(value)) return 'Password harus mengandung huruf kecil';
            if (!/[0-9]/.test(value)) return 'Password harus mengandung angka';
            return '';
        },
        confirmPassword: (value, password) => {
            if (!value) return 'Konfirmasi password harus diisi';
            if (value !== password) return 'Password tidak cocok';
            return '';
        },
        terms: (checked) => {
            return checked ? '' : 'Anda harus menyetujui syarat dan ketentuan';
        }
    };

    // Show error message
    const showError = (element, message) => {
        const errorElement = errors[element];
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('visible');
            if (inputs[element].type !== 'radio' && inputs[element].type !== 'checkbox') {
                inputs[element].classList.add('error');
                inputs[element].classList.remove('valid');
            }
        }
    };

    // Hide error message
    const hideError = (element) => {
        const errorElement = errors[element];
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('visible');
            if (inputs[element].type !== 'radio' && inputs[element].type !== 'checkbox') {
                inputs[element].classList.remove('error');
                inputs[element].classList.add('valid');
            }
        }
    };

    // Validate single field
    const validateField = (field) => {
        let value;
        let isValid = true;

        switch(field) {
            case 'gender':
                value = inputs[field];
                const genderError = validations[field](value);
                if (genderError) {
                    showError(field, genderError);
                    isValid = false;
                } else {
                    hideError(field);
                }
                break;
            case 'terms':
                value = inputs[field].checked;
                const termsError = validations[field](value);
                if (termsError) {
                    showError(field, termsError);
                    isValid = false;
                } else {
                    hideError(field);
                }
                break;
            case 'confirmPassword':
                value = inputs[field].value;
                const confirmError = validations[field](value, inputs.password.value);
                if (confirmError) {
                    showError(field, confirmError);
                    isValid = false;
                } else {
                    hideError(field);
                }
                break;
            default:
                value = inputs[field].value;
                const error = validations[field](value);
                if (error) {
                    showError(field, error);
                    isValid = false;
                } else {
                    hideError(field);
                }
        }

        return isValid;
    };

    // Add input event listeners for real-time validation
    Object.keys(inputs).forEach(field => {
        if (field === 'gender') {
            inputs[field].forEach(radio => {
                radio.addEventListener('change', () => validateField(field));
            });
        } else if (inputs[field]) {
            inputs[field].addEventListener('input', () => validateField(field));
            inputs[field].addEventListener('blur', () => validateField(field));
        }
    });

    // Password strength indicator
    const updatePasswordStrength = (password) => {
        const strengthBar = document.querySelector('.password-strength-bar');
        if (!strengthBar) return;

        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        strengthBar.className = 'password-strength-bar';
        if (strength >= 4) strengthBar.classList.add('strength-strong');
        else if (strength >= 2) strengthBar.classList.add('strength-medium');
        else if (strength >= 1) strengthBar.classList.add('strength-weak');
    };

    if (inputs.password) {
        inputs.password.addEventListener('input', (e) => {
            updatePasswordStrength(e.target.value);
        });
    }

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Validate all fields
        Object.keys(validations).forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Pendaftaran berhasil! Anda akan diarahkan ke halaman login.';
            document.body.appendChild(successMessage);

            setTimeout(() => {
                successMessage.classList.add('show');
            }, 100);

            setTimeout(() => {
                // Here you would typically submit the form data to your server
                // For now, we'll just redirect to a success page
                window.location.href = 'login.html';
            }, 2000);
        }
    });
});