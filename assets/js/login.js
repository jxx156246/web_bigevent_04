$(function() {
    $('.link_reg').on('click', function() {
        $('#login-form').hide();
        $('#reg-form').show()
    });
    $('.link_login').on('click', function() {
        $('#login-form').show();
        $('#reg-form').hide()
    });

    // 校验
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            if (value !== $('#reg-form [name=password]').val()) {
                return '两次输入密码不一致'
            }
        }
    })

    // 注册页面
    var layer = layui.layer
    $('#reg-form').on('submit', function(e) {
        e.preventDefault();
        // 获取数据
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: {
                username: $("#reg-form [name=username]").val(),
                password: $("#reg-form [name=password]").val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                };
                layer.msg('注册成功');
                $('.link_login').click();
            }
        })
    })

    //登录页面
    $('#login-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                };
                layer.msg('登录成功');
                console.log(res);
                localStorage.setItem('token', res.token);
                location.href = "/index.html"
            }
        })
    })

})