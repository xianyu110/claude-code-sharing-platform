// 全局变量
let currentUser = null;
let rooms = [];
let userRooms = [];

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadRoomsData();
    checkAuthStatus();
});

function initializeApp() {
    // 移动端导航栏切换
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // 点击导航链接时关闭移动端菜单
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // 初始化统计数字动画
    animateCounters();
    
    // 初始化模态框
    initModal();
    
    // 初始化标签页
    initTabs();
}

// 导航和滚动功能
function setupEventListeners() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // 导航链接点击处理
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
}

// 显示指定部分
function showSection(sectionId) {
    // 隐藏所有部分
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示目标部分
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // 更新导航链接状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`a[href="#${sectionId}"]`)?.classList.add('active');
}

// 滚动到指定部分
function scrollToSection(sectionId) {
    showSection(sectionId);
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// 数字动画效果
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                let current = 0;
                const increment = target / 50;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// 特色卡片hover效果增强
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 价格卡片点击效果
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('click', function() {
        // 移除其他卡片的选中效果
        document.querySelectorAll('.pricing-card').forEach(c => {
            c.classList.remove('selected');
        });
        // 添加选中效果
        this.classList.add('selected');
    });
});

// 页面加载动画
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// 添加页面淡入效果
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.feature-card, .pricing-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 表单验证（如果有）
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 通用API请求函数
async function apiRequest(endpoint, method = 'GET', data = null) {
    const config = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    if (data) {
        config.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(endpoint, config);
        return await response.json();
    } catch (error) {
        console.error('API请求失败:', error);
        throw error;
    }
}

// 消息提示功能
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // 添加样式
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // 根据类型设置背景色
    switch(type) {
        case 'success':
            messageDiv.style.background = '#10b981';
            break;
        case 'error':
            messageDiv.style.background = '#ef4444';
            break;
        case 'warning':
            messageDiv.style.background = '#f59e0b';
            break;
        default:
            messageDiv.style.background = '#6366f1';
    }
    
    document.body.appendChild(messageDiv);
    
    // 显示动画
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// 复制到剪贴板功能
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showMessage('已复制到剪贴板', 'success');
    }).catch(() => {
        // 降级方案
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showMessage('已复制到剪贴板', 'success');
    });
}

// 主题切换功能（可选）
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

// 初始化主题
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// 认证相关功能
function checkAuthStatus() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        updateUIForLoggedInUser();
    }
}

function updateUIForLoggedInUser() {
    const authButtons = document.querySelector('.auth-buttons');
    const userMenu = document.querySelector('.user-menu');
    const dashboardLink = document.querySelector('.dashboard-link');
    
    if (authButtons) authButtons.style.display = 'none';
    if (userMenu) {
        userMenu.style.display = 'flex';
        userMenu.querySelector('.username').textContent = currentUser.username;
    }
    if (dashboardLink) dashboardLink.style.display = 'block';
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    
    const authButtons = document.querySelector('.auth-buttons');
    const userMenu = document.querySelector('.user-menu');
    const dashboardLink = document.querySelector('.dashboard-link');
    
    if (authButtons) authButtons.style.display = 'flex';
    if (userMenu) userMenu.style.display = 'none';
    if (dashboardLink) dashboardLink.style.display = 'none';
    
    showSection('home');
    showMessage('已退出登录', 'success');
}

// 模态框功能
function initModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function showModal(content) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

function hideModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// 标签页功能
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            showTab(tabId);
        });
    });
}

function showTab(tabId) {
    // 隐藏所有标签内容
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // 移除所有按钮的活跃状态
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 显示目标标签和激活按钮
    const targetContent = document.getElementById(tabId) || document.getElementById(tabId + '-tab');
    const targetBtn = document.querySelector(`[data-tab="${tabId}"]`);
    
    if (targetContent) targetContent.classList.add('active');
    if (targetBtn) targetBtn.classList.add('active');
    
    // 加载标签内容
    loadTabContent(tabId);
}

function loadTabContent(tabId) {
    switch(tabId) {
        case 'rooms':
            loadUserRooms();
            break;
        case 'usage':
            loadUsageStats();
            break;
        case 'billing':
            loadBillingInfo();
            break;
        case 'settings':
            loadUserSettings();
            break;
    }
}

