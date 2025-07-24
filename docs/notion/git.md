
## 仓库管理


```markdown
# 初始化：添加 B 为 upstream
git remote add upstream git@git.example.com:other-department/B-repo.git
git remote set-url --push upstream no_push  # 禁止推送

# 首次同步 share 分支
git fetch upstream share
git checkout -b share-b upstream/share  # 本地分支跟踪 upstream/share

# 日常更新（在 share-b 分支）
git pull --rebase  # 拉取最新并变基

# 合并到主开发分支（如 main）
git checkout main
git merge share-b -m "Merge B's share branch"
git push origin main  # 推送到本部门仓库 A


或者

# 拉取 B 仓库的 share 分支（不自动合并）
git fetch upstream share:temp-share  # 临时本地分支 temp-share

# 切换到目标分支（如本地 main 分支）
git checkout main

# 合并方式 1：直接合并（适合常规同步）
git merge temp-share -m "Sync B's share branch (#123)"

# 合并方式 2：变基同步（保持线性历史）
git rebase temp-share

# 清理临时分支
git branch -D temp-share


简化流程：设置跟踪分支（推荐）
bash
# 将本地 share-b 分支永久跟踪 upstream/share
git branch --track share-b upstream/share

# 后续同步只需：
git checkout share-b
git pull --rebase  # 自动拉取并变基，保持整洁
```


## push


```bash
git push <远程仓库> <本地分支>:<远程分支>

git push -u <仓库> <远程分支>

// 删除
git push <仓库> :<远程分支>
```

