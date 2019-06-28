Page({

    /**
     * 页面的初始数据
     */
    data: {
        isChecked1: true,
        isChecked2: true,
        isChecked3: true,
        isChecked4: false,
    },

    changeSwitch1: function () {

        this.setData({ isChecked1: false })
        console.log(isChecked1)
    },

    changeSwitch2: function () {

    },
    changeSwitch3: function () {

    },
    changeSwitch4: function () {

    }

})