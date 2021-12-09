$(function () {
    let layer = layui.layer
    let form = layui.form
    initArticle()
    let index = null
    function initArticle() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章类别失败！')
                }
                let htmlStr = template('tpl-cate', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    $('#btnAddCate').on('click', function () {
        index = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#dilog').html(),
            area: ['500px', '300px']
        })
    })
    $('body').on('submit', '#form_add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $('#form_add').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增文章分类失败！')
                }
                initArticle()
                layer.msg('新增文章分类成功！')
                layer.close(index)
            }
        })
    })
    let indexEdit = null
    $('tbody').on('click', '.btn_edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('#dilog_edit').html(),
            area: ['500px', '300px']
        })
        let id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败！')
                }
                console.log(res);
                form.val('layui-form', res.data)
            }
        })
    })
    $('body').on('submit', '#form_edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $('#form_edit').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新文章分类失败！')
                }
                layer.msg('更新文章分类成功！')
                layer.close(indexEdit)
                initArticle()

            }
        })
    })
    // 删除事件
    $('body').on('click', '.btn_del', function () {
        let id = $(this).attr('data-id')
        layer.confirm('是否要删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        layer.msg('删除失败！')
                    }
                    layer.msg('删除成功！')
                    layer.close(index);
                    initArticle()
                }
            })
        });
    })
})