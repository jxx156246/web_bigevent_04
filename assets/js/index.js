$(function() {
    var layer = layui.layer;
    getuserinfo();

    // 退出
    $('#indexout').on('click', function(e) {
        e.preventDefault();
        layer.confirm('是否确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token');
            layer.close(index);
            location.href = '/login.html'
        });
    })
});

// 获取用户信息
function getuserinfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            };
            // console.log(res);
            renderuser(res.data)
        }

    })
}
//渲染头像和文字
function renderuser(user) {
    var name = user.nickname || user.username;
    var first = name[0].toUpperCase();
    if (user.user_pic !== null) {
        $('.text-logo').hide();
        $('.layui-nav-img').prop('src', user.user_pic).show()
    } else {
        $('.text-logo').html(first).show();
        $('.layui-nav-img').hide()
    };
    $('.welcome').html('欢迎&nbsp;' + name)
}