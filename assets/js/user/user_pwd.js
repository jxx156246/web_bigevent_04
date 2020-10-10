$(function() {
    //校验
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        newpwd: function(value) {
            if (value === $('#form-pwd [name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        renewpwd: function(value) {
            if (value !== $('#form-pwd [name=newPwd]').val()) {
                return '两次输入密码不一致'
            }
        }
    })

    // 更新密码
    $('#form-pwd').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                };
                layui.layer.msg("更新密码成功")
                $('#form-pwd')[0].reset();
            }
        })
    })

})