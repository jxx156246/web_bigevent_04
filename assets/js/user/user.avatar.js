$(function() {

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    // 2.上传按钮绑定事件
    $('.ava-file').on('click', function() {
        $('#file').click();
    });

    //3.更换图片
    $('#file').on('change', function(e) {
        // console.log(e.target.files);
        var files = e.target.files;
        if (files.length == 0) {
            return '请上传图片'
        };
        // 1. 拿到用户选择的文件
        var file = e.target.files[0];
        // 2. 根据选择的文件， 创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file);
        // 3. 先销毁旧的裁剪区域， 再重新设置图片路径， 之后再创建新的裁剪区域：
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    });

    // 4.确定按钮 绑定事件
    $('.ava-upload').on('click', function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png'); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('图片上传失败')
                };
                layui.layer.msg('图片上传成功');
                window.parent.getuserinfo() //这个可以自动更改头像
            }
        })
    });

    // 5.更换网页图片
    changeimage()

    function changeimage() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                console.log(res);
                // 3. 先销毁旧的裁剪区域， 再重新设置图片路径， 之后再创建新的裁剪区域：
                $image
                    .cropper('destroy') // 销毁旧的裁剪区域
                    .attr('src', res.data.user_pic) // 重新设置图片路径
                    .cropper(options) // 重新初始化裁剪区域
            }
        })
    }
})