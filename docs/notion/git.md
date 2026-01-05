
# 📚 Git 协作与仓库管理速查手册


---


## 一、仓库角色说明（背景）


| 角色                 | 说明                     |
| ------------------ | ---------------------- |
| **A 仓库**           | 本部门仓库（✅ 可 `push`）      |
| **B 仓库**           | 其他部门仓库（🚫 **只读**，作为上游） |
| **`share`** **分支** | B 仓库对外共享的稳定分支          |


🎯 **目标**：


**安全、可控地将 B 仓库的** **`share`** **分支同步到 A 仓库**


---


## 二、初始化 upstream（仅需执行一次）


```bash
# 添加 B 仓库为 upstream（只读源）
git remote add upstream git@git.example.com:other-department/B-repo.git

# 禁止向 upstream 推送（防止误操作）
git remote set-url --push upstream no_push
```


🔍 验证配置：


```bash
git remote -v
# 应看到：
# upstream    git@... (fetch)
# upstream    no_push   (push)  ← 关键！
```


---


## 三、方式一：本地跟踪分支（日常协作）


### 1. 首次创建跟踪分支


```bash
# 拉取 upstream 的 share 分支
git fetch upstream share

# 创建本地分支 share-b 并跟踪 upstream/share
git checkout -b share-b upstream/share
```

> share-b：本地同步专用分支  upstream/share：只读上游分支，永不修改

---


### 2. 日常同步（最常用）


```bash
git checkout share-b
git pull --rebase
```


✨ **优势**：

- 始终与 B 仓库 `share` 保持一致
- 提交历史线性整洁，无冗余 merge commit

---


### 3. 合并到主开发分支（如 `main`）


```bash
git checkout main
git merge share-b -m "feat: sync latest from B's share branch"
git push origin main
```

> 💡 建议：commit message 明确来源，便于追溯

---


## 四、方式二：临时分支同步


### 适用场景

- 偶尔同步一次
- 不想长期维护 `share-b` 分支

### 操作流程


```bash
# 1. 拉取为临时分支
git fetch upstream share:temp-share

# 2. 切换到目标分支（如 main）
git checkout main

# 方式 A：普通合并（保留 merge 记录）
git merge temp-share -m "chore: sync B's share"

# 方式 B：变基（保持线性历史，仅限未推送分支）
git rebase temp-share

# 3. 清理临时分支
git branch -D temp-share
```


---


## 五、简化流程：永久设置跟踪关系


如果你已有一个 `share-b` 分支但未设置跟踪：


```bash
git branch --set-upstream-to=upstream/share share-b
```


或首次创建时直接指定：


```bash
git checkout -b share-b --track upstream/share
```


✅ 之后只需：


```bash
git checkout share-b
git pull --rebase
```


---


## 六、Push 操作速查


| 场景          | 命令                                   |
| ----------- | ------------------------------------ |
| **基本推送**    | `git push <remote> <local>:<remote>` |
| **示例**      | `git push origin main:main`          |
| **设置默认推送流** | `git push -u origin main`            |
| **后续简写**    | `git push`                           |
| **删除远程分支**  | `git push origin :<branch>`          |
| **示例**      | `git push origin :temp-share`        |


---


## 七、高频但易忘的 Git 操作


### 1. 查看分支关系


```bash
git branch -vv
# 显示：当前分支、跟踪远程、ahead/behind 状态
```


### 2. 查看完整提交图谱（排查利器）


```bash
git log --oneline --graph --decorate --all
```


### 3. 撤销操作


```bash
# 撤销工作区修改（未 add）
git restore <file>

# 撤销暂存区（已 add）
git restore --staged <file>
```


### 4. 撤销最近一次提交（⚠️ 未 push 时可用）


```bash
# 保留修改内容
git reset --soft HEAD~1

# 彻底丢弃（慎用！）
git reset --hard HEAD~1
```


### 5. 临时保存工作现场


```bash
git stash        # 保存
git stash pop    # 恢复
```


---


## 八、Rebase 使用原则


✅ **适合 rebase 的场景**：

- 同步只读上游分支（如 `upstream/share`）
- 本地私有分支，尚未推送给他人
- 追求干净线性历史

❌ **禁止 rebase 的场景**：

- 已 `push` 到共享仓库的公共分支（如 `main`、`develop`）
- 多人正在协作的分支
> 📌 黄金法则：Public history is sacred. Private history is yours to rewrite.

---


## 九、协作安全原则


```plain text
1. upstream 永远只读 → 不 push、不修改
2. 同步优先使用 pull --rebase → 保持历史干净
3. 合并进 main 必须写明来源 → 便于审计
4. 公共分支绝不 rebase → 避免协作灾难
```


---


## 十、使用 Rebase 合并 / 修改历史提交（高频）


### 1. 合并多个提交（squash）


### 场景


```plain text
commit A
commit B
commit C
```


希望合并为一个提交


---


### 操作步骤


```bash
# 回溯最近 3 个提交
git rebase -i HEAD~3
```


编辑界面示例：


```plain text
pick a1 提交 A
squash b2 提交 B
squash c3 提交 C
```


保存后，Git 会让你编辑最终 commit message。


---


### 2. 修改历史 commit message（单个）


```bash
git commit --amend
```


适合：

- 刚提交
- 还没 push

---


### 3. 修改历史 commit message（多个）


```bash
git rebase -i HEAD~n
```


示例：


```plain text
reword a1 原提交
pick b2 其他提交
```


---


### 4. 调整提交顺序 / 删除提交


```plain text
pick a1 提交 A
drop b2 删除该提交
pick c3 提交 C
```


---


### 5. Rebase 后的强制推送（谨慎）


```bash
git push --force-with-lease
```


**禁止使用：**


```bash
git push --force
```


---

