// result.js
Page({
  data: {
    resultData: {}
  },

  onLoad(options) {
    if (options.data) {
      try {
        const resultData = JSON.parse(decodeURIComponent(options.data));
        console.log('接收到的数据:', resultData);
        console.log('sizhu数据:', resultData.sizhu);

        this.setData({
          resultData: resultData
        });
      } catch (e) {
        console.error('解析数据失败:', e);
        wx.showToast({
          title: '数据解析失败',
          icon: 'none'
        });
      }
    }
  },

  // 辅助方法：安全地连接数组
  safeJoin(array, separator) {
    if (Array.isArray(array) && array.length > 0) {
      return array.join(separator);
    }
    return '暂无数据';
  },

  onBack() {
    wx.navigateBack();
  }
});
