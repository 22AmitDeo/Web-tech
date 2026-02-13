// ===== Immediately Invoked Function Expression to avoid global scope pollution =====
(function() {
    'use strict';

    // ===== DOM Elements Selection =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const roleButtons = document.querySelectorAll('.role-btn');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const searchBar = document.getElementById('searchBar');
    const locationFilter = document.getElementById('locationFilter');

    // ===== Hamburger Menu Toggle =====
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // ===== Role Toggle Functionality =====
    if (roleButtons.length > 0) {
        roleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                roleButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                // Show/hide forms based on role
                const role = btn.dataset.role;
                document.getElementById('studentForm').classList.toggle('active', role === 'student');
                document.getElementById('companyForm').classList.toggle('active', role === 'company');
            });
        });
    }

    // ===== Validation Functions =====
    
    // Validate name (letters and spaces only, min 3 chars)
    function validateName(value) {
        const nameRegex = /^[a-zA-Z\s]{3,}$/;
        return nameRegex.test(value.trim());
    }

    // Validate email format
    function validateEmail(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value.trim());
    }

    // Validate password (min 8 chars, 1 uppercase, 1 number, 1 special char)
    function validatePassword(value) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        return passwordRegex.test(value);
    }

    // Validate CGPA (0-10)
    function validateCGPA(value) {
        const cgpa = parseFloat(value);
        return !isNaN(cgpa) && cgpa >= 0 && cgpa <= 10;
    }

    // Validate website URL
    function validateWebsite(value) {
        const urlRegex = /^https?:\/\/.+/;
        return urlRegex.test(value.trim());
    }

    // Validate resume file
    function validateResume(file) {
        if (!file) return { valid: false, message: 'Please select a file' };
        if (file.type !== 'application/pdf') {
            return { valid: false, message: 'Only PDF files are allowed' };
        }
        if (file.size > 2 * 1024 * 1024) {
            return { valid: false, message: 'File size must be less than 2MB' };
        }
        return { valid: true, message: '' };
    }

    // Show error message
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMsg = formGroup.querySelector('.error-msg');
        input.classList.add('invalid');
        input.classList.remove('valid');
        if (errorMsg) errorMsg.textContent = message;
    }

    // Show success
    function showSuccess(input) {
        const formGroup = input.parentElement;
        const errorMsg = formGroup.querySelector('.error-msg');
        input.classList.add('valid');
        input.classList.remove('invalid');
        if (errorMsg) errorMsg.textContent = '';
    }

    // Clear validation
    function clearValidation(input) {
        const formGroup = input.parentElement;
        const errorMsg = formGroup.querySelector('.error-msg');
        input.classList.remove('valid', 'invalid');
        if (errorMsg) errorMsg.textContent = '';
    }

    // ===== Real-time Validation for Register Form =====
    if (registerForm) {
        // Student Name Validation
        const studentName = document.getElementById('studentName');
        if (studentName) {
            studentName.addEventListener('input', (e) => {
                const value = e.target.value;
                if (value === '') {
                    clearValidation(e.target);
                } else if (!validateName(value)) {
                    showError(e.target, 'Name must contain only letters and spaces (min 3 characters)');
                } else {
                    showSuccess(e.target);
                }
            });
        }

        // Student Email Validation
        const studentEmail = document.getElementById('studentEmail');
        if (studentEmail) {
            studentEmail.addEventListener('input', (e) => {
                const value = e.target.value;
                if (value === '') {
                    clearValidation(e.target);
                } else if (!validateEmail(value)) {
                    showError(e.target, 'Please enter a valid email address');
                } else {
                    showSuccess(e.target);
                }
            });
        }

        // Student Password Validation
        const studentPassword = document.getElementById('studentPassword');
        if (studentPassword) {
            studentPassword.addEventListener('input', (e) => {
                const value = e.target.value;
                if (value === '') {
                    clearValidation(e.target);
                } else if (!validatePassword(value)) {
                    showError(e.target, 'Password must be 8+ chars with uppercase, number, and special character');
                } else {
                    showSuccess(e.target);
                }
            });
        }

        // Student Confirm Password Validation
        const studentConfirmPassword = document.getElementById('studentConfirmPassword');
        if (studentConfirmPassword) {
            studentConfirmPassword.addEventListener('input', (e) => {
                const value = e.target.value;
                const password = studentPassword ? studentPassword.value : '';
                if (value === '') {
                    clearValidation(e.target);
                } else if (value !== password) {
                    showError(e.target, 'Passwords do not match');
                } else {
                    showSuccess(e.target);
                }
            });
        }

        // College Validation
        const college = document.getElementById('college');
        if (college) {
            college.addEventListener('input', (e) => {
                const value = e.target.value;
                if (value === '') {
                    clearValidation(e.target);
                } else if (value.trim().length < 3) {
                    showError(e.target, 'College name must be at least 3 characters');
                } else {
                    showSuccess(e.target);
                }
            });
        }

        // Branch Validation
        const branch = document.getElementById('branch');
        if (branch) {
            branch.addEventListener('input', (e) => {
                const value = e.target.value;
                if (value === '') {
                    clearValidation(e.target);
                } else if (value.trim().length < 2) {
                    showError(e.target, 'Branch name must be at least 2 characters');
                } else {
                    showSuccess(e.target);
                }
            });
        }

        // CGPA Validation
        const cgpa = document.getElementById('cgpa');
        if (cgpa) {
            cgpa.addEventListener('input', (e) => {
                const value = e.target.value;
                if (value === '') {
                    clearValidation(e.target);
                } else if (!validateCGPA(value)) {
                    showError(e.target, 'CGPA must be between 0 and 10');
                } else {
                    showSuccess(e.target);
                }
            });
        }

        // Skills Validation
        const skills = document.getElementById('skills');
        if (skills) {
            skills.addEventListener('input', (e) => {
                const value = e.target.value;
                if (value === '') {
                    clearValidation(e.target);
                } else if (value.trim().length < 5) {
                    showError(e.target, 'Please enter at least 5 characters');
                } else {
                    showSuccess(e.target);
                }
            });
        }

        // Resume Validation
        const resume = document.getElementById('resume');
        if (resume) {
            resume.addEventListener('change', (e) => {
                const file = e.target.files[0];
                const result = validateResume(file);
                if (!result.valid) {
                    showError(e.target, result.message);
                } else {
                    showSuccess(e.target);
                }
            });
        }

        // Company Name Validation
        const companyName = document.getElementById('companyName');
        if (companyName) {
            companyName.addEventListener('input', (e) => {
                const value = e.target.value;
                if (value === '') {
                    clearValidation(e.target);
                } else if (value.trim().length < 3) {
                    showError(e.target, 'Company name must be at least 3 characters');
                } else {
                    showSuccess(e.target);
                }
            });
        }

        // Company Email Validation
        const companyEmail = document.getElementById('companyEmail');
        if (companyEmail) {
            companyEmail.addEventListener('input', (e) => {
                const value = e.target.value;
                if (value === '') {
                    clearValidation(e.target);
                } else if (!validateEmail(value)) {
                    showError(e.target, 'Please enter a valid email address');
                } else {
                    showSuccess(e.target);
                }
            });
        }

        // Company Password Validation
        const companyPassword = document.getElementById('companyPassword');
        if (companyPassword) {
            companyPassword.addEventListener('input', (e) => {
                const value = e.target.value;
                if (value === '') {
                    clearValidation(e.target);
                } else if (!validatePassword(value)) {
                    showError(e.target, 'Password must be 8+ chars with uppercase, number, and special character');
                } else {
                    showSuccess(e.target);
                }
            });
        }

        // Company Confirm Password Validation
        const companyConfirmPassword = document.getElementById('companyConfirmPassword');
        if (companyConfirmPassword) {
            companyConfirmPassword.addEventListener('input', (e) => {
                const value = e.target.value;
                const password = companyPassword ? companyPassword.value : '';
                if (value === '') {
                    clearValidation(e.target);
                } else if (value !== password) {
                    showError(e.target, 'Passwords do not match');
                } else {
                    showSuccess(e.target);
                }
            });
        }

        // Location Validation
        const location = document.getElementById('location');
        if (location) {
            location.addEventListener('input', (e) => {
                const value = e.target.value;
                if (value === '') {
                    clearValidation(e.target);
                } else if (value.trim().length < 3) {
                    showError(e.target, 'Location must be at least 3 characters');
                } else {
                    showSuccess(e.target);
                }
            });
        }

        // Website Validation
        const website = document.getElementById('website');
        if (website) {
            website.addEventListener('input', (e) => {
                const value = e.target.value;
                if (value === '') {
                    clearValidation(e.target);
                } else if (!validateWebsite(value)) {
                    showError(e.target, 'Website must start with http:// or https://');
                } else {
                    showSuccess(e.target);
                }
            });
        }

        // Description Validation
        const description = document.getElementById('description');
        if (description) {
            description.addEventListener('input', (e) => {
                const value = e.target.value;
                if (value === '') {
                    clearValidation(e.target);
                } else if (value.trim().length < 10) {
                    showError(e.target, 'Description must be at least 10 characters');
                } else {
                    showSuccess(e.target);
                }
            });
        }

        // Form Submission
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const activeRole = document.querySelector('.role-btn.active').dataset.role;
            let isValid = true;

            if (activeRole === 'student') {
                // Validate all student fields
                const fields = [
                    { element: studentName, validator: validateName, message: 'Invalid name' },
                    { element: studentEmail, validator: validateEmail, message: 'Invalid email' },
                    { element: studentPassword, validator: validatePassword, message: 'Invalid password' },
                    { element: college, validator: (v) => v.trim().length >= 3, message: 'Invalid college' },
                    { element: branch, validator: (v) => v.trim().length >= 2, message: 'Invalid branch' },
                    { element: cgpa, validator: validateCGPA, message: 'Invalid CGPA' },
                    { element: skills, validator: (v) => v.trim().length >= 5, message: 'Invalid skills' }
                ];

                fields.forEach(field => {
                    if (!field.element || !field.validator(field.element.value)) {
                        if (field.element) showError(field.element, field.message);
                        isValid = false;
                    }
                });

                // Check confirm password
                if (studentConfirmPassword && studentConfirmPassword.value !== studentPassword.value) {
                    showError(studentConfirmPassword, 'Passwords do not match');
                    isValid = false;
                }

                // Validate resume
                if (resume && resume.files.length > 0) {
                    const result = validateResume(resume.files[0]);
                    if (!result.valid) {
                        showError(resume, result.message);
                        isValid = false;
                    }
                } else {
                    showError(resume, 'Please upload your resume');
                    isValid = false;
                }
            } else {
                // Validate all company fields
                const fields = [
                    { element: companyName, validator: (v) => v.trim().length >= 3, message: 'Invalid company name' },
                    { element: companyEmail, validator: validateEmail, message: 'Invalid email' },
                    { element: companyPassword, validator: validatePassword, message: 'Invalid password' },
                    { element: location, validator: (v) => v.trim().length >= 3, message: 'Invalid location' },
                    { element: website, validator: validateWebsite, message: 'Invalid website URL' },
                    { element: description, validator: (v) => v.trim().length >= 10, message: 'Invalid description' }
                ];

                fields.forEach(field => {
                    if (!field.element || !field.validator(field.element.value)) {
                        if (field.element) showError(field.element, field.message);
                        isValid = false;
                    }
                });

                // Check confirm password
                if (companyConfirmPassword && companyConfirmPassword.value !== companyPassword.value) {
                    showError(companyConfirmPassword, 'Passwords do not match');
                    isValid = false;
                }
            }

            if (isValid) {
                alert('Registration successful!');
                registerForm.reset();
                // Clear all validation states
                document.querySelectorAll('.valid, .invalid').forEach(el => {
                    el.classList.remove('valid', 'invalid');
                });
                document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
            }
        });
    }

    // ===== Login Form Validation =====
    if (loginForm) {
        const loginEmail = document.getElementById('loginEmail');
        const loginPassword = document.getElementById('loginPassword');

        // Email validation
        if (loginEmail) {
            loginEmail.addEventListener('input', (e) => {
                const value = e.target.value;
                if (value === '') {
                    clearValidation(e.target);
                } else if (!validateEmail(value)) {
                    showError(e.target, 'Please enter a valid email address');
                } else {
                    showSuccess(e.target);
                }
            });
        }

        // Password validation
        if (loginPassword) {
            loginPassword.addEventListener('input', (e) => {
                const value = e.target.value;
                if (value === '') {
                    clearValidation(e.target);
                } else if (value.length < 1) {
                    showError(e.target, 'Password is required');
                } else {
                    showSuccess(e.target);
                }
            });
        }

        // Form submission
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;

            // Validate email
            if (!loginEmail || !validateEmail(loginEmail.value)) {
                if (loginEmail) showError(loginEmail, 'Please enter a valid email');
                isValid = false;
            }

            // Validate password
            if (!loginPassword || loginPassword.value.trim() === '') {
                if (loginPassword) showError(loginPassword, 'Password is required');
                isValid = false;
            }

            if (isValid) {
                alert('Login successful!');
                loginForm.reset();
                document.querySelectorAll('.valid, .invalid').forEach(el => {
                    el.classList.remove('valid', 'invalid');
                });
                document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
            }
        });
    }

    // ===== Internship Filtering =====
    if (searchBar && locationFilter) {
        const internshipCards = document.querySelectorAll('.internship-card');

        function filterInternships() {
            const searchTerm = searchBar.value.toLowerCase();
            const selectedLocation = locationFilter.value;

            internshipCards.forEach(card => {
                const title = card.dataset.title.toLowerCase();
                const location = card.dataset.location;

                const matchesSearch = title.includes(searchTerm);
                const matchesLocation = selectedLocation === 'all' || location === selectedLocation;

                if (matchesSearch && matchesLocation) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        searchBar.addEventListener('input', filterInternships);
        locationFilter.addEventListener('change', filterInternships);
    }

})();
