$(function () {
    let layer = layui.layer
    let form = layui.form
    initArtCate()
    initEditor()
    function initArtCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('获取文章分类失败！')
                }
                console.log(res);
                let htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    $('.chooseBG').on('click', function (e) {
        $('#BGfile').click()

    })
    $('#BGfile').on('change', function (e) {
        var file = e.target.files[0]
        if (file.length === 0) {
            return
        }
        var newImgURL = URL.createObjectURL(file)

        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })
    let artState = '已发布'
    $('#addSave').on('click', function () {
        artState = '草稿'
    })
    // $('#addArt').on('click', function () {
    //     $.ajax({
    //         method: 'POST',
    //         url: '/my/article/add',
    //         data:,
    //         success: function (res) {
    //             if (res.status !== 0) {
    //                 return layer.msg('文章发布失败！')
    //             }
    //             layer.msg('文章发布成功！')
    //         }
    //     })
    // })
    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        let fd = new FormData($(this)[0])
        fd.append('state', artState)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                artPub(fd)
            })

    })
    function artPub(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('文章发布失败！')
                }
                layer.msg('文章发布成功！')
                location.href = '/article/art_list.html'
            }
        })
    }
})