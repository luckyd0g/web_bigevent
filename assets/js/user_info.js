$(function () {
    let form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称需要设置在1~6位之间！'
            }
        }
    })
    let layer = layui.layer
    function initUserinfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                layer.msg('获取用户信息成功！')
                // $('.layui-form [name = username]').val(res.data.username)
                // $('.layui-form [name = nickname]').val(res.data.nickname)
                // $('.layui-form [name = email]').val(res.data.email)
                // 调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    initUserinfo()
    // $('#formSubmit').on('click', function () {
    //     $.ajax({
    //         method: 'POST',
    //         url: '/my/userinfo'
    //     })
    // })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('提交失败！')
                }
                layer.msg('更新用户信息成功！')
                window.parent.getUserInfo()
            }
        })
    })
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserinfo()
    })
})
