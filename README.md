# CommonUI
## 环境搭建
基于npm的包管理工具进行开发，请先安装安装node
#### 建议
为方便本地开发时，管理的多个项目需要的node环境不同，建议先安装[nvm](https://github.com/coreybutler/nvm-windows)，然后通过nvm进行node安装，便于管理本地node环境  
**建议尽量使用高版本的node开发本项目**

#### Vue相关
开发前，请自行引入vue, vite等环境，便于支持项目运行

## 插件说明
- Vue.js: https://v3.cn.vuejs.org/guide/introduction.html
- Vite: https://cn.vitejs.dev/guide/
- Vuex: https://vuex.vuejs.org/
- Vue-Router: https://router.vuejs.org/guide/
- Axios: http://www.axios-js.com/zh-cn/docs/vue-axios.html
- Element-Plus: https://element.eleme.cn/#/zh-CN/guide/design
- Vxe-Table: https://vxetable.cn/v4/#/table/start/install

## 开发说明
```
//请根据以下命令，引入相关插件
npm install

//请使用以下命令，进行本地预览
npm run serve

//请使用以下命令，进行本地打包发布
npm run build
```  
*运行与打包命令，对应于package.json文件内的“scripts”模块配置*

## 项目结构
**以下本项目的项目结构，用于说明目录下每个模块的作用，同时对项目的架构进行图示解析**  
#### 概要说明
- 本项目的核心模块主要分为两部分：
   - public: 静态资源文件，例如图片，图标等；CSS文件，例如font-awesome等, 全局的通用js方法：例如对象判空，日期计算，日期格式化等
   - src：系统框架模块与业务逻辑模块
```
public
├─ static             静态资源模块
│  ├─ css               CSS
│  ├─ js                 全局通用的js
│  └─ fonts              图标
src
├─ plugins            第三方扩展插件
│  └─ vxe-table         Vxe-Table
│
├─ structure          界面核心结构
│  ├─ components        主界面结构设计
│  └─ vue-plugins       Vue生态扩展
│  │  ├─ router           vue-router 路由配置
│  │  └─ store            vuex 状态仓库配置 （工厂模式）
│  │  │  ├─ modules         “小存储室”,分模块的小仓库
│  │  │  └─ store.js        仓库集成，仓库出口
│
├─ utils              工具模块
│  └─ http              axios请求接口工具  
│
├─ views              视图模块
│  ├─ System            框架通用模块视图
│  │  ├─ Base
│  │  ├─ Home
│  │  ├─ Role
│  │  └─ User
│  │
│  └─ Pages           系统业务视图，用于开发系统业务，同时作为动态路由路径扩展
│ ... 
│ ... 待扩展
│ ... 
```
