$(function() {
    // 校验
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nick: [
            /^[\S]{3,6}$/, '字符个数必须3到6位，且不能出现空格'
        ]
    })

    // 获取用户信息
    inituserinfo()

    function inituserinfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                };
                console.log(res);
                // 快速填充表单信息
                form.val('userinfo', res.data)
            }
        })
    }

    // 重置
    $('#resbtninfo').on('click', function(e) {
        e.preventDefault();
        inituserinfo()
    })

    // 修改
    $("#userform").on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                };
                layer.msg('修改成功')
                inituserinfo()
            }
        })
    })
})