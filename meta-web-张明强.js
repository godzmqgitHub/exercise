/**
 * 回答方式: 直接保存或者复制本js文件, 然后在原处作答. 注意不要改动函数结构
 * 在原本的函数体里返回正确答案
 * 本卷直接用代码判卷, 没有人工干预. 格式改动会导致试卷无效
 */
module.exports = {
    // 选择题, 单项选择, 每题4分
    // 直接返回正确答案字符串, 如 `return 'A';`
    qn0: () => {
      /*
      只是样例! 不用改动
  
      A. 选我, 选我就得分
  
      B. 别选我
  
      C. 别选我
  
      D. 别选我
      */
      return 'A';
    },
    qn1: () => {
      /*
      以下方法中, 返回值类型和其他最不同的:
  
      A. Array.forEach
  
      B. Array.reduce
  
      C. Array.map
  
      D. Array.splice
      */
      return null;
    },
    qn2: () => {
      /*
      以下哪个场景*不适合*使用WebSocket:
  
      A. 交易页面, 用户用RESTful API下单, WebSocket告知用户订单成交
  
      B. 身份审核, 提交文件后1-2个工作日审核完毕, WebSocket通知用户审核完毕
  
      C. 用户在线聊天, 发送聊天内容和接收聊天内容都用WebSocket传输
  
      D. 去中心化游戏应用, 两人对战用WebSocket通知对手位置, 对战结束后胜负结果上链
      */
      return 'B';
    },
    qn3: () => {
      /*
      前端在 foobar.com, 向 api.foobar.com 发送请求, 以下哪个请求不需要OPTIONS preflight (以Chrome为准):
  
      A. 一个GET请求, 有Content-Type头, 值为application/json
  
      B. 一个PUT请求, 没有头
  
      C. 一个POST请求, 有User-Agent和Connection头
  
      D. 一个HEAD请求, 有Authorization头
      */
      return 'D';
    },
    qn4: () => {
      /*
      CSS中, flex是哪三个flex关键字的简写 (可以查文档):
  
      A. flex-grow, flex-shrink, flex-basis
  
      B. flex-direction, flex-grow, flex-shrink
  
      C. flex-direction, flex-wrap, flex-flow
  
      D. flex-direction, flex-basis, flex-flow
      */
      return 'A';
    },
    qn5: () => {
      // 以下表达式中能去除所有空格的是:
      // 
      // A. str = str.replace(/\s*/g,"");      
  
      // B. str = str.replace(/^\s*|\s*$/g,"");
  
      // C. str = str.replace( /^\s*/, “”);
  
      // D. str = str.replace(/(\s*$)/g, "");    
      return 'A';
    },
    qn6: () => {
      /*
      以下哪个不是服务器端渲染SSR的问题:
  
      A. 性能开销大
  
      B. 缓存机制复杂
  
      C. 框架支持不完善
  
      D. 搜索引擎不执行JS
      */
      return 'D';
    },
    qn7: () => {
      /*
      以下关于Redux, 错误的是:
  
      A. Reducer中不能做异步操作
  
      B. Redux store可以从js文件export并在任意位置使用
  
      C. 使用Redux时需要先引入React依赖
  
      D. Redux用于应用的状态管理
      */
      return 'B';
    },
    qn8: () => {
      /*
      以下哪个权重最大:
  
      A. 内联样式
  
      B. ID选择器（如 #content ）
  
      C. 类选择器（如 .content）
  
      D. 标签选择器（如 div、p）
      */
      return 'A';
    },
    qn9: () => {
      /*
      关于git, 以下命令中只涉及本地仓库的为:
  
      A. git branch -l -a
  
      B. git push
  
      C. git reset --hard ORIG_HEAD
  
      D. git fetch --all
      */
      return 'C';
    },
    qn10: () => {
      /*
      以下代码片段, 选择它的打印输出 (省略换行)
  
      ```js
      function fn1(){
        for(var i=0;i<4;i++){
          var timer=setTimeout(function(i){
            console.log(i);
            clearTimeout(timer)
          },10,i);
        }
      }
      fn1();
      ```
      A. 3 2 1 0
    
      B. 0 1 2 3
    
      C. 0 1 2
    
      D. 打印为空
      */
      return 'C';
    },
    qn11: () => {
      /*
      以下代码片段, 选择它的打印输出 (省略换行)
  
      ```js
      function fn2(){
        for(var i=0;i<4;i++){
          var timer=setInterval(function(i,timer){
            console.log(i);
            clearInterval(timer)
          },10,i,timer);
        }
      }
      fn2();
      ```
      A. 0 1 2 3 0 1 2 3 四个数重复
  
      B. 0 1 2 3 3 3 3 重复
  
      C. 0 1 2 3 随机顺序出现, 总个数一致
  
      D. 打印为空
      */
      return 'B';
    },
    qn12: () => {
      /*
      以下哪个HTTP状态码非错误状态:
  
      A. 404
  
      B. 500
  
      C. 303
  
      D. 400
      */
      return 'C';
    },
    qn13: () => {
      /*
      关于let和var, 以下正确的是:
  
      A. let是块级作用域, var是函数级作用域, let和var变量定义都会提升 (hoist)
  
      B. let是函数级作用域, var是块级作用域, let和var变量定义都会提升 (hoist)
  
      C. let是函数级作用域, var是块级作用域, let变量定义会提升 (hoist), var不会
  
      D. let是块级作用域, var是函数级作用域, var变量定义会提升 (hoist), let不会
      */
      return 'D';
    },
    qn14: () => {
      /*
      以下代码片段, 选择它的打印输出 (省略换行)
  
      ```js
      console.log(0.25 + 0.25 === 0.5);
      console.log(0.1 + 0.2 === 0.3);
      ```
      A. true true
  
      B. false false
  
      C. true false
  
      D. false true
      */
      return 'C';
    },
    qn15: () => {
      /*
      关于HTTPS / SSL / TLS, 以下错误的是:
  
      A. 当客户端收到服务器端发送的证书, 证书充当公钥. 为了验证证书有效性, 用客户端已经安装的CA证书检查
  
      B. 后续的HTTPS通讯, 客户端和服务器端的通讯会使用非对称加密
  
      C. 公司内网需要监控解密HTTPS时, 可以在客户端安装公司自己的CA证书
  
      D. 最常用的非对称加密算法RSA, 是基于大素数分解质因数实现的
      */
      return 'B';
    },
    // 实现题, 每题20分
    /**
     * 统计数组中每个字符串出现次数
     * @param string[] strs: 字符串数组, 例如 ['aa', 'ab', 'ab', 'cc', 'cba']
     * @return {[key: string]: number} 出现次数Map, 例如 { aa: 1, ab: 2, cc: 1, cba: 1 }
     */
    frequencyMap: strs => {
      let result = {};
      //TODO your code goes here...
      for (let index = 0; index < strs.length; index++) {
          const item = strs[index];
          if (item in result) {
            result[item] = result[item] + 1;
          } else {
            result[item] = 1;
          }
      }
      return result;
    },
    /**
     * 请处理给定字符串:
     *   - 去掉无用字符和乱码, 只保留大小写英文字母, 单引号, 和空格
     *   - 把一个或多个连续无用字符和乱码换成一个空格
     *   - 如果一个或多个连续无用字符的最后一位 === "?", 且之后一个字符是字母, 把字母转换为大写
     * @param str: 字符串, 例 "I'm?我driving???是to乱?beijing码after breakfast"
     * @return str: 例 "I'm driving to Beijing after breakfast"
     */
    decode: str => {
      // 思路
      str.replace(/([a-zA-Z]|\')*/g, function(ss){
        console.log(ss)
      });
      return 'sorry，没解出来。有个大致思路，通过正则匹配到不是字母、单引号和空格的乱码，判断最后一位是否是‘？’，否：直接替换，是：将下一位字符首字母大写';
    },
  }