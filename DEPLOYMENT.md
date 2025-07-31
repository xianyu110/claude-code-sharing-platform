# 部署指南

本文档详细说明如何将Claude Code合租平台部署到GitHub Pages。

## 🚀 GitHub Pages 快速部署

### 方法一：直接部署（推荐）

1. **Fork项目**
   ```bash
   # 访问GitHub，点击Fork按钮
   https://github.com/your-username/claude-code-sharing
   ```

2. **启用GitHub Pages**
   - 进入你的项目设置页面
   - 滚动到 "Pages" 部分
   - 选择源分支为 `main`
   - 保存设置

3. **访问网站**
   - 等待几分钟部署完成
   - 访问 `https://your-username.github.io/claude-code-sharing`

### 方法二：自动化部署

项目已配置GitHub Actions自动化部署：

1. **推送代码到main分支**
   ```bash
   git add .
   git commit -m "feat: deploy to github pages"
   git push origin main
   ```

2. **查看部署状态**
   - GitHub项目页面 → Actions标签
   - 查看部署进度和日志

3. **部署完成**
   - 自动优化CSS和JS文件
   - 自动部署到GitHub Pages

## 🔧 本地开发

### 环境要求
- Node.js 16+ (可选，用于优化工具)
- Python 3.x (用于本地服务器)
- 现代浏览器

### 开发步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/claude-code-sharing.git
   cd claude-code-sharing
   ```

2. **启动开发服务器**
   ```bash
   # 使用Python
   python -m http.server 8000
   
   # 或使用Node.js
   npx serve .
   
   # 或使用PHP
   php -S localhost:8000
   ```

3. **访问本地站点**
   - 打开浏览器访问 `http://localhost:8000`

## 🛠️ 优化和构建

### 安装依赖（可选）
```bash
npm install
```

### 构建优化版本
```bash
# 压缩CSS和JS
npm run build

# 单独优化CSS
npm run optimize:css

# 单独优化JS  
npm run optimize:js
```

### 代码检查
```bash
# JavaScript代码检查
npm run lint

# HTML文件验证
npm run validate
```

## 🌐 自定义域名

### 设置自定义域名

1. **购买域名**
   - 从域名注册商购买域名

2. **配置DNS**
   ```
   # A记录指向GitHub Pages IP
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   
   # 或使用CNAME记录
   your-username.github.io
   ```

3. **GitHub设置**
   - 项目设置 → Pages → Custom domain
   - 输入你的域名并保存
   - 勾选 "Enforce HTTPS"

4. **修改部署配置**
   ```yaml
   # .github/workflows/deploy.yml
   - name: Deploy to GitHub Pages
     uses: peaceiris/actions-gh-pages@v3
     with:
       cname: your-domain.com  # 你的自定义域名
   ```

## 📊 性能优化

### 图片优化
```bash
# 压缩图片（如果有）
npm install -g imagemin-cli
imagemin images/*.{jpg,png} --out-dir=images/optimized
```

### 启用压缩
GitHub Pages自动启用Gzip压缩，无需额外配置。

### CDN加速
- 使用CDN加载外部资源（Font Awesome等）
- 考虑使用Cloudflare等服务进一步加速

## 🔒 安全配置

### HTTPS强制
GitHub Pages自动提供HTTPS，建议在设置中启用"Enforce HTTPS"。

### 安全头部
创建`_headers`文件（Netlify）或配置CloudFlare规则添加安全头部：
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

## 📱 移动端优化

### PWA支持（可选）
添加Service Worker和Manifest文件：

1. **创建manifest.json**
   ```json
   {
     "name": "Claude Code合租平台",
     "short_name": "Claude合租",
     "description": "Claude Code合租服务平台",
     "start_url": "/",
     "display": "standalone",
     "background_color": "#6366f1",
     "theme_color": "#6366f1",
     "icons": [
       {
         "src": "icon-192.png",
         "sizes": "192x192",
         "type": "image/png"
       }
     ]
   }
   ```

2. **添加到index.html**
   ```html
   <link rel="manifest" href="manifest.json">
   ```

## 🔄 更新和维护

### 定期更新
```bash
# 拉取最新更改
git pull origin main

# 更新依赖
npm update

# 重新部署
git push origin main
```

### 监控和分析
- 启用Google Analytics（可选）
- 使用GitHub Insights查看访问统计
- 监控网站性能和错误

## 🐛 故障排除

### 常见问题

1. **页面404错误**
   - 检查GitHub Pages设置
   - 确认分支和目录配置正确

2. **样式不加载**
   - 检查CSS文件路径
   - 确认相对路径正确

3. **JavaScript错误**
   - 打开浏览器开发者工具
   - 查看Console错误信息

4. **部署失败**
   - 查看GitHub Actions日志
   - 检查workflow配置文件

### 调试技巧
```bash
# 本地测试构建
npm run build

# 检查HTML语法
npm run validate

# JavaScript语法检查
npm run lint
```

## 📞 获取帮助

遇到问题时可以：
1. 查看GitHub Issues
2. 阅读GitHub Pages官方文档
3. 联系项目维护者

---

**🎉 祝您部署成功！**