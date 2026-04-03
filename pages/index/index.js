// index.js
Page({
  data: {
    name: '',
    sex: '男',
    lifa: '农历',
    year: '',
    month: '',
    day: '',
    timeIndex: 11, // 默认午时
    timeOptions: [
      { label: '子时 (23:00-01:00)', value: 23 },
      { label: '丑时 (01:00-03:00)', value: 1 },
      { label: '寅时 (03:00-05:00)', value: 3 },
      { label: '卯时 (05:00-07:00)', value: 5 },
      { label: '辰时 (07:00-09:00)', value: 7 },
      { label: '巳时 (09:00-11:00)', value: 9 },
      { label: '午时 (11:00-13:00)', value: 11 },
      { label: '未时 (13:00-15:00)', value: 13 },
      { label: '申时 (15:00-17:00)', value: 15 },
      { label: '酉时 (17:00-19:00)', value: 17 },
      { label: '戌时 (19:00-21:00)', value: 19 },
      { label: '亥时 (21:00-23:00)', value: 21 }
    ]
  },

  onNameInput(e) {
    this.setData({
      name: e.detail.value
    });
  },

  onSexSelect(e) {
    this.setData({
      sex: e.currentTarget.dataset.value
    });
  },

  onLifaSelect(e) {
    this.setData({
      lifa: e.currentTarget.dataset.value
    });
  },

  onYearInput(e) {
    this.setData({
      year: e.detail.value
    });
  },

  onMonthInput(e) {
    this.setData({
      month: e.detail.value
    });
  },

  onDayInput(e) {
    this.setData({
      day: e.detail.value
    });
  },

  onTimeChange(e) {
    this.setData({
      timeIndex: parseInt(e.detail.value)
    });
  },

  onSubmit() {
    const { name, sex, lifa, year, month, day, timeIndex, timeOptions } = this.data;

    // 验证必填项
    if (!name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return;
    }

    if (!year || !month || !day) {
      wx.showToast({
        title: '请完整填写出生日期',
        icon: 'none'
      });
      return;
    }

    // 构建请求参数
    const timeValue = timeOptions[timeIndex].value;

    wx.showLoading({
      title: '正在排盘...',
      mask: true
    });

    // 调用算命接口
    wx.request({
      url: 'https://www.aism.cloud/view/suanming',
      method: 'GET',
      data: {
        name: name,
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day),
        time: timeValue,
        lifa: lifa,
        sex: sex
      },
      success: (res) => {
        wx.hideLoading();
        console.log('接口返回数据:', res.data);

        if (res.statusCode === 200) {
          // 直接传递接口返回的数据
          wx.navigateTo({
            url: `/pages/result/result?data=${encodeURIComponent(JSON.stringify(res.data))}`
          });
        } else {
          wx.showToast({
            title: '排盘失败，请稍后重试',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showToast({
          title: '网络错误，请检查网络连接',
          icon: 'none'
        });
        console.error('请求失败:', err);
      }
    });
  }
});