// 房间管理功能
function loadRoomsData() {
    // 模拟房间数据
    rooms = [
        {
            id: 1,
            name: 'Claude Max 合租团',
            plan: 'max',
            members: 4,
            maxMembers: 6,
            monthlyFee: 200,
            costPerPerson: 33.33,
            status: 'recruiting',
            owner: 'alice',
            description: '寻找稳定的开发者一起分摊 Claude Max 费用，已有4人，还缺2人。'
        },
        {
            id: 2,
            name: 'Pro 版小团队',
            plan: 'pro',
            members: 3,
            maxMembers: 4,
            monthlyFee: 20,
            costPerPerson: 5,
            status: 'recruiting',
            owner: 'bob',
            description: '小团队合租 Claude Pro，适合轻度使用者。'
        },
        {
            id: 3,
            name: '企业开发团队',
            plan: 'max',
            members: 8,
            maxMembers: 8,
            monthlyFee: 200,
            costPerPerson: 25,
            status: 'full',
            owner: 'charlie',
            description: '企业级开发团队，已满员。'
        }
    ];
    
    renderRooms();
}

function renderRooms() {
    const roomsGrid = document.getElementById('roomsGrid');
    if (!roomsGrid) return;
    
    roomsGrid.innerHTML = rooms.map(room => `
        <div class="room-card ${room.status}" data-room-id="${room.id}">
            <div class="room-header">
                <h3>${room.name}</h3>
                <span class="room-status ${room.status}">
                    ${room.status === 'recruiting' ? '招募中' : '已满员'}
                </span>
            </div>
            <div class="room-info">
                <div class="room-plan">
                    <i class="fas fa-crown"></i>
                    Claude ${room.plan.toUpperCase()}
                </div>
                <div class="room-members">
                    <i class="fas fa-users"></i>
                    ${room.members}/${room.maxMembers} 人
                </div>
                <div class="room-cost">
                    <i class="fas fa-dollar-sign"></i>
                    $${room.costPerPerson}/月
                </div>
            </div>
            <p class="room-description">${room.description}</p>
            <div class="room-actions">
                ${room.status === 'recruiting' ? 
                    `<button class="btn btn-primary" onclick="joinRoom(${room.id})">
                        <i class="fas fa-plus"></i> 加入房间
                    </button>` :
                    `<button class="btn btn-outline" disabled>
                        <i class="fas fa-check"></i> 已满员
                    </button>`
                }
                <button class="btn btn-outline" onclick="viewRoomDetails(${room.id})">
                    <i class="fas fa-info"></i> 详情
                </button>
            </div>
        </div>
    `).join('');
}

// 房间操作
function joinRoom(roomId) {
    if (!currentUser) {
        showLogin();
        return;
    }
    
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;
    
    if (room.status === 'full') {
        showMessage('房间已满员', 'warning');
        return;
    }
    
    // 检查是否已经加入
    if (userRooms.find(r => r.id === roomId)) {
        showMessage('您已经是该房间成员', 'warning');
        return;
    }
    
    // 加入房间
    room.members++;
    if (room.members >= room.maxMembers) {
        room.status = 'full';
    }
    room.costPerPerson = room.monthlyFee / room.members;
    
    userRooms.push(room);
    
    renderRooms();
    showMessage(`成功加入 ${room.name}`, 'success');
}

function viewRoomDetails(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;
    
    const content = `
        <div class="room-details">
            <h2>${room.name}</h2>
            <div class="details-grid">
                <div class="detail-item">
                    <label>订阅方案：</label>
                    <span>Claude ${room.plan.toUpperCase()}</span>
                </div>
                <div class="detail-item">
                    <label>成员数量：</label>
                    <span>${room.members}/${room.maxMembers} 人</span>
                </div>
                <div class="detail-item">
                    <label>月费总额：</label>
                    <span>$${room.monthlyFee}</span>
                </div>
                <div class="detail-item">
                    <label>人均费用：</label>
                    <span>$${room.costPerPerson.toFixed(2)}/月</span>
                </div>
                <div class="detail-item">
                    <label>房主：</label>
                    <span>${room.owner}</span>
                </div>
                <div class="detail-item">
                    <label>状态：</label>
                    <span class="status ${room.status}">
                        ${room.status === 'recruiting' ? '招募中' : '已满员'}
                    </span>
                </div>
            </div>
            <div class="room-description">
                <h4>房间描述</h4>
                <p>${room.description}</p>
            </div>
            ${room.status === 'recruiting' ? 
                `<button class="btn btn-primary btn-full" onclick="joinRoom(${room.id}); hideModal();">
                    <i class="fas fa-plus"></i> 加入房间
                </button>` : ''
            }
        </div>
    `;
    
    showModal(content);
}

