let that;
class Tab {
  constructor(id) {
    that = this
    this.main = document.querySelector(id); // 整个tab
    this.add = this.main.querySelector('.tabadd') // 添加按钮
    // li的父元素 ul
    this.ul = this.main.querySelector('.fisrstnav ul:first-child')
    // 对应的选项卡内容区域
    this.tabscon = this.main.querySelector('.tabscon')
    // 初始化tab栏
    this.init();
  }
  // 初始化操作让相关的元素绑定事件
  init() {
    this.findNode(); // 更新li
    this.add.onclick = this.addTab; // 点击添加选项卡
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i;
      this.lis[i].onclick = this.toggbleTab;
      this.remove[i].onclick = this.deleteTab;
      this.spans[i].ondblclick = this.editTab;
      this.section[i].ondblclick = this.editTab;
    }
  }
  // 动态获取元素
  findNode() {
    // 选项卡
    this.lis = this.main.querySelectorAll('li');
    // 内容
    this.section = this.main.querySelectorAll('section');
    // 删除按钮
    this.remove = this.main.querySelectorAll('.icon-guanbi');
    // span
    this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
  }
  // 清除默认样式
  clearClass() {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].className = ''
      this.section[i].className = '' 
    }
  }
  // 切换功能
  toggbleTab() {
    that.clearClass()
    this.className = 'liactive'
    that.section[this.index].className = 'conactive'
  }
  // 添加功能
  addTab() {
    // 清除所有默认样式
    that.clearClass();
    // 创建 li 和 section 元素
    let li = `<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>`;
    let section = `<section class="conactive">新选项卡内容</section>`
    that.ul.insertAdjacentHTML('beforeend', li);
    that.tabscon.insertAdjacentHTML('beforeend', section);
    // 初始化
    that.init();
  }
  // 删除功能
  deleteTab(evet) {
    evet.stopPropagation(); // 阻止冒泡 防止 li 的切换点击事件
    let index = this.parentNode.index // 获取索引号
    // 根据索引号删除对应的 li 和 section
    that.lis[index].remove();
    that.section[index].remove();
    that.init(); // 初始化
    // 如果删除的不是当前选中的li, 原来选中的li保持不变
    if (document.querySelector('.liactive')) return;
    // 点击删除之后 自动选中第一个选项卡
    index--;
    // 手动调用点击事件, 不需要鼠标出发
    that.lis[index] && that.lis[index].click(); 
  }
  // 修改功能
  editTab() {
    var str = this.innerHTML;
    // 禁止文字双击选中
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    this.innerHTML = "<input type='text' value="+ str +" />"
    var input = this.children[0]; // 获取文本框
    input.select(); // 文本框内容处于全选
    // 当文本框失去焦点时 复制给span
    input.onblur = function() {
      this.parentNode.innerHTML = this.value;
    }
    // 按下回车时 保存值
    input.onkeyup = function (e) {
      if (e.keyCode === 13) {
        input.blur();
      }
    }
  }
}

new Tab('#tab');