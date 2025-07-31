# 🚀 Claude Code合租平台 - 快速部署指南

## 📋 项目已准备就绪！

你的Claude Code合租平台已经完全构建完成，包含所有功能：

### ✅ 完整功能列表
- **用户系统**：注册、登录、个人信息管理
- **合租房间**：创建、浏览、加入、管理房间
- **费用计算**：透明的成本分摊和使用统计
- **API管理**：密钥生成、配置、使用指南
- **响应式UI**：完美适配桌面和移动端
- **自动部署**：GitHub Actions自动化部署

## 🎯 立即部署到GitHub Pages

### 步骤1：创建GitHub仓库

1. **访问GitHub**：https://github.com/new
2. **仓库名称**：`claude-code-sharing-platform`
3. **设置为Public**（GitHub Pages需要）
4. **不要**初始化README、.gitignore或LICENSE
5. **点击Create repository**

### 步骤2：推送代码到GitHub

在当前目录执行以下命令：

```bash
# 进入项目目录
cd /Users/chinamanor/Downloads/cursor编程/claude-code-sharing

# 添加远程仓库（替换your-username为你的GitHub用户名）
git remote set-url origin https://github.com/your-username/claude-code-sharing-platform.git

# 推送到GitHub
git push -u origin main
```

### 步骤3：启用GitHub Pages

1. **进入仓库设置**：
   - 仓库页面 → Settings标签
   
2. **配置Pages**：
   - 左侧菜单 → Pages
   - Source选择：Deploy from a branch
   - Branch选择：main / (root)
   - 点击Save

3. **等待部署**：
   - 几分钟后访问：`https://your-username.github.io/claude-code-sharing-platform`

## 🔧 自动化部署（已配置）

项目已包含GitHub Actions配置，每次推送main分支时自动：
- 压缩优化CSS和JS文件
- 自动部署到GitHub Pages
- 无需手动操作

## 📱 功能演示

### 主要页面
- **首页**：平台介绍和特性展示
- **合租房间**：浏览和管理合租房间
- **定价方案**：Claude Pro/Max价格对比
- **使用文档**：快速上手指南
- **用户控制台**：完整的用户管理面板

### 核心功能
1. **注册登录**：完整的用户认证流程
2. **创建房间**：设置房间信息和成员限制
3. **加入房间**：搜索并加入合适的房间
4. **费用计算**：实时显示分摊后的费用
5. **API密钥**：生成和管理Claude API密钥
6. **使用统计**：详细的用量和账单信息

## 🎨 界面特色

- **现代化设计**：渐变色彩、卡片布局、流畅动画
- **响应式布局**：完美适配各种设备尺寸
- **交互友好**：直观的操作流程和反馈
- **专业外观**：企业级的视觉设计

## 🔐 安全特性

- **本地存储**：数据存储在用户浏览器本地
- **无服务器**：纯静态网站，无后端风险
- **开源透明**：所有代码完全开源可审查
- **隐私保护**：不收集任何用户个人信息

## 🚀 高级配置（可选）

### 自定义域名
1. 购买域名并配置DNS
2. 在GitHub Pages设置中添加自定义域名
3. 启用强制HTTPS

### 性能优化
- 启用CDN加速
- 压缩图片资源
- 启用浏览器缓存

### 功能扩展
- 连接真实的claude-relay-service后端
- 集成支付系统
- 添加邮件通知功能

## 📞 技术支持

### 遇到问题？
1. **查看部署日志**：GitHub Actions页面
2. **检查设置**：GitHub Pages配置
3. **本地测试**：`python -m http.server 8000`

### 联系方式
- **GitHub Issues**：报告问题和建议
- **原项目地址**：https://github.com/xianyu110/claude-relay-service
- **技术交流**：欢迎Fork和PR

## 🎉 部署完成后

部署成功后，你将拥有：
- ✅ 一个完全功能的Claude Code合租平台
- ✅ 专业的用户界面和用户体验
- ✅ 自动化的部署流程
- ✅ 移动端完美适配
- ✅ 开源且可自定义的代码

**现在就开始创建你的第一个合租房间吧！** 🚀

---

## 📋 快速命令参考

```bash
# 克隆到新位置
git clone https://github.com/your-username/claude-code-sharing-platform.git

# 本地开发
cd claude-code-sharing-platform
python -m http.server 8000

# 推送更新
git add .
git commit -m "feat: 更新功能"
git push origin main
```

**祝你部署成功！享受Claude Code合租的便利！** ✨