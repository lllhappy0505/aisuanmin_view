// components/floating-ball/floating-ball.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    isExpanded: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 切换展开/收起状态
    onToggleExpand() {
      this.setData({
        isExpanded: !this.data.isExpanded
      });
    },

    // 处理菜单项点击
    onItemClick(e) {
      const type = e.currentTarget.dataset.type;
      const typeNames = {
        'study': '学业',
        'career': '事业',
        'love': '姻缘'
      };

      // 触发自定义事件，传递类型
      this.triggerEvent('menuclick', {
        type: type,
        typeName: typeNames[type]
      });

      // 点击后收起菜单
      this.setData({
        isExpanded: false
      });
    }
  }
});
