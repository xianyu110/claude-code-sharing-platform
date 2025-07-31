#!/bin/bash

# Claude Code合租平台 - 一键部署脚本
# 使用方法: chmod +x deploy.sh && ./deploy.sh your-github-username

echo "🚀 Claude Code合租平台 - 一键部署脚本"
echo "========================================"

# 检查参数
if [ $# -eq 0 ]; then
    echo "❌ 请提供GitHub用户名"
    echo "用法: ./deploy.sh your-github-username"
    exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME="claude-code-sharing-platform"
REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

echo "📋 部署配置："
echo "   GitHub用户名: $GITHUB_USERNAME"
echo "   仓库名称: $REPO_NAME"
echo "   仓库地址: $REPO_URL"
echo ""

# 检查是否在正确的目录
if [ ! -f "index.html" ] || [ ! -f "package.json" ]; then
    echo "❌ 请在项目根目录运行此脚本"
    exit 1
fi

# 检查git状态
if [ ! -d ".git" ]; then
    echo "🔧 初始化Git仓库..."
    git init
    git branch -M main
fi

# 添加所有文件
echo "📦 添加项目文件..."
git add .

# 检查是否有更改需要提交
if git diff --staged --quiet; then
    echo "ℹ️  没有新的更改需要提交"
else
    echo "💾 提交更改..."
    git commit -m "feat: 🚀 Claude Code合租平台部署

基于claude-relay-service的完整合租平台：
- ✅ 完整的用户管理系统
- ✅ 合租房间创建和管理  
- ✅ 透明的费用分摊计算
- ✅ API密钥生成管理
- ✅ 详细使用统计面板
- ✅ 响应式现代化界面
- ✅ 自动化部署配置

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
fi

# 设置远程仓库
echo "🔗 配置远程仓库..."
if git remote get-url origin > /dev/null 2>&1; then
    git remote set-url origin $REPO_URL
else
    git remote add origin $REPO_URL
fi

echo ""
echo "📋 下一步操作说明："
echo "1. 请先在GitHub上创建仓库: https://github.com/new"
echo "   - 仓库名称: $REPO_NAME"
echo "   - 设置为Public（GitHub Pages需要）"
echo "   - 不要初始化README等文件"
echo ""
echo "2. 创建完成后，运行以下命令推送代码:"
echo "   git push -u origin main"
echo ""
echo "3. 启用GitHub Pages："
echo "   - 进入仓库设置 → Pages"
echo "   - Source选择: Deploy from a branch"
echo "   - Branch选择: main / (root)"
echo "   - 保存设置"
echo ""
echo "4. 几分钟后访问你的网站:"
echo "   https://$GITHUB_USERNAME.github.io/$REPO_NAME"
echo ""

# 检查是否安装了GitHub CLI
if command -v gh &> /dev/null; then
    echo "🔍 检测到GitHub CLI，是否自动创建仓库？(y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo "🏗️  创建GitHub仓库..."
        gh repo create "$REPO_NAME" --public --description "Claude Code合租平台 - 基于claude-relay-service的静态网站"
        
        echo "📤 推送代码到GitHub..."
        git push -u origin main
        
        echo "⚙️  启用GitHub Pages..."
        gh api repos/$GITHUB_USERNAME/$REPO_NAME/pages -X POST -f source[branch]=main -f source[path]=/
        
        echo ""
        echo "🎉 部署完成！"
        echo "🌐 网站地址: https://$GITHUB_USERNAME.github.io/$REPO_NAME"
        echo "📱 请等待几分钟让GitHub Pages部署完成"
    fi
else
    echo "💡 提示: 安装GitHub CLI可以自动化整个部署过程"
    echo "   brew install gh  # macOS"
    echo "   然后重新运行此脚本"
fi

echo ""
echo "✅ 脚本执行完成！"
echo "📚 详细部署指南请查看: QUICK_DEPLOY_GUIDE.md"