function showCreateRoom() {
    if (!currentUser) {
        showLogin();
        return;
    }
    
    const content = `
        <div class="create-room-form">
            <h2>创建合租房间</h2>
            <form onsubmit="createRoom(event)">
                <div class="form-group">
                    <label>房间名称</label>
                    <input type="text" name="roomName" required placeholder="请输入房间名称">
                </div>
                <div class="form-group">
                    <label>订阅方案</label>
                    <select name="plan" required>
                        <option value="">请选择方案</option>
                        <option value="pro">Claude Pro ($20/月)</option>
                        <option value="max">Claude Max ($200/月)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>最大成员数</label>
                    <input type="number" name="maxMembers" min="2" max="10" required placeholder="2-10人">
                </div>
                <div class="form-group">
                    <label>房间描述</label>
                    <textarea name="description" required placeholder="请简单描述您的房间规则和要求"></textarea>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">创建房间</button>
                    <button type="button" class="btn btn-outline" onclick="hideModal()">取消</button>
                </div>
            </form>
        </div>
    `;
    
    showModal(content);
}

function createRoom(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const plan = formData.get('plan');
    const monthlyFee = plan === 'pro' ? 20 : 200;
    
    const newRoom = {
        id: rooms.length + 1,
        name: formData.get('roomName'),
        plan: plan,
        members: 1,
        maxMembers: parseInt(formData.get('maxMembers')),
        monthlyFee: monthlyFee,
        costPerPerson: monthlyFee,
        status: 'recruiting',
        owner: currentUser.username,
        description: formData.get('description')
    };
    
    rooms.push(newRoom);
    userRooms.push(newRoom);
    
    renderRooms();
    hideModal();
    showMessage('房间创建成功', 'success');
}

// 用户功能
function showLogin() {
    const content = `
        <div class="auth-form">
            <h2>用户登录</h2>
            <form onsubmit="handleLogin(event)">
                <div class="form-group">
                    <label>用户名或邮箱</label>
                    <input type="text" name="username" required placeholder="请输入用户名或邮箱">
                </div>
                <div class="form-group">
                    <label>密码</label>
                    <input type="password" name="password" required placeholder="请输入密码">
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary btn-full">登录</button>
                </div>
                <div class="auth-links">
                    <a href="#" onclick="showRegister()">还没有账户？立即注册</a>
                    <a href="#">忘记密码？</a>
                </div>
            </form>
        </div>
    `;
    
    showModal(content);
}

function showRegister() {
    const content = `
        <div class="auth-form">
            <h2>用户注册</h2>
            <form onsubmit="handleRegister(event)">
                <div class="form-group">
                    <label>用户名</label>
                    <input type="text" name="username" required placeholder="请输入用户名">
                </div>
                <div class="form-group">
                    <label>邮箱</label>
                    <input type="email" name="email" required placeholder="请输入邮箱地址">
                </div>
                <div class="form-group">
                    <label>密码</label>
                    <input type="password" name="password" required placeholder="请输入密码">
                </div>
                <div class="form-group">
                    <label>确认密码</label>
                    <input type="password" name="confirmPassword" required placeholder="请再次输入密码">
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary btn-full">注册</button>
                </div>
                <div class="auth-links">
                    <a href="#" onclick="showLogin()">已有账户？立即登录</a>
                </div>
            </form>
        </div>
    `;
    
    showModal(content);
}

function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    // 模拟登录验证
    if (username && password) {
        currentUser = {
            id: 1,
            username: username,
            email: username.includes('@') ? username : `${username}@example.com`
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUIForLoggedInUser();
        hideModal();
        showMessage('登录成功', 'success');
    } else {
        showMessage('用户名或密码错误', 'error');
    }
}

function handleRegister(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password !== confirmPassword) {
        showMessage('两次输入的密码不一致', 'error');
        return;
    }
    
    // 模拟注册
    currentUser = {
        id: Date.now(),
        username: formData.get('username'),
        email: formData.get('email')
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUIForLoggedInUser();
    hideModal();
    showMessage('注册成功', 'success');
}

