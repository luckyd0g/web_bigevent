$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从layui中获取form对象
    let form = layui.form;
    let layer = layui.layer
    form.verify({
        // 自定义了一个叫pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致的规则
        repwd: function (val) {
            let pwd = $('.reg-box [name=password]').val()
            if (val !== pwd) return '两次输入的密码不一致！'
        }
    })
    // 监听表单提交事件
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()
        $.post('/api/reguser', { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功！');
            $('#link_login').click()
        })
        // $.ajax({
        //     type: 'POST',
        //     url: 'http://api-breakingnews-web.itheima.net/api/reguser',
        //     data: { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() },
        //     success: function (res) {
        //         if (res.status !== 0) {
        //             layer.msg(res.message)
        //         };
        //         layer.msg('注册成功！');
        //         $('#link_login').click()
        //     }
        // })
    })
    $('#form-login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $('#form-login').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                };
                layer.msg('登陆成功！')
                console.log(res.token);
                // 将登陆成功后取到的token值存到localStorage中
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })

})