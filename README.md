# Claude Code 合租平台

基于 [claude-relay-service](https://github.com/xianyu110/claude-relay-service) 项目构建的Claude Code合租静态网站平台。

## 🚀 功能特色

### 核心功能
- **用户注册与登录**：安全的用户认证系统
- **合租房间管理**：创建、加入、管理合租房间
- **透明计费系统**：实时显示使用量和费用分摊
- **API Key管理**：独立分配和管理API密钥
- **使用统计分析**：详细的使用报告和趋势分析

### 技术特点
- **纯静态网站**：基于GitHub Pages部署，无需服务器
- **响应式设计**：完美适配桌面端和移动端
- **现代化UI**：简洁美观的用户界面
- **本地存储**：数据存储在浏览器本地（演示版本）
- **渐进式增强**：可扩展为完整的后端系统

## 📋 支持的订阅方案

### Claude Pro ($20/月)
- 优先访问Claude
- 更多使用量
- 支持Claude-3 Sonnet
- 优先客户支持
- **合租后仅需：$4-7/月**

### Claude Max ($200/月) ⭐ 推荐
- Pro所有功能
- 20x使用量
- 支持Claude-3 Opus
- 早期功能体验
- **合租后仅需：$33-67/月**

## 🛠️ 技术栈

- **前端**：原生HTML5 + CSS3 + JavaScript
- **UI框架**：无框架依赖，纯原生实现
- **图标**：Font Awesome 6.0
- **动画**：Animate.css + 自定义CSS动画
- **存储**：localStorage（演示版本）
- **部署**：GitHub Pages

## 📦 快速开始

### 在线体验
访问：[https://your-username.github.io/claude-code-sharing](https://your-username.github.io/claude-code-sharing)

### 本地开发
```bash
# 克隆项目
git clone https://github.com/your-username/claude-code-sharing.git
cd claude-code-sharing

# 使用本地服务器运行（推荐）
python -m http.server 8000
# 或者使用Node.js
npx serve .

# 访问 http://localhost:8000
```

### GitHub Pages部署
1. Fork本项目到你的GitHub账户
2. 在项目设置中启用GitHub Pages
3. 选择`main`分支作为源
4. 访问 `https://your-username.github.io/claude-code-sharing`

## 🏗️ 项目结构

```
claude-code-sharing/
├── index.html              # 主页面
├── css/
│   ├── style.css          # 主样式文件
│   └── auth.css           # 认证相关样式
├── js/
│   ├── script.js          # 主要功能脚本
│   └── auth.js            # 认证相关脚本
├── pages/
│   ├── login.html         # 登录页面
│   ├── register.html      # 注册页面
│   └── docs.html          # 文档页面
├── README.md              # 项目说明
└── LICENSE                # 许可证
```

## 🔧 功能模块

### 1. 用户管理
- 用户注册和登录
- 个人信息管理
- 安全设置

### 2. 房间管理
- 创建合租房间
- 浏览和搜索房间
- 加入/退出房间
- 房间信息管理

### 3. 计费系统
- 实时费用计算
- 使用量统计
- 账单历史
- 费用分摊算法

### 4. API管理
- API Key生成
- 使用配置
- 连接测试

## 🎨 界面截图

### 首页
![首页](screenshots/home.png)

### 合租房间
![合租房间](screenshots/rooms.png)

### 用户控制台
![控制台](screenshots/dashboard.png)

## 🔐 安全说明

### 数据安全
- 所有敏感数据仅存储在用户本地浏览器
- 不会上传任何个人信息到第三方服务器
- API密钥采用安全的生成算法

### 隐私保护
- 无用户追踪和数据收集
- 完全开源，代码透明
- 本地存储，用户完全控制数据

## 🚀 扩展开发

### 连接真实后端
如需连接claude-relay-service后端：

1. 修改`js/script.js`中的API端点
2. 实现真实的用户认证
3. 集成实际的数据库存储
4. 添加支付系统集成

### 示例配置
```javascript
// 修改API配置
const API_BASE_URL = 'https://your-relay-server.com/api';
const AUTH_ENDPOINT = '/auth';
const ROOMS_ENDPOINT = '/rooms';
```

## 📄 基于项目

本项目基于以下开源项目构建：
- [claude-relay-service](https://github.com/xianyu110/claude-relay-service) - Claude API中继服务
- 感谢原作者提供的优秀架构和设计思路

## 🤝 贡献指南

欢迎提交Issues和Pull Requests！

### 开发规范
1. 遵循现有代码风格
2. 添加适当的注释
3. 测试新功能
4. 更新相关文档

### 提交流程
1. Fork本项目
2. 创建特性分支
3. 提交更改
4. 发起Pull Request

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 支持与反馈

- **GitHub Issues**：[提交问题](https://github.com/your-username/claude-code-sharing/issues)
- **Email**：support@claude-sharing.com
- **原项目**：[claude-relay-service](https://github.com/xianyu110/claude-relay-service)

## 🎯 路线图

### v1.0 - 基础功能 ✅
- [x] 静态网站框架
- [x] 用户界面设计
- [x] 基础功能演示

### v1.1 - 增强功能 🚧
- [ ] 数据导入/导出
- [ ] 主题切换
- [ ] 多语言支持

### v2.0 - 后端集成 📋
- [ ] 连接claude-relay-service
- [ ] 实时数据同步
- [ ] 支付系统集成
- [ ] 高级统计功能

---

**⚡ 让AI编程助手的成本不再是障碍！**