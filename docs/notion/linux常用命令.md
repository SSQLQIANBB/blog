
### 文件夹操作


| 指令      | 说明             | 示例                                                              |
| ------- | -------------- | --------------------------------------------------------------- |
| `mkdir` | 创建新目录          | `mkdir new_directory`                                           |
| `rmdir` | 删除空目录          | `rmdir empty_directory`                                         |
| `rm -r` | 递归删除目录及其内容     | `rm -r directory_name`                                          |
| `cd`    | 切换目录           | `cd /path/to/directory`                                         |
| `pwd`   | 显示当前工作目录       | `pwd`                                                           |
| `ls`    | 列出目录内容         | `ls` 或 `ls /path/to/directory`                                  |
| `ls -l` | 以长格式列出目录内容     | `ls -l`                                                         |
| `ls -a` | 列出所有文件（包括隐藏文件） | `ls -a`                                                         |
| `cp -r` | 递归复制目录         | `cp -r source_directory target_directory`                       |
| `mv`    | 移动或重命名目录       | `mv old_name new_name` 或 `mv source_directory target_directory` |


### 文件操作


| 指令        | 说明              | 示例                                      |
| --------- | --------------- | --------------------------------------- |
| `touch`   | 创建空文件或更新文件时间戳   | `touch new_file.txt`                    |
| `cp`      | 复制文件            | `cp source_file.txt target_file.txt`    |
| `mv`      | 移动或重命名文件        | `mv old_name.txt new_name.txt`          |
| `rm`      | 删除文件            | `rm file.txt`                           |
| `cat`     | 显示文件内容          | `cat file.txt`                          |
| `less`    | 分页显示文件内容        | `less file.txt`                         |
| `more`    | 分页显示文件内容（较旧版本）  | `more file.txt`                         |
| `head`    | 显示文件开头部分（默认10行） | `head file.txt`                         |
| `tail`    | 显示文件结尾部分（默认10行） | `tail file.txt`                         |
| `tail -f` | 实时显示文件的最新内容     | `tail -f log.txt`                       |
| `grep`    | 在文件中搜索指定模式      | `grep "pattern" file.txt`               |
| `find`    | 查找文件            | `find /path/to/search -name "filename"` |
| `chmod`   | 更改文件权限          | `chmod 755 file.txt`                    |
| `chown`   | 更改文件的所有者        | `chown user:group file.txt`             |
| `ln`      | 创建硬链接           | `ln source_file hard_link`              |
| `ln -s`   | 创建符号链接（软链接）     | `ln -s source_file symbolic_link`       |


### 文件编辑


| 指令      | 说明                      | 示例                                |
| ------- | ----------------------- | --------------------------------- |
| `nano`  | 使用 nano 编辑器打开文件         | `nano file.txt`                   |
| `vim`   | 使用 vim 编辑器打开文件          | `vim file.txt`                    |
| `vi`    | 使用 vi 编辑器打开文件（与 vim 类似） | `vi file.txt`                     |
| `gedit` | 使用 gedit 图形界面编辑器打开文件    | `gedit file.txt`                  |
| `echo`  | 将文本写入文件                 | `echo "Hello, World!" > file.txt` |
| `>>`    | 追加文本到文件末尾               | `echo "New line" >> file.txt`     |
| `sed`   | 流编辑器，用于替换文本             | `sed 's/old/new/g' file.txt`      |
| `awk`   | 文本处理工具                  | `awk '{print $1}' file.txt`       |
| `cut`   | 提取文件中的字段                | `cut -d',' -f1 file.txt`          |
| `paste` | 合并文件行                   | `paste file1.txt file2.txt`       |
| `sort`  | 对文件内容进行排序               | `sort file.txt`                   |
| `uniq`  | 去除重复行                   | `uniq file.txt`                   |
| `diff`  | 比较两个文件的不同               | `diff file1.txt file2.txt`        |
| `patch` | 应用补丁                    | `patch < patchfile.patch`         |


### 其他常用命令


| 指令        | 说明                | 示例           |
| --------- | ----------------- | ------------ |
| `man`     | 显示命令的手册页          | `man ls`     |
| `which`   | 查找命令的位置           | `which ls`   |
| `whereis` | 查找命令的位置及手册页位置     | `whereis ls` |
| `type`    | 显示命令类型（内置、别名、函数等） | `type ls`    |
| `history` | 显示命令历史            | `history`    |
| `clear`   | 清屏                | `clear`      |
| `exit`    | 退出终端              | `exit`       |


希望这个表格能帮助你更好地理解和使用 Linux 中的文件和文件夹操作命令。如果你有更多具体的问题或需要进一步的帮助，请告诉我！


当然，下面是一个整理的表格，列出了 Linux 中常用的文件夹操作、文件操作和文件编辑指令。这些命令可以帮助你更高效地管理和编辑文件。


### 文件夹操作


| 指令      | 说明             | 示例                                                              |
| ------- | -------------- | --------------------------------------------------------------- |
| `mkdir` | 创建新目录          | `mkdir new_directory`                                           |
| `rmdir` | 删除空目录          | `rmdir empty_directory`                                         |
| `rm -r` | 递归删除目录及其内容     | `rm -r directory_name`                                          |
| `cd`    | 切换目录           | `cd /path/to/directory`                                         |
| `pwd`   | 显示当前工作目录       | `pwd`                                                           |
| `ls`    | 列出目录内容         | `ls` 或 `ls /path/to/directory`                                  |
| `ls -l` | 以长格式列出目录内容     | `ls -l`                                                         |
| `ls -a` | 列出所有文件（包括隐藏文件） | `ls -a`                                                         |
| `cp -r` | 递归复制目录         | `cp -r source_directory target_directory`                       |
| `mv`    | 移动或重命名目录       | `mv old_name new_name` 或 `mv source_directory target_directory` |


