### /commonJs说明
1. 设定全局的公用方法，只需要调用方法名就能够执行的方法，
2. 源于vue2.x时，全局的通用方法，需要使用Vue.property去设定全局，使用时需要使用this.func调用，
3. 避免麻烦，直接通过src的形式引入到全局，因此直接调用方法名进行使用
4. Setting.js，在build之前，需要对打包后的api路径进行设定，打包后很难修改，因此在打包时，让api的路径引用外部设定的api路径，这样在不同的位置发布时，可以相对进行调整
5. vxe-table-extention.js: 应用在vxe-table插件中