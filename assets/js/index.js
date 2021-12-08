$(function () {
    getUserInfo()
    let layer = layui.layer
    // 点击按钮实现退出功能
    $('#btnLogout').on('click', function () {
        // 提交退出
        layer.confirm('确定退出登录?', { icon: 5, title: '提示' }, function (index) {
            //do something
            // 1.清空token
            localStorage.removeItem('token')
            location.href = '../../login.html'
        })
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象
        // headers: { Authorization: localStorage.getItem('token') || '' },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('请求失败了');
            }
            // 调用渲染用户头像函数
            randerAvatar(res.data)
        }
    })
}
// 定义渲染用户头像函数
function randerAvatar(user) {
    let name = user.nickname || user.username
    // 1设置欢迎文本
    $('#welcome').text(`欢迎  ${name}`)
    // 2按需渲染用户头像
    if (user.user_pic !== null) {
        //   2.1渲染图片头像 
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 2.2渲染文本头像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').text(first).show()
    }
}