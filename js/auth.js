// 认证相关的JavaScript功能

// 密码可见性切换
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.password-toggle');
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// 密码强度检测
function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = [];
    
    // 长度检查
    if (password.length >= 8) strength += 1;
    else feedback.push('至少8个字符');
    
    // 包含小写字母
    if (/[a-z]/.test(password)) strength += 1;
    else feedback.push('包含小写字母');
    
    // 包含大写字母
    if (/[A-Z]/.test(password)) strength += 1;
    else feedback.push('包含大写字母');
    
    // 包含数字
    if (/\d/.test(password)) strength += 1;
    else feedback.push('包含数字');
    
    // 包含特殊字符
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    else feedback.push('包含特殊字符');
    
    return { strength, feedback };
}

// 更新密码强度显示
function updatePasswordStrength() {
    const passwordInput = document.getElementById('password');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (!passwordInput || !strengthFill || !strengthText) return;
    
    const password = passwordInput.value;
    const { strength, feedback } = checkPasswordStrength(password);
    
    // 清除所有强度类
    strengthFill.className = 'strength-fill';
    
    if (password.length === 0) {
        strengthText.textContent = '密码强度：无';
        return;
    }
    
    // 根据强度设置样式和文本
    if (strength <= 2) {
        strengthFill.classList.add('weak');
        strengthText.textContent = '密码强度：弱';
        strengthText.style.color = '#ef4444';
    } else if (strength === 3) {
        strengthFill.classList.add('fair');
        strengthText.textContent = '密码强度：一般';
        strengthText.style.color = '#f59e0b';
    } else if (strength === 4) {
        strengthFill.classList.add('good');
        strengthText.textContent = '密码强度：良好';
        strengthText.style.color = '#10b981';
    } else {
        strengthFill.classList.add('strong');
        strengthText.textContent = '密码强度：很强';
        strengthText.style.color = '#059669';
    }
}

// 验证密码匹配
function validatePasswordMatch() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    if (!password || !confirmPassword) return true;
    
    const isMatch = password.value === confirmPassword.value;
    
    if (confirmPassword.value && !isMatch) {
        confirmPassword.setCustomValidity('密码不匹配');
        confirmPassword.style.borderColor = '#ef4444';
    } else {
        confirmPassword.setCustomValidity('');
        confirmPassword.style.borderColor = '';
    }
    
    return isMatch;
}

// 邮箱格式验证
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 登录表单处理
function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const remember = formData.get('remember');
    
    // 基本验证
    if (!validateEmail(email)) {
        showMessage('请输入有效的邮箱地址', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('密码长度至少6位', 'error');
        return;
    }
    
    // 显示加载状态
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');
    
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    btnSpinner.style.display = 'inline-block';
    
    // 模拟API请求
    setTimeout(() => {
        // 这里应该是实际的API调用
        console.log('登录数据:', { email, password, remember });
        
        // 模拟成功登录
        showMessage('登录成功！正在跳转...', 'success');
        
        // 存储登录状态
        if (remember) {
            localStorage.setItem('rememberLogin', 'true');
        }
        localStorage.setItem('userEmail', email);
        
        // 跳转到仪表板
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    }, 2000);
}

// 注册表单处理
function handleRegister(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const plan = formData.get('plan');
    const terms = formData.get('terms');
    
    // 验证必填字段
    if (!firstName || !lastName || !email || !password || !confirmPassword || !plan) {
        showMessage('请填写所有必填字段', 'error');
        return;
    }
    
    // 邮箱验证
    if (!validateEmail(email)) {
        showMessage('请输入有效的邮箱地址', 'error');
        return;
    }
    
    // 密码强度验证
    const { strength } = checkPasswordStrength(password);
    if (strength < 3) {
        showMessage('密码强度太弱，请设置更安全的密码', 'error');
        return;
    }
    
    // 密码匹配验证
    if (password !== confirmPassword) {
        showMessage('两次输入的密码不匹配', 'error');
        return;
    }
    
    // 服务条款验证
    if (!terms) {
        showMessage('请同意服务条款和隐私政策', 'error');
        return;
    }
    
    // 显示加载状态
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');
    
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    btnSpinner.style.display = 'inline-block';
    
    // 模拟API请求
    setTimeout(() => {
        // 这里应该是实际的API调用
        console.log('注册数据:', {
            firstName,
            lastName,
            email,
            password,
            plan,
            newsletter: formData.get('newsletter')
        });
        
        // 模拟成功注册
        showMessage('注册成功！请查收邮箱验证邮件', 'success');
        
        // 跳转到登录页面
        setTimeout(() => {
            window.location.href = 'login.html?email=' + encodeURIComponent(email);
        }, 2000);
        
    }, 2000);
}

// 社交登录处理
function handleSocialLogin(provider) {
    showMessage(`正在跳转到 ${provider} 授权页面...`, 'info');
    
    // 这里应该是实际的社交登录跳转
    setTimeout(() => {
        console.log(`${provider} 登录`);
        // window.location.href = `/auth/${provider}`;
    }, 1000);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 登录表单
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        
        // 自动填充邮箱（如果从注册页面跳转来的）
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');
        if (email) {
            document.getElementById('email').value = email;
        }
        
        // 记住我功能
        const rememberCheckbox = document.getElementById('remember');
        const emailInput = document.getElementById('email');
        
        if (localStorage.getItem('rememberLogin') === 'true') {
            const savedEmail = localStorage.getItem('userEmail');
            if (savedEmail) {
                emailInput.value = savedEmail;
                rememberCheckbox.checked = true;
            }
        }
    }
    
    // 注册表单
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
        
        // 密码强度实时检测
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', updatePasswordStrength);
        }
        
        // 密码匹配验证
        const confirmPasswordInput = document.getElementById('confirmPassword');
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', validatePasswordMatch);
        }
    }
    
    // 社交登录按钮
    const githubBtn = document.querySelector('.btn-github');
    const googleBtn = document.querySelector('.btn-google');
    
    if (githubBtn) {
        githubBtn.addEventListener('click', () => handleSocialLogin('GitHub'));
    }
    
    if (googleBtn) {
        googleBtn.addEventListener('click', () => handleSocialLogin('Google'));
    }
});

// 表单输入优化
document.addEventListener('DOMContentLoaded', function() {
    // 输入框焦点效果
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // 实时验证
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#ef4444';
                showMessage('请输入有效的邮箱地址', 'error');
            } else {
                this.style.borderColor = '';
            }
        });
    });
});

// 导出函数供其他脚本使用
window.AuthUtils = {
    validateEmail,
    checkPasswordStrength,
    validatePasswordMatch,
    togglePassword
};