### 文件操作


| 指令        | 说明              | 示例                                      |
| --------- | --------------- | --------------------------------------- |
| `touch`   | 创建空文件或更新文件时间戳   | `touch new_file.txt`                    |
| `cp`      | 复制文件            | `cp source_file.txt target_file.txt`    |
| `mv`      | 移动或重命名文件        | `mv old_name.txt new_name.txt`          |
| `rm`      | 删除文件            | `rm file.txt`                           |
| `cat`     | 显示文件内容          | `cat file.txt`                          |
| `less`    | 分页显示文件内容        | `less file.txt`                         |
| `more`    | 分页显示文件内容（较旧版本）  | `more file.txt`                         |
| `head`    | 显示文件开头部分（默认10行） | `head file.txt`                         |
| `tail`    | 显示文件结尾部分（默认10行） | `tail file.txt`                         |
| `tail -f` | 实时显示文件的最新内容     | `tail -f log.txt`                       |
| `grep`    | 在文件中搜索指定模式      | `grep "pattern" file.txt`               |
| `find`    | 查找文件            | `find /path/to/search -name "filename"` |
| `chmod`   | 更改文件权限          | `chmod 755 file.txt`                    |
| `chown`   | 更改文件的所有者        | `chown user:group file.txt`             |
| `ln`      | 创建硬链接           | `ln source_file hard_link`              |
| `ln -s`   | 创建符号链接（软链接）     | `ln -s source_file symbolic_link`       |


### 文件编辑


| 指令      | 说明                      | 示例                                |
| ------- | ----------------------- | --------------------------------- |
| `nano`  | 使用 nano 编辑器打开文件         | `nano file.txt`                   |
| `vim`   | 使用 vim 编辑器打开文件          | `vim file.txt`                    |
| `vi`    | 使用 vi 编辑器打开文件（与 vim 类似） | `vi file.txt`                     |
| `gedit` | 使用 gedit 图形界面编辑器打开文件    | `gedit file.txt`                  |
| `echo`  | 将文本写入文件                 | `echo "Hello, World!" > file.txt` |
| `>>`    | 追加文本到文件末尾               | `echo "New line" >> file.txt`     |
| `sed`   | 流编辑器，用于替换文本             | `sed 's/old/new/g' file.txt`      |
| `awk`   | 文本处理工具                  | `awk '{print $1}' file.txt`       |
| `cut`   | 提取文件中的字段                | `cut -d',' -f1 file.txt`          |
| `paste` | 合并文件行                   | `paste file1.txt file2.txt`       |
| `sort`  | 对文件内容进行排序               | `sort file.txt`                   |
| `uniq`  | 去除重复行                   | `uniq file.txt`                   |
| `diff`  | 比较两个文件的不同               | `diff file1.txt file2.txt`        |
| `patch` | 应用补丁                    | `patch < patchfile.patch`         |


### 其他常用命令


| 指令        | 说明                | 示例           |
| --------- | ----------------- | ------------ |
| `man`     | 显示命令的手册页          | `man ls`     |
| `which`   | 查找命令的位置           | `which ls`   |
| `whereis` | 查找命令的位置及手册页位置     | `whereis ls` |
| `type`    | 显示命令类型（内置、别名、函数等） | `type ls`    |
| `history` | 显示命令历史            | `history`    |
| `clear`   | 清屏                | `clear`      |
| `exit`    | 退出终端              | `exit`       |


希望这个表格能帮助你更好地理解和使用 Linux 中的文件和文件夹操作命令。如果你有更多具体的问题或需要进一步的帮助，请告诉我！


### **chmod用法：**


**用来修改某个目录或文件的访问权限。**


语法：


> 💡 `chmod [-cfvR] [--help] [--version] [who] [+ | - | =] [mode] 文件名`


命令中各选项的含义为：

- c : 若该档案权限确实已经更改，才显示其更改动作
- f : 若该档案权限无法被更改也不要显示错误讯息
- v : 显示权限变更的详细资料
- R : 对目前目录下的所有档案与子目录进行相同的权限变更(即以递回的方式逐个变更)
- -help : 显示辅助说明
- -version : 显示版本

权限范围：


    `u User，即文件或目录的拥有者；`


    `g Group，即文件或目录的所属群组；`


    `o Other，除了文件或目录拥有者或所属群组之外，其他用户皆属于这个范围；`


    `a All，即全部的用户，包含拥有者，所属群组以及其他用户；`


    `r 读取权限，数字代号为“4”;`


    `w 写入权限，数字代号为“2”；`


    `x 执行或切换权限，数字代号为“1”；`

    - `不具任何权限，数字代号为“0”；`

    `s 特殊功能说明：变更文件或目录的权限。`


设置 mode 所表示的权限可用下述字母的任意组合：


    r 可读。


    w 可写。


    x 可执行。


    X 只有目标文件对某些用户是可执行的或该目标文件是目录时才追加x 属性。


    s 在文件执行时把进程的属主或组ID置为该文件的文件属主。


    ```plain text
    方式“u＋s”设置文件的用户ID位，“g＋s”设置组ID位。
    ```


    t 保存程序的文本到交换设备上。


    u 与文件属主拥有一样的权限。


    g 与和文件属主同组的用户拥有一样的权限。


    o 与其他用户拥有一样的权限。


    文件名：以空格分开的要改变权限的文件列表，支持通配符。