// 控制台功能
function loadUserRooms() {
    const content = document.getElementById('rooms-tab');
    if (!content) return;
    
    content.innerHTML = `
        <div class="user-rooms">
            <h3>我的房间</h3>
            <div class="rooms-list">
                ${userRooms.map(room => `
                    <div class="room-item">
                        <div class="room-info">
                            <h4>${room.name}</h4>
                            <p>Claude ${room.plan.toUpperCase()} · ${room.members}/${room.maxMembers}人 · $${room.costPerPerson.toFixed(2)}/月</p>
                        </div>
                        <div class="room-actions">
                            <button class="btn btn-outline btn-sm" onclick="viewRoomDetails(${room.id})">详情</button>
                            <button class="btn btn-danger btn-sm" onclick="leaveRoom(${room.id})">退出</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function loadUsageStats() {
    const content = document.getElementById('usage-tab');
    if (!content) return;
    
    content.innerHTML = `
        <div class="usage-stats">
            <h3>使用统计</h3>
            <div class="stats-cards">
                <div class="stat-card">
                    <h4>本月使用</h4>
                    <div class="stat-value">156,432</div>
                    <div class="stat-unit">Tokens</div>
                </div>
                <div class="stat-card">
                    <h4>本月费用</h4>
                    <div class="stat-value">$45.60</div>
                    <div class="stat-unit">USD</div>
                </div>
                <div class="stat-card">
                    <h4>节省金额</h4>
                    <div class="stat-value">$124.40</div>
                    <div class="stat-unit">USD</div>
                </div>
            </div>
            <div class="usage-chart">
                <h4>使用趋势</h4>
                <p>图表功能开发中...</p>
            </div>
        </div>
    `;
}

function loadBillingInfo() {
    const content = document.getElementById('billing-tab');
    if (!content) return;
    
    content.innerHTML = `
        <div class="billing-info">
            <h3>账单信息</h3>
            <div class="billing-summary">
                <div class="summary-item">
                    <label>本月应付：</label>
                    <span class="amount">$45.60</span>
                </div>
                <div class="summary-item">
                    <label>已支付：</label>
                    <span class="amount paid">$45.60</span>
                </div>
                <div class="summary-item">
                    <label>余额：</label>
                    <span class="amount">$0.00</span>
                </div>
            </div>
            <div class="billing-history">
                <h4>账单历史</h4>
                <div class="history-list">
                    <div class="history-item">
                        <span class="date">2024-01</span>
                        <span class="description">Claude Max 合租费用</span>
                        <span class="amount">$33.33</span>
                        <span class="status paid">已支付</span>
                    </div>
                    <div class="history-item">
                        <span class="date">2023-12</span>
                        <span class="description">Pro 版小团队费用</span>
                        <span class="amount">$5.00</span>
                        <span class="status paid">已支付</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadUserSettings() {
    const content = document.getElementById('settings-tab');
    if (!content) return;
    
    content.innerHTML = `
        <div class="user-settings">
            <h3>账户设置</h3>
            <form class="settings-form">
                <div class="form-group">
                    <label>用户名</label>
                    <input type="text" value="${currentUser?.username || ''}" readonly>
                </div>
                <div class="form-group">
                    <label>邮箱</label>
                    <input type="email" value="${currentUser?.email || ''}">
                </div>
                <div class="form-group">
                    <label>通知设置</label>
                    <div class="checkbox-group">
                        <label class="checkbox">
                            <input type="checkbox" checked>
                            <span>房间邀请通知</span>
                        </label>
                        <label class="checkbox">
                            <input type="checkbox" checked>
                            <span>账单提醒</span>
                        </label>
                        <label class="checkbox">
                            <input type="checkbox">
                            <span>系统消息</span>
                        </label>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">保存设置</button>
                </div>
            </form>
        </div>
    `;
}

// 工具函数
function generateApiKey() {
    if (!currentUser) {
        showLogin();
        return;
    }
    
    const apiKey = 'cr_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    const content = `
        <div class="api-key-generator">
            <h2>API Key 生成</h2>
            <p>您的API Key已生成，请妥善保存：</p>
            <div class="api-key-display">
                <input type="text" value="${apiKey}" readonly>
                <button class="btn btn-outline" onclick="copyToClipboard('${apiKey}')">
                    <i class="fas fa-copy"></i> 复制
                </button>
            </div>
            <div class="api-usage">
                <h4>使用方法：</h4>
                <div class="code-block">
                    <pre><code>export ANTHROPIC_BASE_URL="https://your-relay-server/api/"
export ANTHROPIC_AUTH_TOKEN="${apiKey}"</code></pre>
                </div>
            </div>
            <button class="btn btn-primary" onclick="hideModal()">确定</button>
        </div>
    `;
    
    showModal(content);
}

function downloadUsageReport() {
    if (!currentUser) {
        showLogin();
        return;
    }
    
    showMessage('报告生成中...', 'info');
    
    // 模拟下载
    setTimeout(() => {
        showMessage('使用报告已下载', 'success');
    }, 2000);
}

function contactUs() {
    const content = `
        <div class="contact-form">
            <h2>联系我们</h2>
            <p>如有任何问题或建议，请通过以下方式联系我们：</p>
            <div class="contact-info">
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <span>support@claude-sharing.com</span>
                </div>
                <div class="contact-item">
                    <i class="fab fa-github"></i>
                    <a href="https://github.com/xianyu110/claude-relay-service" target="_blank">GitHub 项目</a>
                </div>
                <div class="contact-item">
                    <i class="fab fa-telegram"></i>
                    <span>Telegram 群组</span>
                </div>
            </div>
            <button class="btn btn-primary" onclick="hideModal()">确定</button>
        </div>
    `;
    
    showModal(content);
}

// 页面加载完成后初始化主题
document.addEventListener('DOMContentLoaded', initTheme);

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}