# 前端代码使用说明

## 环境变量

* RUN_ENV
    > 运行环境

    ``` shell
    dev            # 开发线
    test           # 测试线
    pre            # 预发布
    pro            # 生产线
    ```

## 构建过程

* 第一步 从git中拉取最新源码

    注意：为了避免更新依赖包的时间过长，拉取源码后，不要覆盖本地源码目录内的 node_modules 目录
    

* 第二步 更新依赖包 + 编译文件

    在源码目录下运行以下命令，请区分运行环境

    ``` js
    // CMD
    npm i && set RUN_ENV=[请输入 RUN_ENV 的值] && npm run prod

    // shell
    npm i && RUN_ENV=[请输入 RUN_ENV 的值] npm run prod
    ```

* 第三步 查看编译结果

    编译后的代码将存放在源码同级目录，如下：

    ```
    -- 
    |-- src 源码
    |
    |-- dist 编译结果

    ```

## 发版过程

* 第一步 从 git 中拉取并合并最新代码


* 第二步 打 tag 

    必须在 Shell 能力的环境下执行

    ``` js
    // shell
    npm run tag
    ```

* 第三步 复制 tag 并发送邮件 

    命令执行时会产生如下内容：

    ```
    Creating a tag ...
    New tag: runedu-group-register_v1.0.0_201612301111
    ```
